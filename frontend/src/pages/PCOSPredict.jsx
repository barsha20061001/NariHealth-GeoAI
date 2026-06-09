import { useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  "Age", "Weight", "Height", "BMI", "Blood Group",
  "Pulse Rate", "RR", "Hb", "Cycle", "Cycle Length",
  "Marriage Status", "Pregnant", "No. of Abortions",
  "I beta-HCG", "II beta-HCG", "FSH", "LH", "FSH/LH",
  "Hip", "Waist", "Waist/Hip Ratio", "TSH", "AMH",
  "PRL", "Vit D3", "PRG", "RBS", "Weight Gain",
  "Hair Growth", "Skin Darkening", "Hair Loss", "Pimples",
  "Fast Food", "Regular Exercise", "BP Systolic",
  "BP Diastolic", "Follicle No L", "Follicle No R",
  "Avg F Size L", "Avg F Size R", "Endometrium"
];

const sampleValues = [
  28, 44.6, 152, 19.3, 15, 78, 22, 10.5, 2, 5,
  36, 5, 1, 0, 1.99, 1.99, 7.95, 3.68, 2.07, 68.8,
  45.16, 17.1, 0.57, 0.36, 0.36, 0, 0, 0, 0, 0,
  0, 1, 1, 120, 80, 3, 3, 18, 18, 8.5, 0
];

export default function PCOSPredict() {
  const [csvFile, setCsvFile] = useState(null);
  const navigate = useNavigate();
  const [values, setValues] = useState(Array(41).fill(""));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
  };

  const fillSample = () => {
    setValues(sampleValues);
  };

  const predictPCOS = async () => {
    setLoading(true);
    setResult(null);

    try {
      const numericValues = values.map(Number);

      const response = await fetch("http://127.0.0.1:8080/predict/pcos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          values: numericValues
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        risk: "Error",
        message: "Backend not connected. Make sure FastAPI is running."
      });
    }

    setLoading(false);
  };

  const uploadCSV = async () => {
  if (!csvFile) {
    alert("Please select a CSV file");
    return;
  }

  const formData = new FormData();
  formData.append("file", csvFile);

  try {
    const response = await fetch("http://127.0.0.1:8080/predict/pcos-csv", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      alert("CSV prediction failed");
      return;
    }

    setResult(data);
  } catch (error) {
    console.error(error);
    alert("CSV prediction failed");
  }

  };

  

  return (
    <div className="relative min-h-screen bg-pink-50 px-6 pt-6 pb-10">
      <div className="absolute top-4 right-10 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-700"
        >
          Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-pink-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-pink-700"
        >
          Home
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-2xl p-8 border border-pink-200 mt-0">
        <h1 className="text-4xl font-black text-slate-950">
          PCOS Risk Prediction
        </h1>

        <p className="mt-3 text-slate-600">
          Enter clinical feature values to get an AI-based PCOS screening result.
          This is not a medical diagnosis.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 items-center">
            <input
  type="file"
  accept=".csv"
  onChange={(e) => setCsvFile(e.target.files[0])}
  className="hidden"
  id="pcos-csv"
/>

<label
  htmlFor="pcos-csv"
  className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
>
  Upload CSV
</label>

<span className="text-slate-700 font-semibold">
  {csvFile ? csvFile.name : "No CSV selected"}
</span>

<button
  onClick={uploadCSV}
  className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
>
  Predict CSV
</button>

          <button
            onClick={fillSample}
            className="bg-purple-600 text-white px-5 py-3 rounded-xl font-bold"
          >
            Fill Sample Values
          </button>

          <button
            onClick={predictPCOS}
            className="bg-pink-600 text-white px-5 py-3 rounded-xl font-bold"
          >
            {loading ? "Predicting..." : "Predict PCOS"}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {features.map((feature, index) => (
            <div key={feature}>
              <label className="text-sm font-semibold text-slate-700">
                {feature}
              </label>

              <input
                type="number"
                step="any"
                value={values[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                className="mt-2 w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:border-pink-500"
                placeholder="Enter value"
              />
            </div>
          ))}
        </div>

        {result && (
          <div className="mt-8 rounded-2xl p-6 border bg-purple-50">
            <h2 className="text-2xl font-black">
              Result: {result.risk}
            </h2>

            <p className="mt-2">
              Prediction: <b>{result.prediction}</b>
            </p>

            <p>
              Confidence: <b>{result.confidence}%</b>
            </p>

            <p className="mt-3 text-slate-700">
              {result.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
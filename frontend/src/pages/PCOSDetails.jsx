import { Link, useNavigate } from "react-router-dom";

export default function PCOSDetails() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-pink-50 px-6 pt-6 pb-10">
      <div className="absolute top-4 right-10 flex gap-3">
        <button onClick={() => navigate(-1)} className="bg-gray-600 text-white px-4 py-2 rounded-xl font-semibold">
          Back
        </button>
        <button onClick={() => navigate("/")} className="bg-pink-600 text-white px-4 py-2 rounded-xl font-semibold">
          Home
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 border border-pink-200 mt-10">
        <h1 className="text-5xl font-black text-pink-600">
          PCOS / PCOD Awareness
        </h1>

        <p className="mt-4 text-slate-600">
          Polycystic Ovary Syndrome is a common hormonal condition affecting women of reproductive age.
          Early awareness, lifestyle tracking and screening can help manage symptoms better.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Common Symptoms</h2>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Irregular menstrual cycles</li>
            <li>Weight gain or difficulty losing weight</li>
            <li>Acne or oily skin</li>
            <li>Excess hair growth</li>
            <li>Hair thinning or hair loss</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Risk Factors</h2>
          <ul className="list-disc ml-6 mt-3 space-y-2">
            <li>Hormonal imbalance</li>
            <li>Insulin resistance</li>
            <li>Family history</li>
            <li>Obesity or sedentary lifestyle</li>
          </ul>
        </div>

        <div className="mt-10 p-6 bg-pink-50 border border-pink-200 rounded-2xl">
          <h2 className="text-2xl font-black text-pink-600">
            AI PCOS Risk Predictor
          </h2>

          <p className="mt-3 text-slate-700">
            Enter clinical values or upload a CSV report to get an AI-powered PCOS screening result.
          </p>

          <Link to="/pcos-predict">
            <button className="mt-5 bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700">
              Predict PCOS with AI
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
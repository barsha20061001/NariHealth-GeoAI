import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BreastCancerPredict from "./pages/BreastCancerPredict";
import BreastCancerDetails from "./pages/BreastCancerDetails";
import PCOSPredict from "./pages/PCOSPredict";
import PCOSDetails from "./pages/PCOSDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breast-cancer-details" element={<BreastCancerDetails />} />
        <Route path="/breast-cancer-predict" element={<BreastCancerPredict />} />
        <Route path="/pcos-details" element={<PCOSDetails />} />
        <Route path="/pcos-predict" element={<PCOSPredict />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
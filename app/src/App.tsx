import { CoverageProvider } from './lib/CoverageProvider.tsx'
import CoverageChecker from "./components/CoverageChecker";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MapChecker from "./components/MapChecker";

export default function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* <Hero /> */}
      {/* <div className="mb-3">
        <input id="address" type="text" className="form-control" placeholder="Enter your address" />
      </div> */}
      <CoverageProvider>
        <CoverageChecker />
        <MapChecker />
      </CoverageProvider>
      {/* <div ref={mapRef} id="map" style={{ height: "400px", marginBottom: "20px" }}></div> */}
      {/* <div className={resultClass}>{resultMsg}</div> */}
      <Features />
      <Footer />
    </div>
  );
}

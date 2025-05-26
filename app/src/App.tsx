
import { useCoverage } from "./lib/CoverageProvider";

export default function App() {
  const { mapRef, resultMsg, resultClass, packages, provider } = useCoverage()

  return (
    <div className="container py-5">
      <nav className="navbar navbar-expand-lg px-3 mb-4" style={{ backgroundColor: "#1E90FF" }}>
        <a className="navbar-brand" href="#">
          <img src="logo.png" alt="PluxNet Logo" height={40} />
        </a>
      </nav>

      <h2 className="mb-4 text-center">Check Fibre Coverage</h2>

      <div className="mb-3">
        <input id="address" type="text" className="form-control" placeholder="Enter your address" />
      </div>

      <div ref={mapRef} id="map" style={{ height: "400px", marginBottom: "20px" }}></div>

      <div className={resultClass}>{resultMsg}</div>

      {provider && packages && (
        <div>
          <h4>Available Packages</h4>
          <div className="row">
            {packages.map((pkg, idx) => (
              <div key={idx} className="col-md-6">
                <div className="package-card">
                  <h5>
                    {pkg.name} - {pkg.price}
                  </h5>
                  <ul>
                    {pkg.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

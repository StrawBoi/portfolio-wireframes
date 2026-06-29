import { useEffect } from "react";
import { Prototype } from "./components/Prototype";
import { CanvasGrain } from "./components/CanvasGrain";
import { SmoothScrollProvider } from "./motion/SmoothScroll";

export default function App() {
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#prototype");
    }
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="pf" style={{ minHeight: "100vh" }}>
        <Prototype />
        <CanvasGrain />
      </div>
    </SmoothScrollProvider>
  );
}

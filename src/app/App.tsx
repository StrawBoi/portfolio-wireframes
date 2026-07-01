import { useEffect, useState, type ReactNode } from "react";
import { Prototype } from "./components/Prototype";
import { CanvasGrain } from "./components/CanvasGrain";
import { SmoothScrollProvider } from "./motion/SmoothScroll";
import { SocialNarrativeLab } from "./social/SocialNarrativeLab";
import { MajdClone } from "./majd/MajdClone";

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || "prototype");

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#prototype");
      setRoute("prototype");
    }
    const onHash = () => setRoute(window.location.hash.slice(1) || "prototype");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route;
}

function Shell({ children, grain }: { children: ReactNode; grain?: boolean }) {
  return (
    <SmoothScrollProvider>
      <div className="pf" style={{ minHeight: "100vh" }}>
        {children}
        {grain !== false && <CanvasGrain />}
      </div>
    </SmoothScrollProvider>
  );
}

export default function App() {
  const route = useHashRoute();
  const isSocial = route === "social";
  const isMajd = route === "majd";
  const lightShell = isSocial || isMajd;

  return (
    <Shell grain={!lightShell}>
      {isMajd ? <MajdClone /> : isSocial ? <SocialNarrativeLab /> : <Prototype />}
    </Shell>
  );
}

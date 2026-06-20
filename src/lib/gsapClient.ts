import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once at module load. Vite is CSR-only — no SSR guard needed.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default gsap;
export { ScrollTrigger };

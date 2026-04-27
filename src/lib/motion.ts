export const MOTION_EVENT = "cosmo:motion-change";

export function isMotionDisabled(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "paused";
}

export function onMotionChange(cb: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = () => cb();
  mq.addEventListener("change", handler);
  document.addEventListener(MOTION_EVENT, handler);
  return () => {
    mq.removeEventListener("change", handler);
    document.removeEventListener(MOTION_EVENT, handler);
  };
}

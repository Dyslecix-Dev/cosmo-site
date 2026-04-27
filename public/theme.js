function applyTheme() {
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
}
function applyMotion() {
  if (localStorage.motion === "paused") {
    document.documentElement.dataset.motion = "paused";
  } else {
    delete document.documentElement.dataset.motion;
  }
}
applyTheme();
applyMotion();
document.addEventListener("astro:page-load", applyTheme);
document.addEventListener("astro:page-load", applyMotion);

// Runs before first paint so the saved theme never flashes. A file, not inline, so the CSP can forbid inline scripts.
document.documentElement.classList.add("js");
try {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
} catch (e) {}

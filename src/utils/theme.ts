export const toggleTheme = (event: any) => {
  const element = document.documentElement;
  element.classList.toggle("dark");

  const isDark = element.classList.contains("dark");
  event.target.textContent = isDark ? "Dark" : "Light";
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

export const getTheme = () => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

const themeToggle = document.querySelector(".theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const reveals = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-fill");

const applyStoredTheme = () => {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
};

const toggleTheme = () => {
  document.body.classList.toggle("dark-mode");
  const nextTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", nextTheme);
};

const toggleNav = () => {
  const isOpen = document.body.classList.toggle("nav-menu-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }
};

const closeNav = () => {
  document.body.classList.remove("nav-menu-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
  }
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const value = entry.target.dataset.progress || "0";
      entry.target.style.setProperty("--target-width", `${value}%`);
      entry.target.style.width = `${value}%`;
      progressObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.45 }
);

applyStoredTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (navToggle) {
  navToggle.addEventListener("click", toggleNav);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

reveals.forEach((item) => revealObserver.observe(item));
progressBars.forEach((bar) => progressObserver.observe(bar));

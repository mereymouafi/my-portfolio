"use strict";

const navToggle = document.querySelector("#nav-toggle");
const navLinks = document.querySelector("#nav-links");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isExpanded));
        navToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
        navLinks.classList.toggle("is-open", !isExpanded);
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
            navLinks.classList.remove("is-open");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
            navLinks.classList.remove("is-open");
            navToggle.focus();
        }
    });
}

if ("IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(
        ".about-content, .section-heading, .skill-group, .experience-entry, .project-card, .testimonial-card, .education-list article"
    );

    document.body.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((target) => {
        target.setAttribute("data-reveal", "");
        revealObserver.observe(target);
    });
}

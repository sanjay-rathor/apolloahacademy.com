// Firebase CDN Modular Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Entry point
document.addEventListener("DOMContentLoaded", fetchHomepageContent);

async function fetchHomepageContent() {
  try {
    const pagesRef = collection(db, "pages");
    const q = query(pagesRef, where("slug", "==", "home"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn("Home page not found.");
      return;
    }

    const pageData = snapshot.docs[0].data();
    const content = pageData.content || {};

    // Store locally
    localStorage.setItem("homeContent", JSON.stringify(content));

    // Render sections
    loadHeroSlider(content.heroSection?.slides || []);
    loadPrograms(content.programsList?.programs || [], content.programsList?.sectionIntro);
    loadCentres(content.centres?.centres || []);
    loadAccreditations(content.accreditations?.logos || []);
    loadGlobalPartnerships(content.globalPartnerships?.partners || []);
  } catch (err) {
    console.error("Error loading homepage content:", err);
  }
}

// ---------------- Section Renderers ----------------

function loadHeroSlider(slides = []) {
  const slider = document.getElementById("hero-slider");
  const dotsContainer = document.getElementById("slider-dots");

  if (!slider || !dotsContainer || !Array.isArray(slides)) return;

  slider.innerHTML = "";
  dotsContainer.innerHTML = "";

  slides.forEach((slide, index) => {
    const slideEl = document.createElement("div");
    slideEl.className = `slide${index === 0 ? " active" : ""}`;
    slideEl.innerHTML = `
      <img src="${slide.imgSrc}" alt="${slide.alt}" loading="lazy">
      <div class="slide-content">
        <h1>${slide.heading}</h1>
        <p>${slide.paragraph}</p>
        ${slide.btnLink ? `<a href="${slide.btnLink}" class="btn-primary">${slide.btnText}</a>` : ""}
      </div>
    `;
    slider.appendChild(slideEl);

    const dot = document.createElement("span");
    dot.className = `dot${index === 0 ? " active" : ""}`;
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  if (slider.children.length > 0) {
    initializeSlider(slider.children, dotsContainer.children);
  }
}

function loadPrograms(programs, introText = "") {
  const container = document.getElementById("dynamic-program-cards-homepage");
  const title = document.getElementById("hp-ourprograms-dynamic-title");
  const intro = document.getElementById("hp-ourprograms-dynamic-intro");

  if (!container || !Array.isArray(programs)) return;

  container.innerHTML = "";
  if (title) title.textContent = "Our Programs";
  if (intro) intro.textContent = introText || "";

  programs.forEach(program => {
    container.innerHTML += `
      <div class="program-card">
        <img src="${program.imgSrc}" alt="${program.alt}" loading="lazy">
        <h3>${program.title}</h3>
        <p>${program.description}</p>
        ${program.btnLink ? `<a href="${program.btnLink}" class="btn">Learn More</a>` : ""}
      </div>
    `;
  });
}

function loadCentres(centres = []) {
  const container = document.getElementById("dynamic-centre-cards-homepage");
  if (!container || !Array.isArray(centres)) return;

  container.innerHTML = "";
  centres.forEach(centre => {
    container.innerHTML += `
      <div class="centre-card">
        <img src="${centre.imgSrc}" alt="${centre.alt}" loading="lazy">
        <h3>${centre.name}</h3>
        <p>${centre.description}</p>
        ${centre.btnLink ? `<a href="${centre.btnLink}" class="btn">View Details</a>` : ""}
      </div>
    `;
  });
}

function loadAccreditations(logos = []) {
  const container = document.getElementById("dynamic-accreditation-logos");
  if (!container || !Array.isArray(logos)) return;

  container.innerHTML = "";
  logos.forEach(logo => {
    container.innerHTML += `
      <div class="logo-item">
        <img src="${logo.imgSrc}" alt="${logo.alt}" loading="lazy">
        <span><b>${logo.name}</b></span>
      </div>
    `;
  });
}

function loadGlobalPartnerships(partners = []) {
  const container = document.getElementById("dynamic-partnerships-grid");
  if (!container || !Array.isArray(partners)) return;

  container.innerHTML = "";
  partners.forEach(partner => {
    container.innerHTML += `
      <div class="partnership-card">
        <img src="${partner.imgSrc}" alt="${partner.alt}" discription loading="lazy">
        <h3>${partner.name}</h3>
        <p>${partner.description || ""}</p>
      </div>
    `;
  });
}

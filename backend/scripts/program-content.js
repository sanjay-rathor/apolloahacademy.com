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


document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".program-grid");
  if (!grid) return;

  // Clear all existing static cards
  grid.innerHTML = `<div class="program-card-placeholder"><p>Loading programs...</p></div>`;

  // Load from Firestore
  loadPrograms(grid);
});

async function loadPrograms(grid) {
  try {
    const q = query(collection(db, "pages"), where("slug", "==", "programs"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      grid.innerHTML = `<p>No programs found.</p>`;
      return;
    }

    const page = snapshot.docs[0].data();
    const programs = page.content?.programCards?.programs || [];

    // Store in localStorage
    localStorage.setItem("programsContent", JSON.stringify(programs));

    // Render
    renderPrograms(programs, grid);
  } catch (err) {
    console.error("Error fetching programs:", err);
    grid.innerHTML = `<p>Failed to load programs.</p>`;
  }
}

function renderPrograms(programs, grid) {
  grid.innerHTML = ""; // Clear placeholder

  programs.forEach(program => {
    const card = document.createElement("div");
    card.className = "program-card";

    card.innerHTML = `
      <img src="${program.imgSrc}" alt="${program.alt || program.title}" loading="lazy">
      <div class="program-content">
        <h3>${program.title}</h3>
        <p>${program.description}</p>
        <div class="program-footer">
          <span class="duration"><i class="far fa-clock"></i> ${program.duration}</span>
          ${program.btnLink ? `<a href="${program.btnLink}" class="btn">Learn More</a>` : ""}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

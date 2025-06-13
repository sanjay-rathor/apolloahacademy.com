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

// Initialize Firebase App and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("dynamic-centre-cards-listing");
  if (!grid) return;
  grid.innerHTML = `<div class="centres-card-placeholder"><p>Loading centres...</p></div>`;
  loadCentres(grid);
});

async function loadCentres(grid) {
  try {
    const q = query(collection(db, "pages"), where("slug", "==", "home")); // Get 'home' page
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      grid.innerHTML = `<p>No allied health centres found at this time.</p>`;
      return;
    }

    const doc = snapshot.docs[0];
    const centres = doc.data()?.content?.centres?.centres || []; // Nested access

    if (!Array.isArray(centres) || centres.length === 0) {
      grid.innerHTML = `<p>No centre details available.</p>`;
      return;
    }

    grid.innerHTML = renderCentresHTML(centres);
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p>Failed to load centres. Please try again later.</p>`;
  }
}

function renderCentresHTML(centres) {
  return centres.map(centre => `
    <div class="centre">
      <div class="centre-image">
        <img src="${centre.imgSrc || '/images/centre-placeholder.png'}" alt="${centre.alt || centre.name || 'Centre Image'}" loading="lazy">
      </div>
      <div class="centre-details">
        <h2>${centre.name || 'Untitled Centre'}</h2>
        <p class="centre-description">${centre.description || 'No description available.'}</p>
        ${renderCentreInfo(centre)}
        ${renderCentreFacilities(centre)}
        ${centre.btnLink ? `<a href="${centre.btnLink}" class="btn">View Details</a>` : ""}
      </div>
    </div>
  `).join('');
}

function renderCentreInfo(centre) {
  const address = centre.address ? `
    <div class="info-item">
      <i class="fas fa-map-marker-alt"></i>
      <p>${centre.address}</p>
    </div>` : '';
  const phone = centre.phone ? `
    <div class="info-item">
      <i class="fas fa-phone"></i>
      <p>${centre.phone}</p>
    </div>` : '';
  const email = centre.email ? `
    <div class="info-item">
      <i class="fas fa-envelope"></i>
      <p>${centre.email}</p>
    </div>` : '';
  if (!address && !phone && !email) return '';
  return `<div class="centre-info">${address}${phone}${email}</div>`;
}

function renderCentreFacilities(centre) {
  if (!centre.facilities || !Array.isArray(centre.facilities) || centre.facilities.length === 0) return '';
  return `
    <div class="centre-facilities">
      <h3>Key Facilities</h3>
      <ul>
        ${centre.facilities.map(fac => `<li><i class="fas ${fac.icon || 'fa-check'}"></i> ${fac.label}</li>`).join('')}
      </ul>
    </div>
  `;
}

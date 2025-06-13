// Mark this file as a module if using in <script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYbsVI-4Zb0QTonR2iN-4GcLCBSrvisl8",
  authDomain: "ahs-cms-7f4f6.firebaseapp.com",
  projectId: "ahs-cms-7f4f6",
  storageBucket: "ahs-cms-7f4f6.firebasestorage.app",
  messagingSenderId: "132715335065",
  appId: "1:132715335065:web:77e7bf22320dc0d8675708",
  measurementId: "G-Z3E9BM7DCN"
};

// ✅ Initialize App
const app = initializeApp(firebaseConfig);

// ✅ Export Firestore DB instance
const db = getFirestore(app);

export { db };
export { firebaseConfig, app }; // Export app if needed elsewhere
// If you need to use the app instance elsewhere, you can export it as well

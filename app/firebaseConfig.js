import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAvk_UOZ-cHFMHzPxvus0OpXXr6qycDFVY",
    authDomain: "app123-c78eb.firebaseapp.com",
    projectId: "app123-c78eb",
    storageBucket: "app123-c78eb.appspot.com",
    messagingSenderId: "798542338551",
    appId: "1:798542338551:web:2098d289eeb039335136f2"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

export { db };
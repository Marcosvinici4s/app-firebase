import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_VzwVmsXGOPzdH_uoZ2xYnLgNBmiD0-M",
  authDomain: "appmeuprojeto.firebaseapp.com",
  projectId: "appmeuprojeto",
  storageBucket: "appmeuprojeto.appspot.com",
  messagingSenderId: "385089584918",
  appId: "1:385089584918:web:de0f8ae92c0f6b83a6da37",
  measurementId: "G-61ZSX10MDR"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const auth = getAuth(app); // auth
const db = getFirestore(app);

export { auth , db };
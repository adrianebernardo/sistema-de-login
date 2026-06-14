import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAn0Zf6B5dKkoloY9TAbH8V__g_IL6QU0Q",
  authDomain: "sistema-login-d0f98.firebaseapp.com",
  projectId: "sistema-login-d0f98",
  storageBucket: "sistema-login-d0f98.firebasestorage.app",
  messagingSenderId: "297896944075",
  appId: "1:297896944075:web:353a70d0080529e641d64e",
  measurementId: "G-3ZSWZBZ9C0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



function mostrarMsg(texto, tipo) {
  const el = document.getElementById("msg-cadastro");
  if (!el) return;
  el.textContent = texto;
  el.className = "msg-box " + tipo;
  el.style.display = "block";
}

function ocultarMsg() {
  const el = document.getElementById("msg-cadastro");
  if (el) el.style.display = "none";
}



async function login() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  const erroEmail = document.getElementById("erro-login-email");
  const erroSenha = document.getElementById("erro-login-senha");
  if (erroEmail) erroEmail.style.display = "none";
  if (erroSenha) erroSenha.style.display = "none";

  if (!email) { if (erroEmail) erroEmail.style.display = "block"; return; }
  if (!senha) { if (erroSenha) erroSenha.style.display = "block"; return; }

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "home.html";
  } catch (error) {
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/invalid-email" ||
      error.code === "auth/invalid-credential"
    ) {
      if (erroEmail) erroEmail.style.display = "block";
    } else if (error.code === "auth/wrong-password") {
      if (erroSenha) erroSenha.style.display = "block";
    }
  }
}



document.addEventListener("DOMContentLoaded", function () {
  const cpfInput = document.getElementById("cpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    });
  }
});

function ocultarErros(id) {
  document.querySelectorAll('[id^="erro-' + id + '"]').forEach(e => e.style.display = "none");
  const input = document.getElementById(id);
  if (input) input.classList.remove("input-error");
}

function mostrarErro(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "block";
  const campo = id.replace("erro-", "").split("-")[0];
  const input = document.getElementById(campo);
  if (input) input.classList.add("input-error");
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarNome(nome) {
  return !/\d/.test(nome);
}



async function cpfJaCadastrado(cpf) {
  const q = query(collection(db, "usuarios"), where("cpf", "==", cpf));
  const resultado = await getDocs(q);
  return !resultado.empty;
}



async function cadastrar() {
  ocultarMsg();
  let valido = true;

  const nome = document.getElementById("nome").value.trim();
  ocultarErros("nome");
  if (!nome) { mostrarErro("erro-nome"); valido = false; }
  else if (!validarNome(nome)) { mostrarErro("erro-nome-invalido"); valido = false; }

  const email = document.getElementById("email").value.trim();
  ocultarErros("email");
  if (!email) { mostrarErro("erro-email"); valido = false; }
  else if (!validarEmail(email)) { mostrarErro("erro-email-invalido"); valido = false; }

  const senha = document.getElementById("senha").value;
  ocultarErros("senha");
  if (!senha) { mostrarErro("erro-senha"); valido = false; }
  else if (senha.length < 6) { mostrarErro("erro-senha-fraca"); valido = false; }

  const dataNascimento = document.getElementById("dataNascimento").value;
  ocultarErros("dataNascimento");
  if (!dataNascimento) { mostrarErro("erro-dataNascimento"); valido = false; }

  const cidade = document.getElementById("cidade").value.trim();
  ocultarErros("cidade");
  if (!cidade) { mostrarErro("erro-cidade"); valido = false; }

  const cpf = document.getElementById("cpf").value.trim();
  ocultarErros("cpf");
  if (!cpf) { mostrarErro("erro-cpf"); valido = false; }
  else if (!/^\d+$/.test(cpf)) { mostrarErro("erro-cpf-invalido"); valido = false; }

  if (!valido) return;


  try {
    const cpfEmUso = await cpfJaCadastrado(cpf);
    if (cpfEmUso) {
      mostrarErro("erro-cpf-duplicado");
      return;
    }
  } catch (e) {
    mostrarMsg("Erro ao verificar CPF. Tente novamente.", "erro");
    return;
  }


  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nome,
      email,
      cpf,
      cidade,
      dataNascimento
    });

    mostrarMsg("Cadastro realizado! Redirecionando para o login...", "sucesso");
    setTimeout(() => window.location.href = "index.html", 2000);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      mostrarErro("erro-email-duplicado");
    } else if (error.code === "auth/weak-password") {
      mostrarErro("erro-senha-fraca");
    } else {
      mostrarMsg("Erro inesperado. Tente novamente.", "erro");
    }
  }
}

window.login = login;
window.cadastrar = cadastrar;
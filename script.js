// Seleção dos elementos
const form = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirma = document.getElementById("confirma");

const nomeHelp = document.getElementById("nomeHelp");
const emailHelp = document.getElementById("emailHelp");
const senhaHelp = document.getElementById("senhaHelp");
const confirmaHelp = document.getElementById("confirmaHelp");

const alertBox = document.getElementById("form-alert");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

// Regex senha forte
function passwordScore(pass) {
  let score = 0;
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[a-z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  return score;
}

// Atualiza barra de força
function updateStrength(pass) {
  const score = passwordScore(pass);
  const width = (score / 5) * 100;

  strengthBar.style.width = width + "%";

  let text = "Fraca";

  if (score <= 2) {
    strengthBar.style.background = "#c0392b";
    text = "Fraca";
  } else if (score === 3) {
    strengthBar.style.background = "#f39c12";
    text = "Média";
  } else if (score >= 4) {
    strengthBar.style.background = "#27ae60";
    text = "Forte";
  }

  strengthText.textContent = "Força: " + text;
}

// Helpers para feedback visual
function showHelp(help, msg, valid) {
  help.textContent = msg;
  help.classList.remove("text-danger", "text-success");
  help.classList.add(valid ? "text-success" : "text-danger");
  help.classList.remove("hidden");
}

// Validações individuais
function validateNome() {
  const ok = nome.validity.valid;
  showHelp(nomeHelp, ok ? "OK" : "Use apenas letras e espaços.", ok);
  nome.classList.toggle("is-valid", ok);
  nome.classList.toggle("is-invalid", !ok);
  return ok;
}

function validateEmail() {
  const ok = email.validity.valid;
  showHelp(emailHelp, ok ? "E-mail válido" : "Informe um e-mail válido", ok);
  email.classList.toggle("is-valid", ok);
  email.classList.toggle("is-invalid", !ok);
  return ok;
}

function validateSenha() {
  const v = senha.value;
  updateStrength(v);

  const ok = v.length >= 8 && passwordScore(v) >= 3;

  showHelp(
    senhaHelp,
    ok ? "Senha forte" : "Senha deve ter 8+ caracteres, com letras, números e símbolos",
    ok
  );
  senha.classList.toggle("is-valid", ok);
  senha.classList.toggle("is-invalid", !ok);

  if (confirma.value) validateConfirma();
  return ok;
}

function validateConfirma() {
  const ok = senha.value === confirma.value && confirma.value.length > 0;
  showHelp(confirmaHelp, ok ? "Senhas coincidem" : "Senhas não coincidem", ok);
  confirma.classList.toggle("is-valid", ok);
  confirma.classList.toggle("is-invalid", !ok);
  return ok;
}

// Eventos em tempo real
nome.addEventListener("input", validateNome);
email.addEventListener("input", validateEmail);
senha.addEventListener("input", validateSenha);
confirma.addEventListener("input", validateConfirma);

// Submit final
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ok =
    validateNome() &&
    validateEmail() &&
    validateSenha() &&
    validateConfirma();

  alertBox.classList.remove("d-none", "alert-success", "alert-danger");

  if (!ok) {
    alertBox.classList.add("alert-danger");
    alertBox.textContent = "Verifique os campos em vermelho.";
    return;
  }

  alertBox.classList.add("alert-success");
  alertBox.textContent = "Cadastro salvo com sucesso!";
  form.reset();

  // Reset visual pós submit
  [nome, email, senha, confirma].forEach((el) => {
    el.classList.remove("is-valid", "is-invalid");
  });
  strengthBar.style.width = "0";
  strengthText.textContent = "Força: —";
});

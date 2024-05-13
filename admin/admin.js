const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submit = document.querySelector("#btn");
const url = "https://3d97fdc2ac6a904f.mokky.dev/adm";
let valid = true;
submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    showError(emailInput, "Введите достоверный email");
    showError(passwordInput, "Введите достоверный пароль");
    return;
  } else {
    hideError(emailInput);
    hideError(passwordInput);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(
        "Ошибка аутентификации. Пожалуйста, проверьте введенные данные."
      );
    }

    window.location.href = "../admin/admin-main/main.html";
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert(error.message);
  }
});

function showError(input, message) {
  const errorLabel = input.nextElementSibling;
  errorLabel.textContent = message;
  errorLabel.style.display = "block";
}

function hideError(input) {
  const errorLabel = input.nextElementSibling;
  errorLabel.textContent = "";
  errorLabel.style.display = "none";
}

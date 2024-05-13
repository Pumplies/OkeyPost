document.querySelector(".logo__text").addEventListener("click", () => {
  window.location.href = "../index.html";
});

const url = "https://3d97fdc2ac6a904f.mokky.dev/reg";
const numberInput = document.querySelector("#num");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector(".loginBtn");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const number = numberInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !number || !password) {
    showError(emailInput, "Введите достоверный email");
    showError(numberInput, "Введите достоверный номер телефона");
    showError(passwordInput, "Введите достоверный пароль");
    return;
  } else {
    hideError(emailInput);
    hideError(numberInput);
    hideError(passwordInput);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, number }),
    });

    if (!response.ok) {
      throw new Error(
        "Ошибка аутентификации. Пожалуйста, проверьте введенные данные."
      );
    }

    window.location.href = "../profile/profile.html";
  } catch (error) {
    console.error("Ошибка:", error.message);
    alert(error.message);
  }

  function addLocalStorage(numberInput, emailInput, passwordInputOne) {
    localStorage.setItem("Телефон", numberInput);
    localStorage.setItem("E-mail", emailInput);
    localStorage.setItem("password", passwordInputOne);
    window.location.href = "../profile/profile.html";
  }
  addLocalStorage(number, email, password);
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

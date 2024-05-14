document.querySelector(".logo__text").addEventListener("click", () => {
  window.location.href = "../index.html";
});

const registrationBtn = document.querySelector(".sub");
const numberInput = document.querySelector("#num");
const emailInput = document.querySelector("#email");
const loginInput = document.querySelector("#login");
const passwordInputOne = document.querySelector("#password");
const passwordInputTwo = document.querySelector("#password-two");

registrationBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  let isValid = true;

  const number = numberInput.value;
  const email = emailInput.value;
  const login = loginInput.value;
  const passwordOne = passwordInputOne.value;
  const passwordTwo = passwordInputTwo.value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (number === "" && number.length >= 11) {
    showError(numberInput, "Введите свой действительный номер телефона");
    isValid = false;
  } else {
    hideError(numberInput);
  }

  if (!emailRegex.test(email)) {
    showError(emailInput, "Введите свой действительный email адрес");
    isValid = false;
  } else {
    hideError(emailInput);
  }

  if (login.length < 8) {
    showError(loginInput, "Логин должен иметь минимум 8 символов");
    isValid = false;
  } else {
    hideError(loginInput);
  }

  if (passwordOne.length < 6 || passwordTwo.length < 6) {
    showError(passwordInputOne, "Пароль должен содержать не менее 6 символов");
    showError(passwordInputTwo, "Пароль должен содержать не менее 6 символов");
    isValid = false;
  } else if (passwordOne !== passwordTwo) {
    showError(passwordInputTwo, "Пароли не совпадают");
    isValid = false;
  } else {
    hideError(passwordInputOne);
    hideError(passwordInputTwo);
  }

  if (isValid) {
    const dataToSend = {
      phoneNumber: number,
      emailUser: email,
      loginUser: login,
      passwordUser: passwordOne,
    };

    await sendDataToAPI(dataToSend);
  }

  function addLocalStorage(
    numberInput,
    emailInput,
    passwordInputOne,
    loginInput
  ) {
    localStorage.setItem("Телефон", numberInput);
    localStorage.setItem("E-mail", emailInput);
    localStorage.setItem("Логин", loginInput);
    localStorage.setItem("password", passwordInputOne); 
    window.location.href = "../login/login.html";
  }
  addLocalStorage(number, email, passwordOne, login);
});

async function sendDataToAPI(data) {
  try {
    const response = await fetch("https://4015abceced6b993.mokky.dev/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных");
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

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

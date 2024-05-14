const time = document.querySelector(".time__text");

function updateCurrentTime() {
  let currentTime = new Date();
  time.textContent = currentTime.toLocaleTimeString();
}
setInterval(updateCurrentTime, 1000);
updateCurrentTime;

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelector(".save");

  saveButton.addEventListener("click", async function () {
    const inputs = document.querySelectorAll(".text__inp input");
    inputs.forEach(function (input) {
      localStorage.setItem(
        input.previousElementSibling.textContent.slice(0, -1),
        input.value.replace(/\s/g, "")
      );
    });

    const mainName = localStorage.getItem("Имя");
    const login = localStorage.getItem("Логин");
    const email = localStorage.getItem("E-mail");
    const phoneNumber = localStorage.getItem("Телефон");
    const address = localStorage.getItem("Адрес");
    const avatarUrl = localStorage.getItem("Аватарка (ссылка)");

    const userData = {
      mainName,
      login,
      email,
      phoneNumber,
      address,
      avatarUrl,
    };

    saveUserData(userData);

    try {
      const response = await fetch("https://3d97fdc2ac6a904f.mokky.dev/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных на сервер");
      }

      console.log("Данные успешно отправлены на сервер");
      window.location.href = "../profile.html";
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при отправке данных на сервер");
    }
  });

  const savedInputs = document.querySelectorAll(".text__inp input");
  savedInputs.forEach(function (input) {
    const value = localStorage.getItem(
      input.previousElementSibling.textContent.slice(0, -1)
    );
    if (value) {
      input.value = value;
    }
  });
});

function saveUserData(userData) {
  localStorage.setItem("Имя", userData.mainName);
  localStorage.setItem("Логин", userData.login);
  localStorage.setItem("E-mail", userData.email);
  localStorage.setItem("Телефон", userData.phoneNumber);
  localStorage.setItem("Адрес", userData.address);
  localStorage.setItem("Аватарка (ссылка)", userData.avatarUrl);
}

const imgElement = document.querySelector(".ava");
const miniAva = document.querySelector(".mini__ava");
const savedImageSrc = localStorage.getItem("Аватарка (ссылка)");
if (savedImageSrc) {
  miniAva.src = savedImageSrc;
  imgElement.src = savedImageSrc;
}
const topName = document.querySelector(".top__name");
topName.textContent = localStorage.getItem("Имя");

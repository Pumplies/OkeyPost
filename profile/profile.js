const time = document.querySelector(".time__text");

function updateCurrentTime() {
  let currentTime = new Date();
  time.textContent = currentTime.toLocaleTimeString();
}
setInterval(updateCurrentTime, 1000);
updateCurrentTime;

document.querySelector(".edit").addEventListener("click", () => {
  window.location.href = "edit/edit.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const mainNameElement = document.querySelector(".main__name");
  const loginElement = document.querySelector(".login");
  const emailElement = document.querySelector(".e-mail");
  const phoneNumberElement = document.querySelector(".phone__number");
  const adresElement = document.querySelector(".adres");
  const topName = document.querySelector(".top__name");
  const imgElement = document.querySelector(".ava");
  const miniAva = document.querySelector(".mini__ava");
  const savedImageSrc = localStorage.getItem("Аватарка (ссылка)");
  if (savedImageSrc) {
    miniAva.src = savedImageSrc;
    imgElement.src = savedImageSrc;
  }

  const editButton = document.querySelector(".edit");

  mainNameElement.textContent = localStorage.getItem("Имя");
  topName.textContent = localStorage.getItem("Имя");
  loginElement.textContent = localStorage.getItem("Логин");
  emailElement.textContent = localStorage.getItem("E-mail");
  phoneNumberElement.textContent = localStorage.getItem("Телефон");
  adresElement.textContent = localStorage.getItem("Адрес");
});

document.addEventListener("DOMContentLoaded", () => {
  const avatarStorage = localStorage.getItem("Аватарка (ссылка)");
  const nameStorage = localStorage.getItem("Логин");

  if (nameStorage && avatarStorage) {
    const authLink = document.querySelector(".name .top__name");
    authLink.textContent = nameStorage;

    const userImage = document.querySelector(".avatar__name .avatar");
    userImage.src = avatarStorage;
    userImage.style.width = "60px";
    userImage.style.width = "50px";
    userImage.style.borderRadius = "30px";

    const deleteBtn = document.createElement("text");
    deleteBtn.classList.add("delete-txt");
    deleteBtn.textContent = "Выйти";

    deleteBtn.addEventListener("click", () => {
      localStorage.removeItem("Логин");
      localStorage.removeItem("Аватарка (ссылка)");

      location.reload();
    });
    const authDiv = document.querySelector(".avatar__name");
    authDiv.appendChild(deleteBtn);
  }
});

const modal = document.getElementById("myModal");
const openModalBtn = document.querySelector(".change__password");
const closeModalBtn = document.getElementsByClassName("close")[0];
const changePasswordBtn = document.getElementById("changePasswordBtn");

openModalBtn.onclick = function () {
  modal.style.display = "block";
};

closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

changePasswordBtn.addEventListener("click", () => {
  const oldPassword = document.querySelector("#oldPassword").value;
  const newPassword = document.querySelector("#newPassword").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  if (newPassword !== confirmPassword) {
    showError(
      document.querySelector("#newPassword"),
      "Пароли должны совпадать"
    );
    showError(
      document.querySelector("#confirmPassword"),
      "Пароли должны совпадать"
    );
    return;
  } else {
    hideError(document.querySelector("#newPassword"));
    hideError(document.querySelector("#confirmPassword"));
  }

  localStorage.setItem("newPassword", newPassword);
  localStorage.removeItem("password");

  alert("Пароль успешно изменен!");
  modal.style.display = "none";
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

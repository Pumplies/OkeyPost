document.addEventListener("DOMContentLoaded", async () => {
  let usersData; // Переменная доступна обоим обработчикам

  try {
    const response = await fetch("https://3d97fdc2ac6a904f.mokky.dev/log");
    if (!response.ok) {
      throw new Error("Ошибка");
    }
    usersData = await response.json();
    renderUsers(usersData);
  } catch (error) {
    alert("Ошибка при загрузке пользователей");
  }

  const searchInput = document.querySelector(
    'input[type="text"][placeholder="Пользователь"]'
  );
  const showButton = document.querySelector("#search");
  showButton.addEventListener("click", async () => {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredUsers = usersData.filter((user) => {
      return (
        user.login.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery) ||
        user.mainName.toLowerCase().includes(searchQuery) ||
        String(user.id).includes(searchQuery)
      );
    });

    const usersContainer = document.querySelector(".people-information");
    usersContainer.innerHTML = "";
    renderUsers(filteredUsers);
  });
});

function renderUsers(usersData) {
  const usersContainer = document.querySelector(".people-information");

  usersData.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.classList.add("people-information-container");

    userElement.innerHTML = `
        <div class="information">
        <p>${user.id}</p>
      </div>

      <div class="information">
        <p>${user.login}</p>
      </div>

      <div class="information">
        <p>${user.email}</p>
      </div>

      <div class="information">
        <p>${user.mainName}</p>
      </div>

      <div class="information">
        <p>${user.phoneNumber}</p>
      </div>

      <div class="information">
        <p>0</p>
      </div>

      <div class="use-use">
        <img src="../admin-users/usersimg/Handbag.svg" alt="" />
        <img src="../admin-users/usersimg/PencilLine.svg" alt="" />
        <img class='delete-icon' src="../admin-users/usersimg/Trash.svg" alt="" />
        <img src="../admin-users/usersimg/EnvelopeSimple.svg" alt="" />
      </div>
    `;

    const deleteIcon = userElement.querySelector(".delete-icon");
    deleteIcon.addEventListener("click", async () => {
      try {
        const response = await fetch(
          `https://3d97fdc2ac6a904f.mokky.dev/log/${user.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Ошибка при удалении пользователя");
        }
        userElement.remove();
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при удалении пользователя");
      }
    });

    usersContainer.appendChild(userElement);
  });
}

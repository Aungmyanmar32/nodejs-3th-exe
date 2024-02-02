const createButton = document.querySelector(".create");
const menuList = document.querySelector(".menuList");

const menuName = document.querySelector(".name");
const price = document.querySelector(".price");

const createUi = (dataFromServer) => {
  const menuDiv = document.createElement("div");
  dataFromServer.forEach((item) => {
    const menuName = document.createElement("div");
    const deleteButton = document.createElement("button");
    menuName.innerHTML = item.name;
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteMenu(item.id));
    menuDiv.style.margin = "10px";
    menuDiv.append(menuName, deleteButton);
  });
  menuList.innerHTML = "";
  menuList.append(menuDiv);
};
const deleteMenu = async (id) => {
  const response = await fetch(`http://localhost:3000/menus?id=${id}`, {
    method: "DELETE",
  });
  const dataFromServer = await response.json();

  createUi(dataFromServer);
};

const getMenu = async () => {
  const response = await fetch("http://localhost:3000/menus");
  const dataFromServer = await response.json();
  createUi(dataFromServer);
};

const createMenu = async () => {
  const newMenu = { name: menuName.value, price: price.value };

  const response = await fetch("http://localhost:3000/menus", {
    method: "POST",
    body: JSON.stringify(newMenu),
  });

  const dataFromServer = await response.json();

  createUi(dataFromServer);
};
createButton.addEventListener("click", createMenu);

getMenu();

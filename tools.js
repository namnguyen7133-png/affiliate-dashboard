const colors = ["blue","green","orange","purple"];
const menu = document.getElementById("menu");

function renderMenu(){
  menu.innerHTML = "";
  FILE_LIST.forEach((file, index) => {
    const a = document.createElement("a");
    a.href = file;
    a.textContent = file;
    a.className = colors[index % colors.length];
    menu.appendChild(a);
  });
}

renderMenu();

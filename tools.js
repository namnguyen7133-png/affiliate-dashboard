const colors = ["blue", "green", "orange", "purple"];
const menu = document.getElementById("menu");

/* Vẽ menu */
function renderMenu(files) {
  menu.innerHTML = "";

  files.forEach((item, index) => {
    const a = document.createElement("a");

    a.href = item.file;          // link tới file html
    a.textContent = item.name;   // tên hiển thị
    a.className = colors[index % colors.length];

    a.target = "_blank";         // mở tab mới (có thể bỏ nếu không thích)

    menu.appendChild(a);
  });
}

/* Đọc files.json */
fetch("files.json")
  .then(res => res.json())
  .then(list => {
    const activeList = list.filter(item => item.active === true);
    renderMenu(activeList);
  })
  .catch(err => {
    menu.innerHTML = "❌ Không tải được danh sách tool";
    console.error(err);
  });

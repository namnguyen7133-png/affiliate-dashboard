const colors = ["blue", "green", "orange", "purple"];
const menu = document.getElementById("menu");

function renderMenu(files) {
  menu.innerHTML = "";

  // nhóm TOOL: các file bắt đầu bằng 004
  const toolGroup = files.filter(item =>
    item.file.startsWith("004")
  );

  // các mục còn lại
  const otherGroup = files.filter(item =>
    !item.file.startsWith("004")
  );

  // vẽ nhóm thường
  otherGroup.forEach((item, index) => {
    const a = document.createElement("a");
    a.href = item.file;
    a.textContent = item.name;
    a.className = colors[index % colors.length] + " menu-item";
    a.target = "_blank";
    menu.appendChild(a);
  });

  // vẽ TOOL
  if (toolGroup.length > 0) {
    const title = document.createElement("div");
    title.textContent = "🔧 TOOL – Nhóm 004";
    title.style.fontWeight = "bold";
    title.style.marginTop = "16px";
    menu.appendChild(title);

    toolGroup.forEach(item => {
      const a = document.createElement("a");
      a.href = item.file;
      a.textContent = "↳ " + item.name;
      a.className = "menu-item";
      a.style.marginLeft = "18px";
      a.target = "_blank";
      menu.appendChild(a);
    });
  }
}

/* load files.json */
fetch("files.json")
  .then(res => res.json())
  .then(list => {
    const activeList = list.filter(item => item.active === true);
    renderMenu(activeList);
  })
  .catch(err => {
    menu.innerHTML = "❌ Không tải được danh sách";
    console.error(err);
  });

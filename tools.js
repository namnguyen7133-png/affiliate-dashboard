const colors = ["blue", "green", "orange", "purple"];
const menu = document.getElementById("menu");

/* Vẽ menu có gộp TOOL */
function renderMenu(files) {
  menu.innerHTML = "";

  // 1. Tách nhóm TOOL và nhóm khác
  const toolGroup = files.filter(item => item.tag === "tool");
  const otherGroup = files.filter(item => item.tag !== "tool");

  // 2. Vẽ các nhóm KHÔNG PHẢI TOOL (hiện bình thường)
  otherGroup.forEach((item, index) => {
    const a = document.createElement("a");
    a.href = item.file;
    a.textContent = item.name;
    a.className = colors[index % colors.length] + " menu-item";
    a.target = "_blank";
    menu.appendChild(a);
  });

  // 3. Nếu có TOOL → gộp lại
  if (toolGroup.length > 0) {
    const groupTitle = document.createElement("div");
    groupTitle.textContent = "🔧 TOOL";
    groupTitle.style.fontWeight = "bold";
    groupTitle.style.marginTop = "16px";
    groupTitle.style.marginBottom = "8px";
    menu.appendChild(groupTitle);

    toolGroup.forEach(item => {
      const a = document.createElement("a");
      a.href = item.file;
      a.textContent = "↳ " + item.name;
      a.className = "menu-item tool-child";
      a.target = "_blank";
      menu.appendChild(a);
    });
  }
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

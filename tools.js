const colors = ["blue", "green", "orange", "purple"];
const menu = document.getElementById("menu");

function getGroupKey(filename) {
  // Lấy 3 số đầu: 004, 005, 006...
  const match = filename.match(/^(\d{3})/);
  return match ? match[1] : "other";
}

function renderMenu(files) {
  menu.innerHTML = "";

  // 1. Lọc active
  const activeFiles = files.filter(f => f.active === true);

  // 2. Gom nhóm theo số
  const groups = {};
  activeFiles.forEach(item => {
    const key = getGroupKey(item.file);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  // 3. Sắp xếp nhóm theo số
  const sortedGroupKeys = Object.keys(groups).sort();

  sortedGroupKeys.forEach((key, groupIndex) => {
    const group = groups[key];

    // Nếu nhóm chỉ có 1 file → hiển thị như bình thường
    if (group.length === 1) {
      const item = group[0];
      const a = document.createElement("a");
      a.href = item.file;
      a.textContent = item.name;
      a.className = colors[groupIndex % colors.length] + " menu-item";
      a.target = "_blank";
      menu.appendChild(a);
      return;
    }

    // Nếu có A/B/C → tạo nhóm
    const title = document.createElement("div");
    title.textContent = `📁 Nhóm ${key}`;
    title.style.fontWeight = "bold";
    title.style.marginTop = "14px";
    menu.appendChild(title);

    // Sắp xếp A → B → C
    group
      .sort((a, b) => a.file.localeCompare(b.file))
      .forEach(item => {
        const a = document.createElement("a");
        a.href = item.file;
        a.textContent = "↳ " + item.name;
        a.className = "menu-item";
        a.style.marginLeft = "18px";
        a.target = "_blank";
        menu.appendChild(a);
      });
  });
}

/* Load files.json */
fetch("files.json")
  .then(res => res.json())
  .then(list => renderMenu(list))
  .catch(err => {
    menu.innerHTML = "❌ Không tải được menu";
    console.error(err);
  });

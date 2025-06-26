const list = document.getElementById("list");
const listUrl = 'https://raw.githubusercontent.com/rlutzlutz/kirchenpech/main/list.json';

fetch(listUrl)
  .then(response => response.json())
  .then(data => {
    renderList(data);
  })
  .catch(err => console.error("Couldn't load the list:", err));

function renderList(items) {
  list.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.checked ? `✅ ${item.text}` : `⬜️ ${item.text}`;
    list.appendChild(li);
  });
}
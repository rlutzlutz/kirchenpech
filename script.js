const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const list = document.getElementById("list");
const clearBtn = document.getElementById("clear-btn");

let items = JSON.parse(localStorage.getItem("kirchenpech")) || [];

function saveItems() {
  localStorage.setItem("kirchenpech", JSON.stringify(items));
}

function renderList() {
  list.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;
    checkbox.addEventListener("change", () => {
      items[index].checked = checkbox.checked;
      saveItems();
    });

    const text = document.createElement("span");
    text.textContent = item.text;
    if (item.checked) text.style.textDecoration = "line-through";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
      items.splice(index, 1);
      saveItems();
      renderList();
    });

    li.append(checkbox, text, deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newItem = input.value.trim();
  if (newItem) {
    items.push({ text: newItem, checked: false });
    input.value = "";
    saveItems();
    renderList();
  }
});

clearBtn.addEventListener("click", () => {
  if (confirm("Clear the entire list?")) {
    items = [];
    saveItems();
    renderList();
  }
});

renderList();
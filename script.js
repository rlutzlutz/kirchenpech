const list = document.getElementById("list");
const listUrl = 'https://raw.githubusercontent.com/rlutzlutz/kirchenpech/main/list.json';
const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const clearBtn = document.getElementById("clear-btn");

let items = []; // This will hold the current list

// Fetch the list from GitHub when the page loads
fetch(listUrl)
  .then(response => response.json())
  .then(data => {
    items = data;
    renderList();
  })
  .catch(err => console.error("Couldn't load the list:", err));

function renderList() {
  list.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;
    checkbox.addEventListener("change", () => {
      items[index].checked = checkbox.checked;
      renderList(); // Re-render so we can strike through text
    });

    // Text
    const text = document.createElement("span");
    text.textContent = item.text;
    if (item.checked) text.style.textDecoration = "line-through";
    text.style.marginLeft = "0.5em";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "1em";
    deleteBtn.addEventListener("click", () => {
      items.splice(index, 1);
      renderList();
    });

    li.append(checkbox, text, deleteBtn);
    list.appendChild(li);
  });
}

// Add item from form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newItem = input.value.trim();
  if (newItem) {
    items.push({ text: newItem, checked: false });
    input.value = "";
    renderList();
  }
});

// Clear all items
clearBtn.addEventListener("click", () => {
  if (confirm("Clear the entire list?")) {
    items = [];
    renderList();
  }
});
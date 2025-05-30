const input = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");

const listRef = db.ref("sharedList");

// Add item to Firebase
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    const newItemRef = listRef.push();
    newItemRef.set({ text, checked: false });
    input.value = "";
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Render item to list
function renderItem(key, item) {
  const li = document.createElement("li");
  if (item.checked) li.classList.add("checked");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.checked;
  checkbox.addEventListener("change", () => {
    listRef.child(key).update({ checked: checkbox.checked });
  });

  const span = document.createElement("span");
  span.textContent = item.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.addEventListener("click", () => {
    listRef.child(key).remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.id = key;
  list.appendChild(li);
}

// Listen for new items
listRef.on("child_added", (snapshot) => {
  renderItem(snapshot.key, snapshot.val());
});

// Listen for changes
listRef.on("child_changed", (snapshot) => {
  const li = document.getElementById(snapshot.key);
  if (li) {
    li.querySelector("input").checked = snapshot.val().checked;
    if (snapshot.val().checked) {
      li.classList.add("checked");
    } else {
      li.classList.remove("checked");
    }
  }
});

// Listen for deletions
listRef.on("child_removed", (snapshot) => {
  const li = document.getElementById(snapshot.key);
  if (li) {
    li.remove();
  }
});

const STORAGE_KEY = "googlezero_manual_shortcuts";

const shortcutsContainer = document.getElementById("shortcuts");
const addButton = document.getElementById("addShortcut");
const dialog = document.getElementById("shortcutDialog");
const form = document.getElementById("shortcutForm");

const nameInput = document.getElementById("shortcutName");
const urlInput = document.getElementById("shortcutUrl");

let shortcuts = [];

function loadShortcuts() {
  try {
    shortcuts = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(shortcuts)) {
      shortcuts = [];
    }
  } catch {
    shortcuts = [];
  }

  renderShortcuts();
}

function saveShortcuts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
}

function renderShortcuts() {
  shortcutsContainer.replaceChildren();

  shortcuts.forEach((shortcut, index) => {
    const link = document.createElement("a");
    link.className = "shortcut";
    link.href = shortcut.url;
    link.title = shortcut.name;

    const icon = document.createElement("span");
    icon.className = "shortcut-icon";
    icon.textContent = shortcut.name.charAt(0).toUpperCase();

    const name = document.createElement("span");
    name.className = "shortcut-name";
    name.textContent = shortcut.name;

    const remove = document.createElement("button");
    remove.className = "remove-shortcut";
    remove.type = "button";
    remove.textContent = "×";
    remove.title = "Remove shortcut";

    remove.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      shortcuts.splice(index, 1);
      saveShortcuts();
      renderShortcuts();
    });

    link.append(icon, name, remove);
    shortcutsContainer.appendChild(link);
  });
}

addButton.addEventListener("click", () => {
  form.reset();
  dialog.showModal();
  nameInput.focus();
});

document.getElementById("cancelShortcut").addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  let url = urlInput.value.trim();

  if (!name || !url) return;

  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    alert("Please enter a valid website address.");
    return;
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    alert("Only HTTP and HTTPS websites are supported.");
    return;
  }

  shortcuts.push({
    name,
    url: parsedUrl.href
  });

  saveShortcuts();
  renderShortcuts();
  dialog.close();
});

loadShortcuts();

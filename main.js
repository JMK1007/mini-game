// Fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li class="item" data-type="${item.type}" data-color="${item.color}">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
  `;
}

// function onButtonClick(event, items) -> 이 경우는 filter로 새로운 배열 생성
function onButtonClick(event) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  const items = document.querySelectorAll('.item');

  if (key == null || value == null) {
    return;
  }

  updateItems(items, value);
  // const filtered = items.filter((item) => item[key] === value);
  // 새로운 배열 생성
  // displayItems(filtered);
}

function updateItems(items, value) {
  items.forEach((item) => {
    if (item.dataset.type === value || item.dataset.color === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);

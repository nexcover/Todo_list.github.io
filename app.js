
let todoItems = [];
let currentEditIndex;

function renderTodoList() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todoItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
          <span>${item}</span>
          <div>
            <button onclick="openEditModal(${index})">수정</button>
            <button onclick="deleteItem(${index})">삭제</button>
          </div>
        `;
        todoList.appendChild(listItem);
    });
}

function openModal(modalId) {
    const modal = document.getElementById(`${modalId}Modal`);
    modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(`${modalId}Modal`);
    modal.style.display = 'none';
}

function validateAndAddItem() {
    const newItem = document.getElementById('newItem').value;
    if (newItem.length > 40) {
        alert("40자 이상은 입력이 안 됩니다.");
    } else {
        todoItems.push(newItem);
        renderTodoList();
        saveToLocalStorage();
        closeModal('add');
    }
}

function openEditModal(index) {
    document.getElementById('editItem').value = todoItems[index];
    openModal('edit');
    currentEditIndex = index;
}

function validateAndSaveEdit() {
    const editedItem = document.getElementById('editItem').value;
    if (editedItem.length > 40) {
        alert("40자 이상은 입력이 안 됩니다.");
    } else {
        todoItems[currentEditIndex] = editedItem;
        renderTodoList();
        saveToLocalStorage();
        closeModal('edit');
    }
}

function deleteItem(index) {
    todoItems.splice(index, 1);
    renderTodoList();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function loadFromLocalStorage() {
    const storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
        todoItems = JSON.parse(storedItems);
        renderTodoList();
    }
}

function showErrorModal() {
    openModal('error');
}

function validateAndAddItem() {
    const newItemInput = document.getElementById('newItem');
    const newItem = newItemInput.value;
    if (newItem.length > 40) {
        showErrorModal();
    } else {
        todoItems.push(newItem);
        renderTodoList();
        saveToLocalStorage();
        closeModal('add');
        // 아이템을 성공적으로 추가한 후에 입력 필드를 비워줍니다.
        newItemInput.value = '';
    }
}

function validateAndSaveEdit() {
    const editedItem = document.getElementById('editItem').value;
    if (editedItem.length > 40) {
        showErrorModal();
    } else {
        todoItems[currentEditIndex] = editedItem;
        renderTodoList();
        saveToLocalStorage();
        closeModal('edit');
    }
}

// 검색어를 입력하면 검색어가 뜨게 하는 함수

function searchTodoItems() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    // 검색어와 일치하는 todoItems를 필터링
    const filteredItems = todoItems.filter(item => item.toLowerCase().includes(searchTerm));

    // 필터링된 todoItems를 렌더링
    renderTodoList(filteredItems);
}

// renderTodoList 함수 수정하여 선택적으로 items 매개변수를 받도록 변경
function renderTodoList(items = todoItems) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
                <span>${item}</span>
                <div>
                    <button onclick="openEditModal(${index})">수정</button>
                    <button onclick="deleteItem(${index})">삭제</button>
                </div>
            `;
        todoList.appendChild(listItem);
    });
}

window.onload = loadFromLocalStorage;
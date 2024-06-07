document.addEventListener('DOMContentLoaded', () => {
    const todoList = [];
    const todoListElement = document.getElementById('todoList');
    const newTodoInput = document.getElementById('new-todo');
    const addItemButton = document.getElementById('addItemButton');
    const sortButton = document.getElementById('sortButton');

    addItemButton.addEventListener('click', addItem);
    sortButton.addEventListener('click', sortItems);

    function addItem() {
        const name = newTodoInput.value.trim();
        
        if (validateName(name)) {
            const newItem = {
                id: Date.now(),
                name: name,
                createdDate: new Date(),
                completed: false
            };
            
            todoList.push(newItem);
            renderList();
            newTodoInput.value = '';
        } else {
            alert('Please make sure the name starts with an uppercase letter, is not empty, and is longer than three characters.');
        }
    }

    function validateName(name) {
        return name.length > 3 && /^[A-Z]/.test(name);
    }

    function renderList() {
        todoListElement.innerHTML = '';
        todoList.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = `todo-item ${item.completed ? 'completed' : ''}`;
            listItem.dataset.id = item.id;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.completed;
            checkbox.addEventListener('click', () => toggleComplete(item.id));
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'todo-name';
            nameSpan.textContent = item.name;
            
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.innerHTML = '&times;';
            removeButton.addEventListener('click', () => removeItem(item.id));
            
            listItem.appendChild(checkbox);
            listItem.appendChild(nameSpan);
            listItem.appendChild(removeButton);
            todoListElement.appendChild(listItem);
        });
    }

    function toggleComplete(id) {
        const item = todoList.find(todo => todo.id === id);
        if (item) {
            item.completed = !item.completed;
            renderList();
        }
    }

    function sortItems() {
        todoList.sort((a, b) => a.name.localeCompare(b.name));
        renderList();
    }

    function removeItem(id) {
        const index = todoList.findIndex(todo => todo.id === id);
        if (index > -1) {
            todoList.splice(index, 1);
            renderList();
        }
    }
});

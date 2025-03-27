document.addEventListener('DOMContentLoaded', () => {
    // Array to store todo list items
    const todoList = [];
    
    // Get references to DOM elements
    const todoListElement = document.getElementById('todoList');
    const newTodoInput = document.getElementById('new-todo');
    const addItemButton = document.getElementById('addItemButton');
    const sortButton = document.getElementById('sortButton');

    // Add event listeners to buttons
    addItemButton.addEventListener('click', addItem);
    sortButton.addEventListener('click', sortItems);

    // Function to add a new item to the todo list
    function addItem() {
        const name = newTodoInput.value.trim(); // Trim whitespace from input
        
        if (validateName(name)) { // Validate input name
            const newItem = {
                id: Date.now(), // Unique ID using timestamp
                name: name,
                createdDate: new Date(),
                completed: false
            };
            
            todoList.push(newItem); // Add new item to the list
            renderList(); // Refresh UI
            newTodoInput.value = ''; // Clear input field
        } else {
            alert('Please make sure the name starts with an uppercase letter, is not empty, and is longer than three characters.');
        }
    }

    // Function to validate the todo item name
    function validateName(name) {
        return name.length > 3 && /^[A-Z]/.test(name); // Must start with uppercase & be longer than 3 characters
    }

    // Function to render the todo list in the UI
    function renderList() {
        todoListElement.innerHTML = ''; // Clear existing list
        
        todoList.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = `todo-item ${item.completed ? 'completed' : ''}`;
            listItem.dataset.id = item.id;
            
            // Create checkbox for marking completion
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.completed;
            checkbox.addEventListener('click', () => toggleComplete(item.id));
            
            // Create span for displaying todo name
            const nameSpan = document.createElement('span');
            nameSpan.className = 'todo-name';
            nameSpan.textContent = item.name;
            
            // Create remove button to delete the item
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-button';
            removeButton.innerHTML = '&times;'; // '×' symbol
            removeButton.addEventListener('click', () => removeItem(item.id));
            
            // Append elements to list item
            listItem.appendChild(checkbox);
            listItem.appendChild(nameSpan);
            listItem.appendChild(removeButton);
            
            // Append list item to the todo list element
            todoListElement.appendChild(listItem);
        });
    }

    // Function to toggle the completed state of a todo item
    function toggleComplete(id) {
        const item = todoList.find(todo => todo.id === id);
        if (item) {
            item.completed = !item.completed; // Toggle completion state
            renderList(); // Refresh UI
        }
    }

    // Function to sort todo items alphabetically by name
    function sortItems() {
        todoList.sort((a, b) => a.name.localeCompare(b.name));
        renderList(); // Refresh UI
    }

    // Function to remove a todo item from the list
    function removeItem(id) {
        const index = todoList.findIndex(todo => todo.id === id);
        if (index > -1) {
            todoList.splice(index, 1); // Remove item from array
            renderList(); // Refresh UI
        }
    }
});

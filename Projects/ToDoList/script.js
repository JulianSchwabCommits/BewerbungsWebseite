document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoTime = document.getElementById('todo-time');
    const todoTags = document.getElementById('todo-tags');
    const addButton = document.querySelector('.add-btn');
    const todoList = document.querySelector('.todo-list');
    const emptyState = document.querySelector('.empty-state');
    const tagFilter = document.getElementById('tag-filter');
    const timeFilter = document.getElementById('time-filter');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateEmptyState() {
        if (todos.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }

    function createTodoElement(todo, index) {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        
        const textContainer = document.createElement('div');
        textContainer.className = 'todo-content';
        
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        
        const details = document.createElement('div');
        details.className = 'todo-details';
        
        if (todo.time) {
            const time = document.createElement('span');
            time.className = 'todo-time';
            time.textContent = todo.time;
            details.appendChild(time);
        }
        
        if (todo.tags && todo.tags.length > 0) {
            const tags = document.createElement('div');
            tags.className = 'todo-tags';
            todo.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag;
                tags.appendChild(tagSpan);
            });
            details.appendChild(tags);
        }
        
        textContainer.appendChild(text);
        textContainer.appendChild(details);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Löschen';
        
        li.appendChild(checkbox);
        li.appendChild(textContainer);
        li.appendChild(deleteBtn);
        
        return li;
    }

    function filterTodos() {
        const tagFilterValue = tagFilter.value.toLowerCase();
        const timeFilterValue = timeFilter.value;
        
        return todos.filter(todo => {
            const matchesTag = !tagFilterValue || 
                (todo.tags && todo.tags.some(tag => 
                    tag.toLowerCase().includes(tagFilterValue)));
            
            const matchesTime = timeFilterValue === 'all' || 
                matchTimeFilter(todo.time, timeFilterValue);
            
            return matchesTag && matchesTime;
        });
    }

    function matchTimeFilter(todoTime, filterValue) {
        if (!todoTime) return false;
        
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const [hours, minutes] = todoTime.split(':');
        const todoDate = new Date();
        todoDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        switch(filterValue) {
            case 'today':
                return todoDate.getDate() === today.getDate();
            case 'tomorrow':
                return todoDate.getDate() === tomorrow.getDate();
            case 'upcoming':
                return todoDate > today;
            default:
                return true;
        }
    }

    function renderTodos() {
        todoList.innerHTML = '';
        const filteredTodos = filterTodos();
        
        if (filteredTodos.length === 0) {
            todoList.appendChild(emptyState);
        } else {
            filteredTodos.forEach((todo, index) => {
                const li = createTodoElement(todo, index);
                
                li.querySelector('.todo-checkbox').addEventListener('change', () => {
                    toggleTodo(index);
                });
                
                li.querySelector('.delete-btn').addEventListener('click', () => {
                    deleteTodo(index, li);
                });
                
                todoList.appendChild(li);
            });
        }
        updateEmptyState();
    }

    function addTodo(text, time, tags) {
        if (text.trim()) {
            const tagArray = tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);
                
            todos.push({
                text,
                time,
                tags: tagArray,
                completed: false
            });
            
            saveTodos();
            renderTodos();
            
            // Reset inputs
            todoInput.value = '';
            todoTime.value = '';
            todoTags.value = '';
        }
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index, element) {
        element.classList.add('removing');
        element.addEventListener('animationend', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
    }

    // Event Listeners
    addButton.addEventListener('click', () => {
        addTodo(todoInput.value, todoTime.value, todoTags.value);
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo(todoInput.value, todoTime.value, todoTags.value);
        }
    });

    tagFilter.addEventListener('input', renderTodos);
    timeFilter.addEventListener('change', renderTodos);

    // Initial render
    renderTodos();
});

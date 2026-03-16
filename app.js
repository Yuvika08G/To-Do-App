let todolist = JSON.parse(localStorage.getItem('todolist')) || [];

document.querySelector('#task').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addtodo();
    }
});

displayItems();

function save() {
    localStorage.setItem('todolist', JSON.stringify(todolist));
}

function addtodo() {
    let inputelement = document.querySelector('#task');
    let dateelement = document.querySelector('#date');
    let todoItem = inputelement.value;
    let tododate = dateelement.value;
    if (!todoItem) return;
    todolist.push({ item: todoItem, duedate: tododate });
    save();
    inputelement.value = '';
    dateelement.value = '';
    displayItems();
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    let [yyyy, mm, dd] = dateStr.split('-');
    return `${dd}-${mm}-${yyyy}`;
}

function displayItems() {
    let containerelement = document.querySelector('.todo-container');
    let newhtml = '';
    for (let i = 0; i < todolist.length; i++) {
        let { item, duedate } = todolist[i];
        newhtml += `
        <span>${item}</span>
        <span>${formatDate(duedate)}</span>
        <button onclick="todolist.splice(${i},1); save(); displayItems();" class="del">Delete</button>
        `;
    }
    containerelement.innerHTML = newhtml;
}

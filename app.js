const formCreate = document.getElementById('form-create'),
    formEdit = document.getElementById('form-edit'),
    listGroupTodo = document.getElementById('list-group-todo'),
    // messageCreate = document.getElementById('message-create'),
    time = document.getElementById('time'),
    modal = document.getElementById('modal'),
    overlay = document.getElementById('overlay'),
    closer = document.getElementById('close');
let editItemId
//////////// ^ TIME ELEMENTS //////////////////

const fullDay = document.getElementById('full-day'),
    hourEl = document.getElementById('hour'),
    minuteEl = document.getElementById('minute'),
    secondEl = document.getElementById('second');

////^check localStorage
let todos = JSON.parse(localStorage.getItem('list')) ?
    JSON.parse(localStorage.getItem('list')) : [];

if (todos.length) { showTodos() }
////^ set todos

function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}


////^show todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''
    todos.forEach((todo, index) => {
        listGroupTodo.innerHTML += `
        <li ondblclick="setCompleted(${index})" class="list-group-item d-flex justify-content-between ${todo.completed==true?'copmleted':''}">
        ${todo.text}
        <div class="todo-icons">
        <span class="opacity-50 me-2">${todo.time}</span>
        <img onclick="(editTodo(${index}))" src="./edit.svg" width="25" height="25" />
        <img onclick="(deleteTodo(${index}))" src="./delete.svg" width="25" height="25" />
        </div>
        </li>
    `
    })

}

//////^TIME
function getTime() {
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now
        .getMonth()
    const year = now.getFullYear()
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'Jule',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const month_title = now.getMonth()
    fullDay.textContent = `${date} ${months[month_title]} ${year}`
    hourEl.textContent = hour
    minuteEl.textContent = minute
    secondEl.textContent = second
    return (`${hour}:${minute}, ${date}.${month}.${year}`);

}
setInterval(getTime, 1000)

////^show error
function showError(where, message) {
    document.getElementById(`${where}`).textContent = message
    setTimeout(() => {
        document.getElementById(`${where}`).textContent = " "
    }, 2500)
}

//// ^get todos///
formCreate.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = formCreate['input-create'].value.trim();
    formCreate.reset()
    if (todoText.length) {
        todos.push({ text: todoText, time: getTime(), completed: false })
        setTodos()
        showTodos()
    } else {
        showError('message-create', 'Please enter some text')
    }

})

////^deleteTodo
function deleteTodo(id) {
    const deletedTodos = todos.filter((item, index) => {
        return !index == id
    })
    todos = deletedTodos
    setTodos()
    showTodos()
}


////^setCompleted
function setCompleted(id) {
    const completedTodos = todos.map((item, index) => {
        if (id == index) {
            return { ...item, completed: item.completed == true ? false : true }
        } else {
            return {...item}
        }
    })
    todos=completedTodos
    setTodos()
    showTodos()
}

//^ edit Forms
formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if (todoText.length) {
        todos.splice(editItemId, 1, { text: todoText, time: getTime(), completed: false })
        setTodos()
        showTodos()
        close()
    } else {
        showError('message-edit', 'Please, Enter some todo...')
    }
})

////^editTodo

function editTodo(id){
    open()
    editItemId=id
}

overlay.addEventListener('click', close)
closer.addEventListener('click', close)
document.addEventListener('keydown', (e) => {
    if (e.which == 27) {
        close()
    }
}
)
////^open modal
function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
////^close modal
function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

console.log(modal);
const addTodoBtn = document.getElementById("addTodoBtn")
const inputTag = document.getElementById("todoInput")
const todoListUl = document.getElementById("todoList")
const remaining = document.getElementById("remaining-count")
const clearCompletedBtn = document.getElementById("clearCompletedBtn")
const input = document.getElementById("todoInput")

let todoText; // This should be Populated wehn we click on add Button.
let todos = [];
let todoString = localStorage.getItem("todos")
// If we have todo string then just parse it 
if (todoString) {
    todos = JSON.parse(todoString);
    remaining.innerHTML = todos.filter((item)=>{ return item.isCompleted != true }).length;
}

const populateTodos = () => {
    let string = "";
    for (const todo of todos) {
        string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}" >
                <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""} >
                <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
</li>`
    }
    todoListUl.innerHTML = string

    // Add checkbox logic to populate todos
    const todoCheckboxes = document.querySelectorAll(".todo-checkbox")

    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", (e) => {

            if (e.target.checked) {
                element.parentNode.classList.add("completed")
                console.log(todos)

                //GRab this todo and add or update the todos array to the localstorage as isCompleted as true
                todos = todos.map(todo => {
                    if (todo.id == element.parentNode.id) {
                        console.log(todo.id, element.parentNode.id)
                        return { ...todo, isCompleted: true }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
            else {
                element.parentNode.classList.remove("completed")
                //GRab this todo and add or update the todos array to the localstorage as isCompleted as false
                todos = todos.map(todo => {
                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }

        })
    })

    //Handle the clear completed button..
    clearCompletedBtn.addEventListener("click", () => {
        todos = todos.filter((todo) => todo.isCompleted == false)
        populateTodos()
        localStorage.setItem("todos", JSON.stringify(todos))

    })

    //Handling of delete Butons...
    let deleteBtns = document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {
            const confirmation = confirm("Do you wanna delete this")
            if (confirmation) {
                todos = todos.filter((todo) => {
                    return (todo.id) !== (e.target.parentNode.id)
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
                populateTodos()
            }
        })
    })

}

//adding enter keyb function
    document.addEventListener("keypress", (e)=> {
        if (e.key === "Enter") {
            e.preventDefault();
            addTodoBtn.click();
        }
    })


addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value
    //If the length of the task is less than 3, I don't want to add that..
    if (todoText.trim().length < 4) {
        alert("A todo has to have a min length of 4 words!!")
        return
    }
    inputTag.value = ""
    let todo = {
        id: "todo-" + Date.now(),
        title: todoText,
        isCompletd: false
    }
    todos.push(todo)
    remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos()
})

populateTodos()
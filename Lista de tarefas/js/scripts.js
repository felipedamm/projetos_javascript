const taskForm = document.querySelector("#task-form");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const taskList = document.querySelector("#task-list");
const taskInput = document.querySelector("#task-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const clearBtn = document.querySelector("#clear-btn");
const filterSelect = document.querySelector("#filter-select");

let oldInputValue;

const saveTask = (text) => {

    const task = document.createElement("div");
    task.classList.add("task");
    const taskTitle = document.createElement("h3");
    taskTitle.innerText = text;
    task.appendChild(taskTitle);

    //solução 1 para criar botão
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-task");
    const iconDoneBtn = document.createElement("i");
    iconDoneBtn.classList.add("fa-solid");
    iconDoneBtn.classList.add("fa-check");
    doneBtn.appendChild(iconDoneBtn);
    task.appendChild(doneBtn);

    //solução 2 para criar botão 
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-task");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    task.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-task");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    task.appendChild(removeBtn);


    taskList.appendChild(task);

    taskInput.value = "";
    taskInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    taskForm.classList.toggle("hide");
    taskList.classList.toggle("hide");
}

const updateTask = (text) => {
    const tasks = document.querySelectorAll(".task")
    tasks.forEach((task) => {
        let taskTitle = task.querySelector("h3")
        if(taskTitle.innerText === oldInputValue) {
            taskTitle.innerText = text
        }
    })
}

const getSearchTasks = (search) => {
    const tasks = document.querySelectorAll(".task")
    tasks.forEach((task) => {
        let taskTitle = task.querySelector("h3").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

        task.style.display = "flex";

        if(!taskTitle.includes(normalizedSearch)) {
            task.style.display = "none";
        }
   
    })
}

const filterTasks = (filterValue) => {
    const tasks = document.querySelectorAll(".task");
    switch(filterValue) {
        case "all":
            tasks.forEach((task) => task.style.display = "flex");
            break;

        case "done":
            tasks.forEach((task) => task.classList.contains("done") ? task.style.display = "flex" : task.style.display = "none");
            break; 

        case "todo":
            tasks.forEach((task) => !task.classList.contains("done") ? task.style.display = "flex" : task.style.display = "none");
            break;   
            
        default:
            break;
        
    }
}
    
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = taskInput.value;

    if (inputValue) {
        saveTask(inputValue);
    }
});

document.addEventListener("click", (e) => {

    const targetElement = e.target;
    //const parentElement = targetElement.closest("div");
    const parentElement = targetElement.parentElement;
    let taskTitle;

    if(parentElement && parentElement.querySelector("h3")) {
        taskTitle = parentElement.querySelector("h3").innerText;
    }

    if(targetElement.classList.contains("finish-task")) {
        parentElement.classList.toggle("done");
    }

    if(targetElement.classList.contains("remove-task")) {
        parentElement.remove();
    }

    if(targetElement.classList.contains("edit-task")) {
        toggleForms();

        editInput.value = taskTitle;
        oldInputValue = taskTitle;
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
})

editForm.addEventListener("submit", (e) => {
  
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTask(editInputValue);
    }

    toggleForms();
})

searchInput.addEventListener("keyup", (e) => {

    const search = e.target.value;

    getSearchTasks(search);
})

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"))
})

filterSelect.addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filterTasks(filterValue);
})



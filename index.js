//měla jsem chybně props v {}
const Task = (props) => {
    const {name, due, done} = props;

    //měla jsem chybně místo `` závorky () a tím pádem použité proměnné jen v {} bez dolaru
    return `
        <div class="task">
            <div class="task__body">
            <div class="task__name">${name}</div>
            <div class="task__due">${due}</div>
            </div>
            <div class="task__done">${done?"✓":""}</div>
        </div>
    `;
    
};

const renderTasks = (todoList) => {

    const tasks = document.querySelector(".todo__tasks");
    tasks.innerHTML = todoList
        .map((item) => Task(item))
        .join("");
};

fetch("https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks")
    //neměla jsem response v () a chyběly mi závorky za response.json
    .then((response) => response.json())
    //nejprve jsem chtěla data poslat do props v komponentě Task, namísto toho abych je poslala do renderTasks, kde se to pole teprve přemapuje pomocí komponenty Task
    .then((data) => renderTasks(data));

const checkboxUndone = document.querySelector("#checkbox-undone");

const handleChange = (event) => {
    if (event.currentTarget.checked) {
        fetch("https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks?done=true")
            .then((response) => response.json())
            .then((data) => renderTasks(data));
    } else {
        fetch("https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks")
            .then((response) => response.json())
            .then((data) => renderTasks(data));
    }
}

checkboxUndone.addEventListener("change", handleChange);
const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOMM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

// get task
const showTask = async() => {
    try {
        const {
            data: { task },
        } = await axios.get(`/raybags.com/api/task_manager/v1/tasks/${id}`);
        const { _id: taskID, completed, name } = task;

        taskIDDOM.textContent = taskID
        taskNameDOM.value = name;
        tempName = name;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
    } catch (error) {
        console.log(error);
    }
};

showTask();

// Edit task
editFormDOM.addEventListener('submit', async(e) => {
    editBtnDOM.textContent = 'Loading...'
    e.preventDefault()
    try {
        const taskName = taskNameDOM.value
        const taskCompleted = taskCompletedDOM.checked

        const {
            data: task,
        } = await axios.patch(`/raybags.com/api/task_manager/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        })

        const { _id: taskID, completed, name } = task;

        taskIDDOM.textContent = taskID
        taskNameDOM.value = name
        tempName = name
        if (completed) {
            taskCompletedDOM.checked = true;;
        }
        formAlertDOMM.style.display = 'block';
        formAlertDOMM.textContent = `success, edited task`;
        formAlertDOMM.classList.add('text-success');
    } catch (error) {
        console.error(error)
        taskNameDOM.value = tempName;
        formAlertDOMM.style.display = 'block';
        formAlertDOMM.innerHTML = `error, please try again`;
    }
    editBtnDOM.textContent = 'changes saved';
    setTimeout(() => {
        formAlertDOMM.style.display = 'none';
        formAlertDOMM.classList.remove('text-success');
    }, 3000)
})
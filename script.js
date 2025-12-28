let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveGoal(){
  const goal = document.getElementById("goal").value;
  localStorage.setItem("goal", goal);
  document.getElementById("savedGoal").innerText = "Today's Goal: " + goal;
}

function addTask(){
  const input = document.getElementById("taskInput");
  if(input.value === "") return;

  tasks.push({ text: input.value, done: false });
  input.value = "";
  saveTasks();
  render();
}

function toggleTask(index){
  tasks[index].done = !tasks[index].done;
  saveTasks();
  render();
}

function deleteTask(index){
  tasks.splice(index,1);
  saveTasks();
  render();
}

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render(){
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let completed = 0;

  tasks.forEach((task, i)=>{
    const li = document.createElement("li");
    li.innerHTML = `
      <span onclick="toggleTask(${i})" style="cursor:pointer; ${task.done ? 'text-decoration:line-through' : ''}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${i})">X</button>
    `;
    if(task.done) completed++;
    list.appendChild(li);
  });

  document.getElementById("score").innerText =
    `Productivity: ${completed} / ${tasks.length} tasks completed`;
}

document.getElementById("savedGoal").innerText =
  "Today's Goal: " + (localStorage.getItem("goal") || "");

render();

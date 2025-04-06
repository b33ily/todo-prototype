document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const completedCount = document.getElementById('completedCount');
  const levelElement = document.getElementById('level');
  
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let completedTasks = 0;
  let level = 1;

  // Загрузка сохраненных задач
  renderTasks();

  // Добавление задачи
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }

  function renderTasks() {
    taskList.innerHTML = '';
    completedTasks = tasks.filter(task => task.completed).length;
    
    tasks.forEach((task, index) => {
      const taskElement = document.createElement('li');
      taskElement.className = `task ${task.completed ? 'completed' : ''}`;
      
      taskElement.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
      `;
      
      const checkbox = taskElement.querySelector('input');
      checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        updateStats();
        renderTasks();
      });
      
      taskList.appendChild(taskElement);
    });
    
    updateStats();
  }

  function updateStats() {
    completedTasks = tasks.filter(task => task.completed).length;
    completedCount.textContent = completedTasks;
    
    // Геймификация: новый уровень каждые 5 задач
    level = Math.floor(completedTasks / 5) + 1;
    levelElement.textContent = level;
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
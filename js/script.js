document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // --- Academic Planner Logic ---
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  if (taskInput && addTaskBtn && taskList) {
    let tasks = []; // Array to store tasks

    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'mockup-check-item';
        
        const checkbox = document.createElement('div');
        checkbox.className = `mockup-checkbox ${task.completed ? 'checked' : ''}`;
        checkbox.style.cursor = 'pointer';
        checkbox.addEventListener('click', () => toggleTask(index));

        const textDiv = document.createElement('div');
        textDiv.className = 'mockup-check-text';
        textDiv.style.flexGrow = '1';
        
        const title = document.createElement('h4');
        title.textContent = task.name;
        if(task.completed) {
            title.style.textDecoration = 'line-through';
            title.style.color = 'var(--text-secondary)';
        }
        textDiv.appendChild(title);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-outline';
        deleteBtn.style.padding = '0.25rem 0.5rem';
        deleteBtn.style.fontSize = '0.8rem';
        deleteBtn.style.borderColor = '#ff4444';
        deleteBtn.style.color = '#ff4444';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(textDiv);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
      });
    };

    const addTask = () => {
      const name = taskInput.value.trim();
      if (name) {
        tasks.push({ name, completed: false });
        taskInput.value = '';
        renderTasks();
      }
    };

    const toggleTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    };

    const deleteTask = (index) => {
      tasks.splice(index, 1);
      renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });

    // Initial dummy tasks
    tasks.push({ name: 'Analyze Enrollment History', completed: true });
    tasks.push({ name: 'Generate Conflict Matrix', completed: false });
    renderTasks();
  }

  // --- Contact Form Validation ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formError = document.getElementById('formError');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formError.style.display = 'none';
      formError.textContent = '';

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const message = messageInput.value.trim();

      // 1. No field is empty
      if (!name || !email || !phone || !message) {
        formError.textContent = 'Error: All fields are required.';
        formError.style.display = 'block';
        return;
      }

      // 2. Email format is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formError.textContent = 'Error: Please enter a valid email address.';
        formError.style.display = 'block';
        return;
      }

      // 3. Phone number contains only digits
      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(phone)) {
        formError.textContent = 'Error: Phone number must contain only digits.';
        formError.style.display = 'block';
        return;
      }

      // If all passed
      alert('Message Sent Successfully!');
      contactForm.reset();
    });
  }
});

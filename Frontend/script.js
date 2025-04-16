const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;
    
    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
    });
});

const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

function handleResize() {
    if (window.innerWidth < 768) {
        sidebar.classList.add('hide');
    } else {
        sidebar.classList.remove('hide');
    }
    
    if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
}

handleResize();

window.addEventListener('resize', handleResize);

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.querySelector('.todo-list');
    const addButton = document.querySelector('.todo .head .bx-plus');
    let tasks = [];
    
    todoList.querySelectorAll('li').forEach(item => {
        const taskText = item.querySelector('p').textContent;
        const isCompleted = item.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    
    todoList.innerHTML = '';
    
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add(task.completed ? 'completed' : 'not-completed');
            li.innerHTML = `
                <p>${task.text}</p>
                <div class="actions">
                    <i class='bx bx-check' data-index="${index}"></i>
                    <i class='bx bx-trash' data-index="${index}"></i>
                    <i class='bx bx-dots-vertical-rounded'></i>
                </div>
            `;
            todoList.appendChild(li);
        });
        addTaskButtonListeners();
    }
    function addTaskButtonListeners() {
        document.querySelectorAll('.todo-list .bx-check').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                tasks[index].completed = !tasks[index].completed;
                renderTasks();
            });
        });
        
        document.querySelectorAll('.todo-list .bx-trash').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                tasks.splice(index, 1);
                renderTasks();
            });
        });
    }

    addButton.addEventListener('click', function() {
        const inputContainer = document.createElement('li');
        inputContainer.classList.add('new-task-input');
        inputContainer.innerHTML = `
            <input type="text" placeholder="Add new task..." class="task-input">
            <div class="actions">
                <i class='bx bx-check save-task'></i>
                <i class='bx bx-x cancel-task'></i>
            </div>
        `;
        todoList.appendChild(inputContainer);
        
        const taskInput = inputContainer.querySelector('.task-input');
        taskInput.focus();
        
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                tasks.push({ text: this.value.trim(), completed: false });
                renderTasks();
            }
        });
        
        inputContainer.querySelector('.save-task').addEventListener('click', function() {
            const newTaskText = taskInput.value.trim();
            if (newTaskText !== '') {
                tasks.push({ text: newTaskText, completed: false });
                renderTasks();
            }
        });
        
        inputContainer.querySelector('.cancel-task').addEventListener('click', function() {
            inputContainer.remove();
        });
    });
    
    renderTasks();
    
    function saveTasksToLocalStorage() {
        localStorage.setItem('uniMateTasks', JSON.stringify(tasks));
    }
    
    function loadTasksFromLocalStorage() {
        const savedTasks = localStorage.getItem('uniMateTasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            renderTasks();
        }
    }
    
    const observer = new MutationObserver(function() {
        saveTasksToLocalStorage();
    });
    
    observer.observe(todoList, { childList: true, subtree: true });

    loadTasksFromLocalStorage();
});

document.addEventListener('DOMContentLoaded', function() {
    const calendarBox = document.querySelector('.box-info li:nth-child(2)');
    
    const createCalendarPopup = () => {
        const popup = document.createElement('div');
        popup.classList.add('calendar-popup');
        popup.innerHTML = `
            <div class="calendar-header">
                <i class='bx bx-chevron-left prev-month'></i>
                <h3 class="current-date">April 2025</h3>
                <i class='bx bx-chevron-right next-month'></i>
            </div>
            <div class="calendar-body">
                <ul class="calendar-weekdays">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul class="calendar-days"></ul>
            </div>
            <div class="calendar-footer">
                <button class="close-calendar">Close</button>
                <button class="add-event">Add Event</button>
            </div>
        `;
        return popup;
    };
    
    const generateCalendarDays = (year, month) => {
        const daysContainer = document.querySelector('.calendar-days');
        daysContainer.innerHTML = '';
        
        const date = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = date.getDay();
        
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('li');
            emptyDay.classList.add('empty');
            daysContainer.appendChild(emptyDay);
        }
        
        for (let day = 1; day <= lastDay; day++) {
            const dayElement = document.createElement('li');
            dayElement.textContent = day;
            
            const currentDate = new Date();
            if (year === currentDate.getFullYear() && 
                month === currentDate.getMonth() && 
                day === currentDate.getDate()) {
                dayElement.classList.add('current-day');
            }
            
            if ((month === 3 && day === 15) || (month === 3 && day === 22)) {
                dayElement.classList.add('has-event');
                dayElement.setAttribute('data-event', day === 15 ? 'Project Submission' : 'Team Meeting');
            }
            
            dayElement.addEventListener('click', function() {
                document.querySelectorAll('.calendar-days li').forEach(day => {
                    day.classList.remove('active');
                });
                dayElement.classList.add('active');
                
                if (dayElement.classList.contains('has-event')) {
                    alert(`Event: ${dayElement.getAttribute('data-event')}`);
                }
            });
            
            daysContainer.appendChild(dayElement);
        }
    };
    
    calendarBox.addEventListener('click', function() {
        const overlay = document.createElement('div');
        overlay.classList.add('calendar-overlay');
        document.body.appendChild(overlay);
        
        const popup = createCalendarPopup();
        document.body.appendChild(popup);
        
        const currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        
        const updateCalendarHeader = () => {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                           'August', 'September', 'October', 'November', 'December'];
            document.querySelector('.current-date').textContent = `${months[currentMonth]} ${currentYear}`;
        };
        
        updateCalendarHeader();
        generateCalendarDays(currentYear, currentMonth);
        
        document.querySelector('.prev-month').addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendarHeader();
            generateCalendarDays(currentYear, currentMonth);
        });
        
        document.querySelector('.next-month').addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendarHeader();
            generateCalendarDays(currentYear, currentMonth);
        });
        
        document.querySelector('.close-calendar').addEventListener('click', function() {
            document.body.removeChild(overlay);
            document.body.removeChild(popup);
        });
        
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
            document.body.removeChild(popup);
        });
        
        document.querySelector('.add-event').addEventListener('click', function() {
            const activeDay = document.querySelector('.calendar-days li.active');
            if (activeDay) {
                const day = activeDay.textContent;
                const eventName = prompt('Enter event name:');
                if (eventName) {
                    activeDay.classList.add('has-event');
                    activeDay.setAttribute('data-event', eventName);
                    alert(`Event "${eventName}" added for ${day} ${document.querySelector('.current-date').textContent}`);
                }
            } else {
                alert('Please select a day first');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const feeBox = document.querySelector('.box-info li:nth-child(3)');
    
    const createFeePopup = () => {
        const popup = document.createElement('div');
        popup.classList.add('fee-popup');
        popup.innerHTML = `
            <div class="fee-header">
                <h3>Fee Details</h3>
                <i class='bx bx-x close-fee'></i>
            </div>
            <div class="fee-body">
                <div class="fee-summary">
                    <div class="fee-status">
                        <h4>Status: <span class="status-badge">Partially Paid</span></h4>
                        <p>Student ID: 2310991363</p>
                        <p>Program: BE-CSE</p>
                        <p>Semester: Spring 2025</p>
                    </div>
                    <div class="fee-total">
                        <div class="fee-circle">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#eee" stroke-width="12" />
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#3C91E6" stroke-width="12" 
                                    stroke-dasharray="339.2" stroke-dashoffset="135.7" />
                                <text x="60" y="60" font-size="20" text-anchor="middle" alignment-baseline="middle" fill="#342E37">60%</text>
                            </svg>
                        </div>
                        <div class="fee-summary-text">
                            <p>Total Due: ₹85,000</p>
                            <p>Paid: ₹51,000</p>
                            <p>Remaining: ₹34,000</p>
                        </div>
                    </div>
                </div>
                <div class="fee-details">
                    <h4>Payment Details</h4>
                    <table class="fee-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tuition Fee (First Installment)</td>
                                <td>10-01-2025</td>
                                <td>₹40,000</td>
                                <td><span class="status paid">Paid</span></td>
                            </tr>
                            <tr>
                                <td>Examination Fee</td>
                                <td>15-02-2025</td>
                                <td>₹5,000</td>
                                <td><span class="status paid">Paid</span></td>
                            </tr>
                            <tr>
                                <td>Laboratory Fee</td>
                                <td>15-02-2025</td>
                                <td>₹6,000</td>
                                <td><span class="status paid">Paid</span></td>
                            </tr>
                            <tr>
                                <td>Tuition Fee (Second Installment)</td>
                                <td>15-04-2025</td>
                                <td>₹30,000</td>
                                <td><span class="status pending">Pending</span></td>
                            </tr>
                            <tr>
                                <td>Miscellaneous Charges</td>
                                <td>30-04-2025</td>
                                <td>₹4,000</td>
                                <td><span class="status pending">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="payment-history">
                    <h4>Payment History</h4>
                    <table class="fee-table history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Transaction ID</th>
                                <th>Mode</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>05-01-2025</td>
                                <td>TXN8765432</td>
                                <td>Online</td>
                                <td>₹40,000</td>
                            </tr>
                            <tr>
                                <td>10-02-2025</td>
                                <td>TXN8765980</td>
                                <td>Online</td>
                                <td>₹11,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="fee-footer">
                <button class="download-receipt"><i class='bx bx-download'></i> Download Receipt</button>
                <button class="pay-now"><i class='bx bx-credit-card'></i> Pay Now</button>
            </div>
        `;
        return popup;
    };
    

    feeBox.addEventListener('click', function() {

        const overlay = document.createElement('div');
        overlay.classList.add('fee-overlay');
        document.body.appendChild(overlay);
        
        const popup = createFeePopup();
        document.body.appendChild(popup);
        
        document.querySelector('.close-fee').addEventListener('click', function() {
            document.body.removeChild(overlay);
            document.body.removeChild(popup);
        });
        
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
            document.body.removeChild(popup);
        });
        
        document.querySelector('.download-receipt').addEventListener('click', function() {
            alert('Receipt download started...');
        });
        
        document.querySelector('.pay-now').addEventListener('click', function() {
            alert('Redirecting to payment gateway...');
        });
    });
});

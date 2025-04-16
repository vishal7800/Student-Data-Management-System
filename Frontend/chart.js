document.addEventListener('DOMContentLoaded', function() {

    const performanceMenuItem = document.querySelector('#sidebar .side-menu.top li:nth-child(5) a');
    const attendanceMenuItem = document.querySelector('#sidebar .side-menu.top li:nth-child(3) a');

    const marksData = {
        labels: ['DSA', 'JAVA', 'BEE', 'Linux', 'IOT'],
        datasets: [
            {
                label: 'Your Marks',
                data: [82, 90, 76, 88, 72],
                backgroundColor: [
                    '#3C91E6',
                    '#FFCE26',
                    '#FD7238',
                    '#0ABF30',
                    '#DB504A'
                ],
                borderWidth: 1
            },
            {
                label: 'Class Average',
                data: [74, 78, 75, 72, 70],
                backgroundColor: 'rgba(219, 80, 74, 0.5)',
                borderWidth: 1
            }
        ]
    };

    const attendanceData = {
        labels: ['DSA', 'JAVA', 'BEE', 'Linux', 'IOT'],
        datasets: [
            {
                label: 'Your Attendance',
                data: [85, 92, 78, 94, 68],
                backgroundColor: [
                    '#3C91E6',
                    '#FFCE26',
                    '#FD7238',
                    '#0ABF30',
                    '#DB504A'
                ],
                borderWidth: 1
            },
            {
                label: 'Required Attendance',
                data: [75, 75, 75, 75, 75],
                backgroundColor: 'rgba(219, 80, 74, 0.5)',
                borderWidth: 1
            }
        ]
    };

    let performanceChart = null;
    let attendanceChart = null;

    const createPerformanceContent = () => {
        const performanceContainer = document.createElement('div');
        performanceContainer.classList.add('performance-container');
        performanceContainer.innerHTML = `
            <div class="performance-header">
                <h2>Academic Performance Dashboard</h2>
            </div>
            
            <div class="performance-content">
                <div class="chart-container">
                    <canvas id="performanceChart"></canvas>
                </div>
                
                <div class="subjects-grid">
                    <div class="subject-card" data-subject="DSA">
                        <h3>DSA</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#3C91E6" stroke-width="3" stroke-dasharray="82 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">82%</text>
                            </svg>
                        </div>
                        <p class="status-text">8% Above Avg</p>
                    </div>
                    <div class="subject-card" data-subject="JAVA">
                        <h3>JAVA</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#FFCE26" stroke-width="3" stroke-dasharray="90 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">90%</text>
                            </svg>
                        </div>
                        <p class="status-text">12% Above Avg</p>
                    </div>
                    <div class="subject-card" data-subject="BEE">
                        <h3>BEE</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#FD7238" stroke-width="3" stroke-dasharray="76 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">76%</text>
                            </svg>
                        </div>
                        <p class="status-text">1% Above Avg</p>
                    </div>
                    <div class="subject-card" data-subject="Linux">
                        <h3>Linux</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#0ABF30" stroke-width="3" stroke-dasharray="88 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">88%</text>
                            </svg>
                        </div>
                        <p class="status-text">16% Above Avg</p>
                    </div>
                    <div class="subject-card" data-subject="IOT">
                        <h3>IOT</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#DB504A" stroke-width="3" stroke-dasharray="72 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">72%</text>
                            </svg>
                        </div>
                        <p class="status-text">2% Above Avg</p>
                    </div>
                </div>
            </div>
        `;
        return performanceContainer;
    };

    const createAttendanceContent = () => {
        const attendanceContainer = document.createElement('div');
        attendanceContainer.classList.add('performance-container');
        attendanceContainer.innerHTML = `
            <div class="performance-header">
                <h2>Attendance Dashboard</h2>
            </div>
            
            <div class="performance-content">
                <div class="chart-container">
                    <canvas id="attendanceChart"></canvas>
                </div>
                
                <div class="subjects-grid">
                    <div class="subject-card" data-subject="DSA">
                        <h3>DSA</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#3C91E6" stroke-width="3" stroke-dasharray="85 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">85%</text>
                            </svg>
                        </div>
                        <p class="status-text">10% Extra</p>
                    </div>
                    <div class="subject-card" data-subject="JAVA">
                        <h3>JAVA</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#FFCE26" stroke-width="3" stroke-dasharray="92 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">92%</text>
                            </svg>
                        </div>
                        <p class="status-text">17% Extra</p>
                    </div>
                    <div class="subject-card" data-subject="BEE">
                        <h3>BEE</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#FD7238" stroke-width="3" stroke-dasharray="78 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">78%</text>
                            </svg>
                        </div>
                        <p class="status-text">3% Extra</p>
                    </div>
                    <div class="subject-card" data-subject="Linux">
                        <h3>Linux</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#0ABF30" stroke-width="3" stroke-dasharray="94 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">94%</text>
                            </svg>
                        </div>
                        <p class="status-text">19% Extra</p>
                    </div>
                    <div class="subject-card" data-subject="IOT">
                        <h3>IOT</h3>
                        <div class="progress-circle">
                            <svg width="100" height="100" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="3"></circle>
                                <circle class="progress-circle-bar" cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#DB504A" stroke-width="3" stroke-dasharray="68 100" stroke-dashoffset="25"></circle>
                                <text class="progress-text" x="18" y="18" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="bold">68%</text>
                            </svg>
                        </div>
                        <p class="status-text danger">7% Short</p>
                    </div>
                </div>
            </div>
        `;
        return attendanceContainer;
    };

    function storeOriginalContent() {
        const mainContent = document.querySelector('#content main');
        if (!mainContent.hasAttribute('data-original-content')) {
            mainContent.setAttribute('data-original-content', mainContent.innerHTML);
        }
    }

    function restoreOriginalContent() {
        const mainContent = document.querySelector('#content main');
        if (mainContent.hasAttribute('data-original-content')) {
            mainContent.innerHTML = mainContent.getAttribute('data-original-content');
        }
        
        if (performanceChart) {
            performanceChart.destroy();
            performanceChart = null;
        }
        
        if (attendanceChart) {
            attendanceChart.destroy();
            attendanceChart = null;
        }
    }

    performanceMenuItem.addEventListener('click', function(e) {
        e.preventDefault();
        
        const mainContent = document.querySelector('#content main');
        
        storeOriginalContent();
        
        document.querySelectorAll('#sidebar .side-menu.top li').forEach(item => {
            item.classList.remove('active');
        });
        this.parentElement.classList.add('active');
        
        mainContent.innerHTML = '';
        
        const performanceContainer = createPerformanceContent();
        mainContent.appendChild(performanceContainer);
        
        loadChartJsIfNeeded(() => {
            const ctx = document.getElementById('performanceChart').getContext('2d');
            
            performanceChart = new Chart(ctx, {
                type: 'bar',
                data: marksData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Marks (%)'
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Subject Marks Overview'
                        }
                    }
                }
            });
        });
    });

    attendanceMenuItem.addEventListener('click', function(e) {
        e.preventDefault();
        
        const mainContent = document.querySelector('#content main');
        
        storeOriginalContent();
        
        document.querySelectorAll('#sidebar .side-menu.top li').forEach(item => {
            item.classList.remove('active');
        });
        this.parentElement.classList.add('active');
        
        mainContent.innerHTML = '';
        
        const attendanceContainer = createAttendanceContent();
        mainContent.appendChild(attendanceContainer);
        
        loadChartJsIfNeeded(() => {
            const ctx = document.getElementById('attendanceChart').getContext('2d');
            
            attendanceChart = new Chart(ctx, {
                type: 'bar',
                data: attendanceData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Attendance (%)'
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Subject Attendance Overview'
                        }
                    }
                }
            });
        });
    });

    const otherMenuItems = document.querySelectorAll('#sidebar .side-menu.top li:not(:nth-child(3)):not(:nth-child(5)) a');
    otherMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('#sidebar .side-menu.top li').forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            restoreOriginalContent();
        });
    });

    function loadChartJsIfNeeded(callback) {
        if (window.Chart) {
            callback();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    }
});
export const HomeView = {
	render() {
		return `
            <style>
            * {
            	margin: 0;
            	padding: 0;
            	box-sizing: border-box;
            	font-family: "Poppins", Tahoma, Geneva, Verdana, sans-serif;
            }

            body {
            	background: #f4f7f3;
            	margin: 0;
                height: 100vh;
                width: 100vw;
            }

            :root {
            	--primary: #059467;
            	--primary-dark: #096653;
                --main-text: #ffffff; 
                --black: #000000;
                --card-bg: #ffffff;
                --bg: #e0e2e5;
                --item-shadow: #3c897c;
                --item-shadow-2: #dcfce7;
                --bg-color: #f9fafb;
                --sub-text: #6b7280; 
            }

            .container {
                height: 100vh;
                width: 100vw;
                display: flex;
                flex-direction: row;
                width: 100%;
                padding: 40px 60px;
                background-color: var(--bg);
            }

            .left-panel {
                display: flex;
                flex-direction: column;
                flex: 1;
                background: linear-gradient(135deg, #0f766e, #065f46);
                max-width: 40%;
                height: 100%;
                color: var(--main-text);
                padding: 40px;
                border-radius: 20px 0 0 20px;
            }

            .logo {
                display: flex;
                margin-bottom: 20px;
            }

            .logo img {
                width: 150px;
            }

            .title {
                margin-bottom: 20px;   
            }

            .title h1 {
                font-size: 40px;
                margin-bottom: 5px;
            }

            .title h3 {
                font-size: 30px;   
            }      

            .description {
                font-size: 20px;
                margin-bottom: 40px;
                max-width: 450px;
            }

            .left-panel ul li {
                list-style: none;
                margin: 10px 0;
                display: flex;
                align-items: center;
                font-size: 18px;
            }

            .left-panel ul {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }

            .features svg {
                width: 50px;
                margin-right: 10px;
                background-color: var(--item-shadow);
                border-radius: 50%;
                padding: 10px;
                color: var(--main-text);
            }

            .footer {
                 margin-top: auto;
            }

            .right-panel {
                display: flex;
                flex-direction: column;
                flex: 1;
                background-color: var(--card-bg);
                width: 100%;
                height: 100%;
                color: var(--main-text);
                padding: 40px;
                border-radius: 0 20px 20px 0;
                color: var(--black);
            }

            .title-header {
                display: flex;
                align-items: center;
                gap: 20px;
                flex-direction: row;
                color: var(--black);
            }

            .title-header svg {
                width: 30px;
            }

            .title-header h1 {
                font-weight: 600;
            }   

            .header-icon {
                background-color: var(--item-shadow-2);
                height: 3rem;
                width: 3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
            }

            .date-time {
                display: flex;
                align-items: center;
                margin-top: 20px;
                font-size: 18px;
                background-color: var(--bg-color);
                padding: 10px 20px; 
                gap: 20px;
            }

            .date-time p {
                color: var(--sub-text);
            }
            </style>
            <div class="container">
                <div class="left-panel">
                    <div class="logo">
                       <img src="assets/ocpl-icon.png" alt="Icon" />
                    </div>
                    <div class="title">
                        <h1>Olongapo City Public Library</h1>
                        <h3>Logging Management System</h3>
                    </div>
                    <div class="description">
                        <p>Welcome to our digital log system. Please fill out the form before going inside the library. Thank you for your cooperation.</p>
                    </div>
                    <div class="features">
                        <ul>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"/>
                                </svg>
                                Quick and easy logging</li>
                            <li>
                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <!-- White background circle -->
                                    <circle cx="10" cy="10" r="10" fill="#fff"/>
                                    <!-- Green check outline -->
                                    <path d="M6 10l3 3 5-5" stroke="#059467" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Secure data management</li>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                                </svg>
                            Real-time log monitoring</li>
                        </ul>
                    </div>
                    <div class="footer">
                        <p>&copy; 2023 Olongapo City Public Library. All rights reserved.</p>
                    </div>
                </div>
                <div class="right-panel">
                    <div class="title-header">
                        <div class="header-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="none"/>
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#059467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="9" cy="7" r="4" stroke="#059467" stroke-width="2"/>
                            <polyline points="16 11 18 13 22 9" stroke="#059467" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="title-text">
                            <h1>Logging Registration</h1>
                            <p>Please fill out the form below to register your log entry.</p>
                        </div>
                    </div>
                    <div class="date-time">
                        <div>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock" data-lov-id="src/components/AttendanceForm.tsx:81:12" data-lov-name="Clock" data-component-path="src/components/AttendanceForm.tsx" data-component-line="81" data-component-file="AttendanceForm.tsx" data-component-name="Clock" data-component-content="%7B%7D"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <span id="current-date"></span></p>
                        </div>
                        
                        <div>
                            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin" data-lov-id="src/components/AttendanceForm.tsx:85:12" data-lov-name="MapPin" data-component-path="src/components/AttendanceForm.tsx" data-component-line="85" data-component-file="AttendanceForm.tsx" data-component-name="MapPin" data-component-content="%7B%7D"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg> <span>55 Murphy St, Olongapo City, Zambales</span></p>
                        </div>
                    </div>
                </div>

                
            </div>
        `;
	},
	mount() {
		function updateClock() {
			const now = new Date();
			const dateString = now.toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
			});
			const timeString = now.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			});
			document.getElementById(
				"current-date"
			).textContent = `${dateString} ${timeString}`;
		}

		function updateLocation() {
			const location = "Olongapo City, Zambales";
			document.getElementById("current-location").textContent = location;
		}

		setInterval(updateClock, 1000);
		updateClock();
		updateLocation();
	},
};

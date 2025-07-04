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
                --error: #dc2626;
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

            form {
                background: #f9fafb;
                padding: 32px 24px;
                border-radius: 16px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.06);
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
                width: 100%;
            }

            .same-row {
                display: flex;
                align-items: center;
                flex-direction: row;
                width: 100%;
                gap: 20px;
            }

            .cta {
                display: flex;
                flex-direction: column;
                width: 100%;
            }

            .form-group label {
                font-weight: 500;
                color: var(--primary-dark);
                margin-bottom: 2px;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                padding: 10px 14px;
                border: 1.5px solid #e0e2e5;
                border-radius: 8px;
                font-size: 16px;
                background: #fff;
                color: #222;
                transition: border-color 0.2s;
                outline: none;
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                border-color: var(--primary);
            }

            .form-group textarea {
                resize: none;
                min-height: 80px;
                font-family: inherit;
            }

            button#submit-btn {
                margin-top: 10px;
                padding: 12px 0;
                background: var(--primary);
                color: #fff;
                font-size: 18px;
                font-weight: 600;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.2s;
                box-shadow: 0 2px 8px rgba(5,148,103,0.08);
            }

            button#submit-btn:hover {
                background: var(--primary-dark);
            }

            #toastSuccess, #toastError {
                display: none;
                position: fixed;
                top: 40px;
                right: 40px;
                z-index: 9999;
                min-width: 200px;
                padding: 16px 24px;
                color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
                font-size: 18px;
                transition: opacity 0.3s;
            }

            #toastSuccess {
                background: var(--primary);
            }   

            #toastError {
                background: var(--error);
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

                    <form>
                        <div class="form-group">
                            <label>Fullname <span>*</span></label>
                            <input type="text" id="fullname" required placeholder="Enter your fullname"/>
                        </div>
                        <div class="form-group same-row">
                            <div class="cta">
                                <label>Gender <span>*</span></label>
                                <select id="gender" required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="cta">
                                <label>Age <span>*</span></label>
                                <input type="number" id="age" required placeholder="Enter your age"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>School/Office <span>*</span></label>
                            <input type="text" id="school-office" required placeholder="Enter your school/office"/>
                        </div>
                        <div class="form-group">
                            <label>Address <span>*</span></label>
                            <input type="text" id="address" required placeholder="Enter your address"/>
                        </div>
                        <div class="form-group">
                            <label>Contact Number</label>
                            <input type="text" id="contact-number" maxlength="11" inputmode="numeric" placeholder="Phone number">
                        </div>
                        <div class="form-group">
                            <label>Purpose of Visit <span>*</span></label>
                            <textarea id="purpose" rows="4" required placeholder="Enter the purpose of your visit"></textarea>
                        </div>

                        <button type="submit" id="submit-btn">Submit</button>
                    </form>

                    <div id="toastSuccess">
                        Log successfully!
                    </div>
                    <div id="toastError">
                        Error occurred!
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
			const locEl = document.getElementById("current-location");
			if (locEl) locEl.textContent = location;
		}

		function validateForm() {
			const fullname = document.getElementById("fullname").value.trim();
			const gender = document.getElementById("gender").value;
			const age = document.getElementById("age").value;
			const schoolOffice = document
				.getElementById("school-office")
				.value.trim();
			const address = document.getElementById("address").value.trim();
			const purpose = document.getElementById("purpose").value.trim();

			// Validation rules
			if (!fullname) {
				showToastError("Please enter your fullname");
				return false;
			}
			if (!gender) {
				showToastError("Please select your gender");
				return false;
			}
			if (!age || age < 1 || age > 120) {
				showToastError("Please enter a valid age (1-120)");
				return false;
			}
			if (!schoolOffice) {
				showToastError("Please enter your school/office");
				return false;
			}
			if (!address) {
				showToastError("Please enter your address");
				return false;
			}

			if (!purpose) {
				showToastError("Please enter the purpose of your visit");
				return false;
			}

			return true;
		}

		const input = document.getElementById("contact-number");

		if (input) {
			input.addEventListener("input", () => {
				input.value = input.value.replace(/\D/g, "");

				if (input.value.length > 11) {
					input.value = input.value.slice(0, 11);
				}
			});
		}

		async function saveToExcel(formData) {
			try {
				const result = await window.electronAPI.saveToExcel(formData);
				if (result.success) {
					showToastSuccess("Log saved successfully!");
					clearForm();
				} else {
					showToastError("Error saving data: " + result.error);
				}
			} catch (error) {
				console.error("Error saving to Excel:", error);
				showToastError(
					"Error saving data. Please try again. " + error.message
				);
			}
		}

		function showToastSuccess(message) {
			const toast = document.getElementById("toastSuccess");
			toast.textContent = message;
			toast.style.display = "block";
			toast.style.opacity = "1";
			setTimeout(() => {
				toast.style.opacity = "0";
				setTimeout(() => {
					toast.style.display = "none";
				}, 300);
			}, 2000);
		}

		function showToastError(message) {
			const toast = document.getElementById("toastError");
			toast.textContent = message;
			toast.style.display = "block";
			toast.style.opacity = "1";
			setTimeout(() => {
				toast.style.opacity = "0";
				setTimeout(() => {
					toast.style.display = "none";
				}, 300);
			}, 2000);
		}

		function clearForm() {
			document.getElementById("fullname").value = "";
			document.getElementById("gender").value = "";
			document.getElementById("age").value = "";
			document.getElementById("school-office").value = "";
			document.getElementById("address").value = "";
			document.getElementById("contact-number").value = "";
			document.getElementById("purpose").value = "";
		}

		setInterval(updateClock, 1000);
		updateClock();
		updateLocation();

		const form = document.querySelector("form");
		if (form) {
			form.addEventListener("submit", async function (e) {
				e.preventDefault();

				if (!validateForm()) {
					return;
				}

				const formData = {
					timestamp: new Date().toLocaleString(),
					fullname: document.getElementById("fullname").value.trim(),
					gender: document.getElementById("gender").value,
					age: parseInt(document.getElementById("age").value),
					schoolOffice: document
						.getElementById("school-office")
						.value.trim(),
					address: document.getElementById("address").value.trim(),
					contactNumber: document
						.getElementById("contact-number")
						.value.trim(),
					purpose: document.getElementById("purpose").value.trim(),
				};

				await saveToExcel(formData);
			});
		}
	},
};

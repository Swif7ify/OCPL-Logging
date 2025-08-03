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
                height: 100dvh;
                width: 100dvw;
                display: flex;
                flex-direction: row;
                width: 100%;
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
                padding: 40px 40px;
                color: var(--black);
            }

            .title-header {
                display: flex;
                align-items: center;
                gap: 20px;
                flex-direction: row;
                color: var(--black);
                padding-left: 20px;
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
                gap: 8px;
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

            
            textarea {
                max-height: 50px;
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                border-color: var(--primary);
            }

            .form-group textarea {
                resize: none;
                flex: 1;
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
                z-index: 99999;
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

            @media screen and (min-height: 1080px) {
                .same-row {
                    flex-direction: column !important;
                }
            }

            @media screen and (max-width: 1080px) {
                .logo img {
                    width: 100px !important;
                }

                .title h1 {
                    font-size: 30px !important;
                }

                .title h3 {
                    font-size: 20px !important;
                }

                .description {
                    font-size: 16px !important;
                }

                .date-time {
                    flex-direction: column;
                }

                .right-panel {
                    padding: 40px 20px !important;
                }
            }

            @media screen and (max-width: 940px) {
                .container {
                    padding: 0 !important;
                }

                .left-panel, right-panel {
                    border-radius: 0 !important;
                }

                .right-panel {
                    padding: 70px 40px !important;
                }
            }

            @media screen and (max-height: 995px) {
                .container {
                    height: 100%;
                    overflow-y: auto;
                }

                .r-same-row {
                    display: flex;
                    flex-direction: row;
                }

                .right-panel, .left-panel {
                    height: auto !important;
                    min-height: 100vh !important;
                }
            }

            @media screen and (max-height: 900px) {
                .logo img {
                    width: 100px;
                    height: auto;
                }

                .title h1 {
                    font-size: 28px;
                }

                .title h3 {
                    font-size: 20px;
                    font-weight: 500;
                }

                .description {
                    font-weight: 400;
                }

                .container {
                    overflow-x: hidden;
                }
            }

            @media screen and (max-height: 830px) {
                .right-panel {
                    padding: 20px;
                    padding-bottom: 0px !important;
                }
                form {
                    padding-bottom: 20px !important;
                }
            }

            @media screen and (max-height: 775px) {
                .title-header h1 {
                    font-size: 24px;
                }

                form {
                    padding-top: 20px !important;
                }
            }

            .signature-modal {
                display: none;
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }

            .signature-modal-content {
                background-color: #fff;
                margin: 5% auto;
                padding: 30px;
                border-radius: 16px;
                width: 80%;
                max-width: 600px;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2);
                text-align: center;
            }

            .signature-modal h2 {
                color: var(--primary-dark);
                margin-bottom: 20px;
                font-size: 24px;
            }

            .signature-canvas {
                border: 2px dashed var(--primary);
                border-radius: 8px;
                cursor: crosshair;
                margin: 20px 0;
                background: #fafafa;
            }

            .canvas-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
            }

            .signature-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 20px;
            }

            .signature-buttons button {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.2s;
            }

            .btn-clear {
                background: #e5e7eb;
                color: #374151;
            }

            .btn-clear:hover {
                background: #d1d5db;
            }

            .btn-cancel {
                background: var(--error);
                color: white;
            }

            .btn-cancel:hover {
                background: #b91c1c;
            }

            .btn-confirm {
                background: var(--primary);
                color: white;
            }

            .btn-confirm:hover {F
                background: var(--primary-dark);
            }

            .signature-instructions {
                color: var(--sub-text);
                font-size: 14px;
                margin-bottom: 15px;
            }

            .terms-policy {
                user-select: none;
            }

            .custom-dropdown {
                position: relative;
                width: 100%;
                user-select: none;
                font-size: 16px;
            }
            .dropdown-selected {
                background: #fff;
                border: 1.5px solid #e0e2e5;
                border-radius: 8px;
                padding: 10px 14px;
                cursor: pointer;
                color: #222;
                transition: border-color 0.2s;
            }
            .dropdown-selected.active {
                border-color: var(--primary-dark);
            }
            .dropdown-list {
                display: none;
                position: absolute;
                background: #fff;
                border: 1.5px solid var(--primary);
                border-radius: 0 0 8px 8px;
                width: 100%;
                z-index: 10;
                box-shadow: 0 4px 16px rgba(5,148,103,0.08);
                margin-top: 2px;
            }
            .dropdown-list.open {
                display: block;
            }
            .dropdown-item {
                padding: 10px 14px;
                cursor: pointer;
                color: #222;
                // transition: background 0.2s;
            }
            .dropdown-item:hover:not(:last-child) {
                background: #0078d7;
                color: #fff;
            }
            .dropdown-item.highlighted {
                background: var(--item-shadow-2);
            }
            .dropdown-item.other-item {
                display: flex;
                align-items: center;
                gap: 8px;
                background: #f9fafb;
                cursor: default;
            }
            .dropdown-item.other-item input {
                border: 1px solid var(--primary);
                border-radius: 6px;
                padding: 4px 8px;
                font-size: 15px;
                outline: none;
                width: 120px;
            }

            /* Enhanced Report Button Styles */
            .report-quick-btn {
                transition: all 0.3s ease;
                border: 2px solid transparent;
                text-align: left;
            }
            
            .report-quick-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(5, 148, 103, 0.2);
                border-color: rgba(255, 255, 255, 0.3);
            }
            
            .report-custom-btn {
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            
            .report-custom-btn:hover {
                background: #5b21b6 !important;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
            }
            
            /* Enhanced input focus styles */
            #customStartDate:focus,
            #customEndDate:focus {
                border-color: #059669 !important;
                box-shadow: 0 0 0 3px rgba(5, 150, 103, 0.1);
            }
            
            /* Toast improvements */
            #toastSuccess {
                z-index: 10000;
            }
            
            #toastError {
                z-index: 10000;
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
                        <p>Welcome to our digital log system. Please fill out the form before proceeding. Thank you for your cooperation.</p>
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
                        <p>&copy; 2025 Olongapo City Public Library. All rights reserved.</p>
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

                    <form id="log-form">
                        <div class="form-group">
                            <label>Fullname <span>*</span></label>
                            <input autofocus class="navigatable" type="text" id="fullname" required placeholder="Enter your fullname"/>
                        </div>
                        <div class="form-group same-row">
                            <div class="cta">
                                <label>Gender <span>*</span></label>
                                <div class="custom-dropdown" id="gender-dropdown">
                                    <div class="dropdown-selected" id="gender-selected">Select Gender</div>
                                    <div class="dropdown-list" id="gender-list">
                                        <div class="dropdown-item" data-value="male">Male</div>
                                        <div class="dropdown-item" data-value="female">Female</div>
                                        <div class="dropdown-item" data-value="non-binary">Non-Binary</div>
                                        <div class="dropdown-item" data-value="prefer-not-to-answer">Prefer not to Answer</div>
                                        <div class="dropdown-item other-item">
                                            Other: <input type="text" id="gender-other-inline" placeholder="Please specify" style="width:100%;"/>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="gender" required />
                            </div>
                            <div class="cta">
                                <label>Age <span>*</span></label>
                                <input class="navigatable" type="number" id="age" required placeholder="Enter your age"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>School/Office <span>*</span></label>
                            <input class="navigatable" type="text" id="school-office" required placeholder="Enter your school/office"/>
                        </div>
                        <div class="form-group r-same-row">
                            <div class="cta">
                                <label>Address <span>*</span></label>
                                <input class="navigatable" type="text" id="address" required placeholder="Enter your address"/>
                            </div>
                            <div class="cta">
                                <label>Contact Number (Optional)</label>
                                <input class="navigatable" type="text" id="contact-number" maxlength="11" inputmode="numeric" placeholder="Phone number">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Purpose of Visit <span>*</span></label>
                            <select class="navigatable" id="purpose-select" required>
                                <option value="" disabled selected>Select purpose...</option>
                                <option value="Library Visit">Library Visit</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Training">Training</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Event">Event</option>
                                <option value="Research">Research</option>
                                <option value="Borrow/Return Books">Borrow/Return Books</option>
                            </select>
                        </div>

                        <button type="submit" id="submit-btn">Submit</button>

                        <div class="terms-policy">
                            <input type="checkbox" id="terms-checkbox" required>
                            <label for="terms-checkbox">
                                By checking this box, I declare that I am physically present at the event and agree to have my attendance officially recorded.
                                I also grant permission for the collection and processing of my personal data in compliance with 
                                <a href="#" id="privacy-link" style="color: var(--primary); text-decoration: underline; cursor: pointer;">data privacy regulations.</a>
                            </label>
                        </div>
                    </form>
                </div>

                <!-- Signature Modal -->
                <div id="signatureModal" class="signature-modal">
                    <div class="canvas-container">
                        <div class="signature-modal-content">
                        <h2>Digital Signature Required</h2>
                        <p class="signature-instructions">Please draw your signature in the box below to confirm your log entry</p>
                        <canvas id="signatureCanvas" class="signature-canvas" width="400" height="200"></canvas>
                        <div class="signature-buttons">
                            <button type="button" class="btn-clear" onclick="clearSignature()">Clear</button>
                            <button type="button" class="btn-cancel" onclick="closeSignatureModal()">Cancel</button>
                            <button type="button" class="btn-confirm" onclick="confirmSignature()">Confirm & Submit</button>
                        </div>
                    </div>
                   </div>
                </div>

                <div id="privacyModal" class="signature-modal">
                    <div class="canvas-container">
                        <div class="signature-modal-content" style="max-width: 600px;">
                            <h2>Data Privacy Act of 2012 (RA 10173)</h2>
                            <p style="text-align:justify;max-height:300px;overflow-y:auto;">
                                This system collects and processes your personal data in accordance with the <b>Data Privacy Act of 2012 (RA 10173)</b> of the Philippines. Your information will be used solely for attendance, record-keeping, and reporting/statistical purposes by the Olongapo City Public Library. Your data will not be shared with unauthorized parties and will be handled with strict confidentiality. For more information, please contact the library administration.
                            </p>
                            <div class="signature-buttons">
                                <button type="button" class="btn-cancel" id="closePrivacyModal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="adminPasswordModal" class="signature-modal">
                  <div class="canvas-container">
                    <div class="signature-modal-content" style="max-width: 400px;">
                      <h2>Admin Access</h2>
                      <p style="margin-bottom:10px;">Enter password to access reports:</p>
                      <input type="password" id="adminPasswordInput" style="width:100%;padding:10px 14px;font-size:18px;border-radius:8px;border:1.5px solid #e0e2e5;outline:none;" autofocus />
                      <div class="signature-buttons" style="margin-top:20px;">
                        <button type="button" class="btn-cancel" id="closeAdminPasswordModal">Cancel</button>
                        <button type="button" class="btn-confirm" id="submitAdminPassword">Submit</button>
                      </div>
                      <div id="adminPasswordError" style="color:#dc2626;margin-top:10px;display:none;">Incorrect password.</div>
                    </div>
                  </div>
                </div>                <div id="reportOptionsModal" class="signature-modal">
                    <div class="canvas-container">
                        <div class="signature-modal-content" style="max-width: 500px;">
                            <h2>📊 Generate Analytics Report</h2>
                            <p style="margin-bottom:20px;color:#6b7280;">Select a report period to generate comprehensive visitor analytics:</p>
                            
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px;">
                                <button type="button" class="btn-confirm report-quick-btn" id="reportToday" style="padding:15px;font-size:14px;">
                                    <div style="font-weight:600;">📅 Today</div>
                                    <div style="font-size:12px;opacity:0.8;">Current day</div>
                                </button>
                                <button type="button" class="btn-confirm report-quick-btn" id="report1Week" style="padding:15px;font-size:14px;">
                                    <div style="font-weight:600;">📅 Last 7 Days</div>
                                    <div style="font-size:12px;opacity:0.8;">Weekly report</div>
                                </button>
                                <button type="button" class="btn-confirm report-quick-btn" id="report1Month" style="padding:15px;font-size:14px;">
                                    <div style="font-weight:600;">📅 Last Month</div>
                                    <div style="font-size:12px;opacity:0.8;">30 days</div>
                                </button>
                                <button type="button" class="btn-confirm report-quick-btn" id="report3Months" style="padding:15px;font-size:14px;">
                                    <div style="font-weight:600;">📅 Last 3 Months</div>
                                    <div style="font-size:12px;opacity:0.8;">Quarterly</div>
                                </button>
                                <button type="button" class="btn-confirm report-quick-btn" id="report6Months" style="padding:15px;font-size:14px;">
                                    <div style="font-weight:600;">📅 Last 6 Months</div>
                                    <div style="font-size:12px;opacity:0.8;">Semi-annual</div>
                                </button>
                                <button type="button" class="btn-confirm report-quick-btn" id="report1Year" style="padding:15px;font-size:14px;">
                                    <div style="font-weight:600;">📅 Last Year</div>
                                    <div style="font-size:12px;opacity:0.8;">Annual report</div>
                                </button>
                            </div>
                            
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
                                <button type="button" class="btn-confirm" id="dashboardStats" style="padding:15px;font-size:14px;background:#8b5cf6;">
                                    <div style="font-weight:600;">📊 View Dashboard</div>
                                    <div style="font-size:12px;opacity:0.8;">Live statistics</div>
                                </button>
                                <button type="button" class="btn-confirm" id="exportData" style="padding:15px;font-size:14px;background:#f59e0b;">
                                    <div style="font-weight:600;">💾 Export Data</div>
                                    <div style="font-size:12px;opacity:0.8;">Backup database</div>
                                </button>
                            </div>
                            
                            <div style="border-top:1px solid #e5e7eb;padding-top:15px;margin-bottom:20px;">
                                <button type="button" class="btn-confirm report-custom-btn" id="reportCustom" style="width:100%;padding:15px;background:#6366f1;">
                                    <div style="font-weight:600;">🗓️ Custom Date Range</div>
                                    <div style="font-size:12px;opacity:0.8;">Choose specific start and end dates</div>
                                </button>
                            </div>
                            
                            <div class="signature-buttons" style="margin-top:20px;">
                                <button type="button" class="btn-cancel" id="closeReportOptionsModal">Close</button>
                            </div>
                            
                            <div style="margin-top:15px;padding:10px;background:#f8fafc;border-radius:6px;font-size:12px;color:#64748b;">
                                💡 <strong>Tip:</strong> Reports include visitor analytics, demographics, trends, and comprehensive statistics in multiple Excel sheets.
                            </div>
                        </div>
                    </div>
                </div>

                <div id="customDateModal" class="signature-modal">
                    <div class="canvas-container">
                        <div class="signature-modal-content" style="max-width: 450px;">
                            <h2>📅 Custom Date Range Report</h2>
                            <p style="margin-bottom:20px;color:#6b7280;">Select the exact date range for your custom report:</p>
                            
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px;">
                                <div>
                                    <label style="display:block;margin-bottom:8px;font-weight:600;color:#374151;">📅 Start Date:</label>
                                    <input type="date" id="customStartDate" style="width:100%;padding:12px 14px;font-size:16px;border-radius:8px;border:2px solid #e5e7eb;outline:none;transition:border-color 0.2s;" />
                                </div>
                                <div>
                                    <label style="display:block;margin-bottom:8px;font-weight:600;color:#374151;">📅 End Date:</label>
                                    <input type="date" id="customEndDate" style="width:100%;padding:12px 14px;font-size:16px;border-radius:8px;border:2px solid #e5e7eb;outline:none;transition:border-color 0.2s;" />
                                </div>
                            </div>
                            
                            <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:6px;padding:12px;margin-bottom:20px;">
                                <div style="font-size:13px;color:#0369a1;">
                                    <strong>📊 Your report will include:</strong><br>
                                    • Executive summary with key metrics<br>
                                    • Detailed visitor data<br>
                                    • Analytics dashboard with charts<br>
                                    • Trends analysis (daily/hourly patterns)<br>
                                    • Demographic breakdowns
                                </div>
                            </div>
                            
                            <div class="signature-buttons">
                                <button type="button" class="btn-cancel" id="closeCustomDateModal">Cancel</button>
                                <button type="button" class="btn-confirm" id="generateCustomReport" style="background:#059669;">📈 Generate Report</button>
                            </div>
                            
                            <div style="margin-top:12px;text-align:center;font-size:11px;color:#9ca3af;">
                                Reports are saved to your Documents folder
                            </div>
                        </div>
                    </div>
                </div>

                <div id="dashboardModal" class="signature-modal">
                    <div class="canvas-container">
                        <div class="signature-modal-content" style="max-width: 700px;">
                            <h2>📊 Live Dashboard</h2>
                            <p style="margin-bottom:20px;color:#6b7280;">Real-time visitor statistics and analytics</p>
                            
                            <div id="dashboardContent" style="text-align:left;">
                                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(150px, 1fr));gap:15px;margin-bottom:25px;">
                                    <div style="background:#dbeafe;border-radius:8px;padding:15px;text-align:center;">
                                        <div style="font-size:24px;font-weight:bold;color:#1d4ed8;" id="totalVisitors">-</div>
                                        <div style="font-size:12px;color:#64748b;">Total Visitors</div>
                                    </div>
                                    <div style="background:#dcfce7;border-radius:8px;padding:15px;text-align:center;">
                                        <div style="font-size:24px;font-weight:bold;color:#059669;" id="todayVisitors">-</div>
                                        <div style="font-size:12px;color:#64748b;">Today</div>
                                    </div>
                                    <div style="background:#fef3c7;border-radius:8px;padding:15px;text-align:center;">
                                        <div style="font-size:24px;font-weight:bold;color:#d97706;" id="thisWeekVisitors">-</div>
                                        <div style="font-size:12px;color:#64748b;">This Week</div>
                                    </div>
                                    <div style="background:#fce7f3;border-radius:8px;padding:15px;text-align:center;">
                                        <div style="font-size:24px;font-weight:bold;color:#be185d;" id="thisMonthVisitors">-</div>
                                        <div style="font-size:12px;color:#64748b;">This Month</div>
                                    </div>
                                </div>
                                
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px;">
                                    <div style="background:#f8fafc;border-radius:8px;padding:15px;">
                                        <h4 style="margin:0 0 10px 0;color:#374151;">👥 Gender Distribution</h4>
                                        <div id="genderStats" style="font-size:14px;"></div>
                                    </div>
                                    <div style="background:#f8fafc;border-radius:8px;padding:15px;">
                                        <h4 style="margin:0 0 10px 0;color:#374151;">🎯 Top Purposes</h4>
                                        <div id="purposeStats" style="font-size:14px;"></div>
                                    </div>
                                </div>
                                
                                <div style="background:#f8fafc;border-radius:8px;padding:15px;">
                                    <h4 style="margin:0 0 15px 0;color:#374151;">👤 Recent Visitors</h4>
                                    <div id="recentVisitors" style="font-size:13px;max-height:200px;overflow-y:auto;"></div>
                                </div>
                            </div>
                            
                            <div class="signature-buttons" style="margin-top:25px;">
                                <button type="button" class="btn-cancel" id="closeDashboardModal">Close</button>
                                <button type="button" class="btn-confirm" id="refreshDashboard" style="background:#6366f1;">🔄 Refresh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="toastSuccess">
                Log successfully!
            </div>
            <div id="toastError">
                Error occurred!
            </div>
            
        `;
	},
	mount() {
		let isDrawing = false;
		let signatureData = null;
		let currentFormData = null;
		let canvasInitialized = false;

		function initializeSignatureCanvas() {
			if (canvasInitialized) return;
			const canvas = document.getElementById("signatureCanvas");
			const ctx = canvas.getContext("2d");

			ctx.strokeStyle = "#000";
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";

			canvas.addEventListener("mousedown", startDrawing);
			canvas.addEventListener("mousemove", draw);
			canvas.addEventListener("mouseup", stopDrawing);
			canvas.addEventListener("mouseout", stopDrawing);

			canvas.addEventListener("touchstart", handleTouch);
			canvas.addEventListener("touchmove", handleTouch);
			canvas.addEventListener("touchend", stopDrawing);

			function startDrawing(e) {
				isDrawing = true;
				const rect = canvas.getBoundingClientRect();
				ctx.beginPath();
				ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
			}

			function draw(e) {
				if (!isDrawing) return;
				const rect = canvas.getBoundingClientRect();
				ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
				ctx.stroke();
			}

			function stopDrawing() {
				if (isDrawing) {
					isDrawing = false;
					signatureData = canvas.toDataURL("image/png");
				}
			}

			function handleTouch(e) {
				e.preventDefault();
				const touch = e.touches[0];
				const mouseEvent = new MouseEvent(
					e.type === "touchstart"
						? "mousedown"
						: e.type === "touchmove"
						? "mousemove"
						: "mouseup",
					{
						clientX: touch.clientX,
						clientY: touch.clientY,
					}
				);
				canvas.dispatchEvent(mouseEvent);
			}
			canvasInitialized = true;
		}

		window.clearSignature = function () {
			const canvas = document.getElementById("signatureCanvas");
			const ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			signatureData = null;
		};

		window.closeSignatureModal = function () {
			document.getElementById("signatureModal").style.display = "none";
			clearSignature();
		};

		window.confirmSignature = function () {
			if (!signatureData) {
				showToastError(
					"Please provide your signature before confirming"
				);
				return;
			}

			if (!currentFormData) {
				showToastError("Form data is missing. Please try again.");
				return;
			}

			currentFormData.signature = signatureData;

			document.getElementById("signatureModal").style.display = "none";
			saveToExcel(currentFormData);

			currentFormData = null;
			clearSignature();
		};

		function showSignatureModal(formData) {
			currentFormData = formData;
			document.getElementById("signatureModal").style.display = "block";
			clearSignature();
			initializeSignatureCanvas();
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

		const navigatable = document.getElementsByClassName("navigatable");

		document.addEventListener("keydown", function (event) {
			if (
				(event.key === "ArrowDown" || event.key === "ArrowUp") &&
				document.activeElement.classList.contains("navigatable")
			) {
				if (document.activeElement.id === "gender-selected") {
					return;
				}

				event.preventDefault();
				const fields = Array.from(navigatable);
				const idx = fields.indexOf(document.activeElement);
				if (
					event.key === "ArrowDown" &&
					idx > -1 &&
					idx < fields.length - 1
				) {
					fields[idx + 1].focus();
				} else if (event.key === "ArrowUp" && idx > 0) {
					fields[idx - 1].focus();
				}
			}
		});

		function validateForm() {
			const fullname = document.getElementById("fullname").value.trim();
			const genderInput = document.getElementById("gender");
			const gender = genderInput ? genderInput.value : "";
			const age = document.getElementById("age").value;
			const schoolOffice = document
				.getElementById("school-office")
				.value.trim();
			const address = document.getElementById("address").value.trim();
			const purposeSelect = document.getElementById("purpose-select");
			const purpose = purposeSelect ? purposeSelect.value.trim() : "";

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
			document.getElementById("age").value = "";
			document.getElementById("school-office").value = "";
			document.getElementById("address").value = "";
			document.getElementById("contact-number").value = "";
			const genderInput = document.getElementById("gender");
			const genderSelected = document.getElementById("gender-selected");
			const genderOtherInline = document.getElementById(
				"gender-other-inline"
			);
			if (genderInput) genderInput.value = "";
			if (genderSelected) genderSelected.textContent = "Select Gender";
			if (genderOtherInline) genderOtherInline.value = "";
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
					gender: document.getElementById("gender").value || "",
					age: parseInt(document.getElementById("age").value),
					schoolOffice: document
						.getElementById("school-office")
						.value.trim(),
					address: document.getElementById("address").value.trim(),
					contactNumber: document
						.getElementById("contact-number")
						.value.trim(),
					purpose: document
						.getElementById("purpose-select")
						.value.trim(),
				};

				showSignatureModal(formData);
			});
		}

		const privacyLink = document.getElementById("privacy-link");
		const privacyModal = document.getElementById("privacyModal");
		const closePrivacyModalBtn =
			document.getElementById("closePrivacyModal");

		if (privacyLink && privacyModal && closePrivacyModalBtn) {
			let escPrivacyListener = null;

			privacyLink.addEventListener("click", function (e) {
				e.preventDefault();
				privacyModal.style.display = "flex";

				escPrivacyListener = function (evt) {
					if (evt.key === "Escape") {
						privacyModal.style.display = "none";
						document.removeEventListener(
							"keydown",
							escPrivacyListener
						);
					}
				};
				document.addEventListener("keydown", escPrivacyListener);
			});

			closePrivacyModalBtn.addEventListener("click", function () {
				privacyModal.style.display = "none";
				if (escPrivacyListener)
					document.removeEventListener("keydown", escPrivacyListener);
			});

			privacyModal.addEventListener("click", function (e) {
				if (e.target === privacyModal) {
					privacyModal.style.display = "none";
					if (escPrivacyListener)
						document.removeEventListener(
							"keydown",
							escPrivacyListener
						);
				}
			});
		}

		const genderSelect = document.getElementById("gender");
		const genderOtherInput = document.getElementById("gender-other");

		if (genderSelect && genderOtherInput) {
			genderSelect.addEventListener("change", function () {
				if (genderSelect.value === "other") {
					genderOtherInput.style.display = "block";
					genderOtherInput.required = true;
					genderOtherInput.focus();
				} else {
					genderOtherInput.style.display = "none";
					genderOtherInput.required = false;
					genderOtherInput.value = "";
				}
			});
		}

		const genderDropdown = document.getElementById("gender-dropdown");
		const genderSelected = document.getElementById("gender-selected");
		const genderList = document.getElementById("gender-list");
		const genderInput = document.getElementById("gender");
		const genderOtherInline = document.getElementById(
			"gender-other-inline"
		);

		if (
			genderDropdown &&
			genderSelected &&
			genderList &&
			genderInput &&
			genderOtherInline
		) {
			let selectedIndex = -1;
			const dropdownItems = genderList.querySelectorAll(
				".dropdown-item:not(.other-item)"
			);
			const otherItem = genderList.querySelector(".other-item");

			if (!dropdownItems || dropdownItems.length === 0) {
				console.warn("No dropdown items found for gender dropdown");
				return;
			}

			genderSelected.addEventListener("click", function (e) {
				genderList.classList.toggle("open");
				genderSelected.classList.toggle("active");
				if (genderList.classList.contains("open")) {
					genderOtherInline.blur();
					selectedIndex = -1;
				}
				e.stopPropagation();
			});

			genderSelected.addEventListener("keydown", function (e) {
				if (!genderList.classList.contains("open")) {
					if (
						e.key === "Enter" ||
						e.key === "ArrowDown" ||
						e.key === "ArrowUp"
					) {
						e.preventDefault();
						genderList.classList.add("open");
						genderSelected.classList.add("active");
						selectedIndex = 0;
						updateSelection();
					}
					if (e.key === "Escape") {
						e.preventDefault();
						genderSelected.blur();
						const navigatables = Array.from(
							document.getElementsByClassName("navigatable")
						);
						const idx = navigatables.indexOf(genderSelected);
						if (idx > -1 && idx < navigatables.length - 1) {
							navigatables[idx + 1].focus();
						}
					}
					return;
				}

				switch (e.key) {
					case "ArrowDown":
						e.preventDefault();
						selectedIndex = Math.min(
							selectedIndex + 1,
							dropdownItems.length - 1
						);
						updateSelection();
						break;
					case "ArrowUp":
						e.preventDefault();
						selectedIndex = Math.max(selectedIndex - 1, 0);
						updateSelection();
						break;
					case "Enter":
						e.preventDefault();
						if (selectedIndex >= 0) {
							selectItem(dropdownItems[selectedIndex]);
						}
						break;
					case "Escape":
						e.preventDefault();
						genderList.classList.remove("open");
						genderSelected.classList.remove("active");
						break;
				}
			});

			function updateSelection() {
				dropdownItems.forEach((item, index) => {
					item.classList.toggle(
						"highlighted",
						index === selectedIndex
					);
				});
			}

			function selectItem(item) {
				const value = item.getAttribute("data-value");
				genderInput.value = value;
				genderSelected.textContent = item.textContent;
				genderList.classList.remove("open");
				genderSelected.classList.remove("active");
			}

			dropdownItems.forEach((item) => {
				item.addEventListener("click", function () {
					selectItem(this);
				});
			});

			genderOtherInline.addEventListener("input", function () {
				if (this.value.trim()) {
					genderInput.value = this.value.trim();
					genderSelected.textContent = `Other: ${this.value.trim()}`;
				}
			});

			genderOtherInline.addEventListener("keydown", function (e) {
				if (e.key === "Escape") {
					genderList.classList.remove("open");
					genderSelected.classList.remove("active");
				}
			});

			document.addEventListener("click", function (e) {
				if (!genderDropdown.contains(e.target)) {
					genderList.classList.remove("open");
					genderSelected.classList.remove("active");
				}
			});
		}

		// Modal logic for admin password and report options
		const adminPasswordModal =
			document.getElementById("adminPasswordModal");
		const adminPasswordInput =
			document.getElementById("adminPasswordInput");
		const closeAdminPasswordModal = document.getElementById(
			"closeAdminPasswordModal"
		);
		const submitAdminPassword = document.getElementById(
			"submitAdminPassword"
		);
		const adminPasswordError =
			document.getElementById("adminPasswordError");
		const reportOptionsModal =
			document.getElementById("reportOptionsModal");
		const closeReportOptionsModal = document.getElementById(
			"closeReportOptionsModal"
		);
		const customDateModal = document.getElementById("customDateModal");
		const closeCustomDateModal = document.getElementById(
			"closeCustomDateModal"
		);
		const generateCustomReport = document.getElementById(
			"generateCustomReport"
		);
		const customStartDate = document.getElementById("customStartDate");
		const customEndDate = document.getElementById("customEndDate");

		// Dashboard modal elements
		const dashboardModal = document.getElementById("dashboardModal");
		const closeDashboardModal = document.getElementById(
			"closeDashboardModal"
		);
		const refreshDashboard = document.getElementById("refreshDashboard");
		const dashboardStats = document.getElementById("dashboardStats");
		const exportData = document.getElementById("exportData");

		function showAdminPasswordModal() {
			adminPasswordModal.style.display = "flex";
			adminPasswordInput.value = "";
			adminPasswordError.style.display = "none";
			setTimeout(() => adminPasswordInput.focus(), 100);
		}
		function hideAdminPasswordModal() {
			adminPasswordModal.style.display = "none";
		}
		function showReportOptionsModal() {
			reportOptionsModal.style.display = "flex";
		}
		function hideReportOptionsModal() {
			reportOptionsModal.style.display = "none";
		}
		function showCustomDateModal() {
			customDateModal.style.display = "flex";
			// Set default dates
			const today = new Date();
			const oneWeekAgo = new Date(
				today.getTime() - 7 * 24 * 60 * 60 * 1000
			);
			customStartDate.value = oneWeekAgo.toISOString().split("T")[0];
			customEndDate.value = today.toISOString().split("T")[0];
		}
		function hideCustomDateModal() {
			customDateModal.style.display = "none";
		}

		function showDashboardModal() {
			dashboardModal.style.display = "flex";
			loadDashboardStats();
		}
		function hideDashboardModal() {
			dashboardModal.style.display = "none";
		}

		async function loadDashboardStats() {
			try {
				showToastSuccess("Loading dashboard data...");
				const result = await window.electronAPI.getDashboardStats();

				if (result.success) {
					const stats = result.stats;

					// Update main counters
					document.getElementById("totalVisitors").textContent =
						stats.totalVisitors;
					document.getElementById("todayVisitors").textContent =
						stats.todayVisitors;
					document.getElementById("thisWeekVisitors").textContent =
						stats.thisWeekVisitors;
					document.getElementById("thisMonthVisitors").textContent =
						stats.thisMonthVisitors;

					// Update gender stats
					const genderContainer =
						document.getElementById("genderStats");
					genderContainer.innerHTML = "";
					Object.entries(stats.genderStats).forEach(
						([gender, count]) => {
							const percentage = (
								(count / stats.totalVisitors) *
								100
							).toFixed(1);
							genderContainer.innerHTML += `<div style="margin-bottom:5px;">${gender}: <strong>${count}</strong> (${percentage}%)</div>`;
						}
					);

					// Update purpose stats (top 5)
					const purposeContainer =
						document.getElementById("purposeStats");
					purposeContainer.innerHTML = "";
					const topPurposes = Object.entries(stats.purposeStats)
						.sort((a, b) => b[1] - a[1])
						.slice(0, 5);
					topPurposes.forEach(([purpose, count]) => {
						const percentage = (
							(count / stats.totalVisitors) *
							100
						).toFixed(1);
						purposeContainer.innerHTML += `<div style="margin-bottom:5px;">${purpose}: <strong>${count}</strong> (${percentage}%)</div>`;
					});

					// Update recent visitors
					const recentContainer =
						document.getElementById("recentVisitors");
					recentContainer.innerHTML = "";
					stats.recentVisitors.forEach((visitor, index) => {
						const date = new Date(visitor.timestamp).toLocaleString(
							"en-PH",
							{
								month: "short",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							}
						);
						recentContainer.innerHTML += `
							<div style="padding:8px;margin-bottom:5px;background:white;border-radius:4px;border-left:3px solid #059669;">
								<strong>${visitor.fullname}</strong> (${visitor.gender}, ${visitor.age})
								<div style="font-size:11px;color:#64748b;">${date} • ${visitor.purpose}</div>
							</div>
						`;
					});

					showToastSuccess("Dashboard updated!");
				} else {
					showToastError(`Failed to load dashboard: ${result.error}`);
				}
			} catch (error) {
				console.error("Error loading dashboard:", error);
				showToastError("Error loading dashboard data.");
			}
		}

		async function exportAllData() {
			try {
				showToastSuccess("Exporting complete database... Please wait.");
				const result = await window.electronAPI.exportData();

				if (result.success) {
					showToastSuccess(
						`✅ Database export completed!\n\n📄 ${
							result.recordCount
						} records exported\n💾 Saved to Documents folder\n\nFile: ${
							result.message.split(": ")[1]
						}`
					);
				} else {
					showToastError(`❌ Export failed: ${result.error}`);
				}
			} catch (error) {
				console.error("Error exporting data:", error);
				showToastError("❌ Error exporting data. Please try again.");
			}
		}

		async function generateReport(
			reportType,
			startDate = null,
			endDate = null
		) {
			try {
				// Show loading toast with report type info
				const reportTypeNames = {
					today: "Today's Report",
					"1week": "Weekly Report",
					"1month": "Monthly Report",
					"3months": "Quarterly Report",
					"6months": "Semi-Annual Report",
					"1year": "Annual Report",
					custom: "Custom Range Report",
				};

				showToastSuccess(
					`Generating ${
						reportTypeNames[reportType] || "Report"
					}... Please wait.`
				);

				const result = await window.electronAPI.generateReport(
					reportType,
					startDate,
					endDate
				);

				if (result.success) {
					// Show detailed success message with statistics
					const statsMsg = result.statistics
						? `\n\n📊 Quick Stats:\n• Total Visitors: ${result.recordCount}\n• Daily Average: ${result.statistics.dailyAverage}\n• Peak Day: ${result.statistics.peakDayVisits} visitors\n• Peak Hour: ${result.statistics.peakHourVisits} visitors at ${result.statistics.peakHour}`
						: `\n\n📊 Total Records: ${result.recordCount}`;

					showToastSuccess(
						`✅ ${
							reportTypeNames[reportType] || "Report"
						} generated successfully!${statsMsg}\n\n💾 Saved to Documents folder`
					);
					hideReportOptionsModal();
					hideCustomDateModal();
				} else {
					showToastError(
						`❌ Failed to generate report: ${result.error}`
					);
				}
			} catch (error) {
				console.error("Error generating report:", error);
				showToastError("❌ Error generating report. Please try again.");
			}
		}

		if (closeAdminPasswordModal) {
			closeAdminPasswordModal.addEventListener(
				"click",
				hideAdminPasswordModal
			);
		}
		if (submitAdminPassword) {
			submitAdminPassword.addEventListener("click", function () {
				if (adminPasswordInput.value === "OCPLAdmin2025") {
					hideAdminPasswordModal();
					showReportOptionsModal();
				} else {
					adminPasswordError.style.display = "block";
					adminPasswordInput.value = "";
					adminPasswordInput.focus();
				}
			});
		}
		if (adminPasswordInput) {
			adminPasswordInput.addEventListener("keydown", function (e) {
				if (e.key === "Enter") {
					submitAdminPassword.click();
				}
				if (e.key === "Escape") {
					hideAdminPasswordModal();
				}
			});
		}
		if (closeReportOptionsModal) {
			closeReportOptionsModal.addEventListener(
				"click",
				hideReportOptionsModal
			);
		}

		// Dashboard modal handlers
		if (dashboardStats) {
			dashboardStats.addEventListener("click", function () {
				hideReportOptionsModal();
				showDashboardModal();
			});
		}
		if (closeDashboardModal) {
			closeDashboardModal.addEventListener("click", hideDashboardModal);
		}
		if (refreshDashboard) {
			refreshDashboard.addEventListener("click", loadDashboardStats);
		}
		if (exportData) {
			exportData.addEventListener("click", exportAllData);
		}

		// Report option handlers
		const reportToday = document.getElementById("reportToday");
		const report1Week = document.getElementById("report1Week");
		const report1Month = document.getElementById("report1Month");
		const report3Months = document.getElementById("report3Months");
		const report6Months = document.getElementById("report6Months");
		const report1Year = document.getElementById("report1Year");
		const reportCustom = document.getElementById("reportCustom");

		if (reportToday) {
			reportToday.addEventListener("click", function () {
				generateReport("today");
			});
		}
		if (report1Week) {
			report1Week.addEventListener("click", function () {
				generateReport("1week");
			});
		}
		if (report1Month) {
			report1Month.addEventListener("click", function () {
				generateReport("1month");
			});
		}
		if (report3Months) {
			report3Months.addEventListener("click", function () {
				generateReport("3months");
			});
		}
		if (report6Months) {
			report6Months.addEventListener("click", function () {
				generateReport("6months");
			});
		}
		if (report1Year) {
			report1Year.addEventListener("click", function () {
				generateReport("1year");
			});
		}
		if (reportCustom) {
			reportCustom.addEventListener("click", function () {
				hideReportOptionsModal();
				showCustomDateModal();
			});
		}

		// Custom date modal handlers
		if (closeCustomDateModal) {
			closeCustomDateModal.addEventListener("click", function () {
				hideCustomDateModal();
				showReportOptionsModal();
			});
		}
		if (generateCustomReport) {
			generateCustomReport.addEventListener("click", function () {
				const startDate = customStartDate.value;
				const endDate = customEndDate.value;

				if (!startDate || !endDate) {
					showToastError("Please select both start and end dates.");
					return;
				}

				if (new Date(startDate) > new Date(endDate)) {
					showToastError("Start date cannot be later than end date.");
					return;
				}

				generateReport("custom", startDate, endDate);
			});
		}

		// ESC closes modals
		if (reportOptionsModal) {
			reportOptionsModal.addEventListener("keydown", function (e) {
				if (e.key === "Escape") {
					hideReportOptionsModal();
				}
			});
		}
		if (customDateModal) {
			customDateModal.addEventListener("keydown", function (e) {
				if (e.key === "Escape") {
					hideCustomDateModal();
					showReportOptionsModal();
				}
			});
		}
		if (dashboardModal) {
			dashboardModal.addEventListener("keydown", function (e) {
				if (e.key === "Escape") {
					hideDashboardModal();
				}
			});
		}

		// Global shortcut: Ctrl+Shift+B for admin access
		window.addEventListener("keydown", function (e) {
			if (e.ctrlKey && e.shiftKey && (e.key === "B" || e.key === "b")) {
				e.preventDefault();
				showAdminPasswordModal();
			}
		});
	},
};

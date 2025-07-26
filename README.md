# Olongapo City Public Library Logging Management System

A modern digital logging and attendance system for the Olongapo City Public Library, built with Electron and JavaScript. This application streamlines visitor registration, attendance tracking, and report generation, ensuring secure and efficient data management.

## Features

-   **User-Friendly Interface:** Clean, responsive design for easy logging and navigation.
-   **Digital Signature:** Visitors provide a digital signature to confirm their log entry.
-   **Custom Dropdowns:** Enhanced form controls for gender and other fields.
-   **Data Privacy Compliance:** Informs users about the Data Privacy Act of 2012 (RA 10173).
-   **Admin Reports:** Secure, password-protected access to generate attendance reports (last week, last month, or custom date range).
-   **Excel Export:** All logs are saved to an Excel file for easy record-keeping and reporting.
-   **Keyboard Navigation:** Supports keyboard shortcuts and navigation for accessibility.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)
-   [npm](https://www.npmjs.com/)

### Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/Swif7ify/OCPL-Logging.git
    cd OCPL-Logging
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

### Running the App

Start the Electron application:

```sh
npm start
```

### Building the App (for Distribution)

To package the application for Windows, run:

```sh
npm run build
```

The installer and packaged app will be generated in the `dist/` folder. You can distribute the `.exe` installer or the unpacked app as needed.

## Usage

-   Fill out the registration form and provide a digital signature to log your visit.
-   Admins can press `Ctrl+Shift+B` to access the report generation modal (password required).
-   Reports are saved as Excel files in the user's Documents folder.

## Project Structure

```
index.js                # Electron main process
preload.js              # Preload script for secure API access
src/renderer/           # Renderer process (frontend)
  views/HomeView.js     # Main view and form logic
public/                 # Static assets (HTML, icons, images)
```

## Customization

-   Update the logo and branding in `public/assets/`.
-   Modify form fields or styles in `src/renderer/views/HomeView.js`.

## Data Privacy

This system complies with the Data Privacy Act of 2012 (RA 10173). User data is used solely for attendance and reporting purposes and is not shared with unauthorized parties.

## License

This project is licensed under the MIT License.

---

**Developed for Olongapo City Public Library**

const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const XLSX = require("xlsx");
const fs = require("fs");

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		fullscreen: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	mainWindow.loadFile("public/index.html");

	if (process.env.NODE_ENV === "development") {
		mainWindow.webContents.openDevTools();
	}
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

ipcMain.handle("save-to-excel", async (event, data) => {
	try {
		const preferredDir = "C:\\Users\\earlo\\Downloads";
		const filePath = path.join(preferredDir, "OCPL-log.xlsx");

		if (!fs.existsSync(preferredDir)) {
			fs.mkdirSync(preferredDir, { recursive: true });
		}

		let workbook;
		let worksheet;

		if (fs.existsSync(filePath)) {
			workbook = XLSX.readFile(filePath);
			worksheet = workbook.Sheets["Logs"];
		} else {
			workbook = XLSX.utils.book_new();
			worksheet = XLSX.utils.json_to_sheet([]);
			XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");
		}

		const existingData = XLSX.utils.sheet_to_json(worksheet);
		existingData.push({
			Timestamp: data.timestamp,
			"Full Name": data.fullname,
			Gender: data.gender,
			Age: data.age,
			"School/Office": data.schoolOffice,
			Address: data.address,
			"Contact Number": data.contactNumber,
			"Purpose of Visit": data.purpose,
		});

		const newWorksheet = XLSX.utils.json_to_sheet(existingData);
		workbook.Sheets["Logs"] = newWorksheet;

		XLSX.writeFile(workbook, filePath);

		return { success: true };
	} catch (error) {
		console.error("Error saving to Excel:", error);
		return { success: false, error: error.message };
	}
});

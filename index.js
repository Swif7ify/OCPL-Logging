const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const ExcelJS = require("exceljs");
const fs = require("fs");

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		fullscreen: true,
		icon: path.join(__dirname, "public", "icon.ico"),
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

		let workbook = new ExcelJS.Workbook();
		let worksheet;

		if (fs.existsSync(filePath)) {
			await workbook.xlsx.readFile(filePath);
			worksheet =
				workbook.getWorksheet("Logs") || workbook.addWorksheet("Logs");
		} else {
			worksheet = workbook.addWorksheet("Logs");

			worksheet.addRow([
				"Timestamp",
				"Full Name",
				"Gender",
				"Age",
				"School/Office",
				"Address",
				"Contact Number",
				"Purpose of Visit",
				"Digital Signature",
			]);
		}

		const nextRow = worksheet.rowCount + 1;

		// Add the form data
		worksheet.addRow([
			data.timestamp,
			data.fullname,
			data.gender,
			data.age,
			data.schoolOffice,
			data.address,
			data.contactNumber,
			data.purpose,
			"",
		]);

		if (data.signature) {
			const base64Data = data.signature.replace(
				/^data:image\/png;base64,/,
				""
			);
			const imageBuffer = Buffer.from(base64Data, "base64");

			const imageId = workbook.addImage({
				buffer: imageBuffer,
				extension: "png",
			});

			worksheet.addImage(imageId, {
				tl: { col: 8, row: nextRow - 1 },
				ext: { width: 150, height: 80 },
			});

			worksheet.getRow(nextRow).height = 60;
		}

		worksheet.getColumn(1).width = 20;
		worksheet.getColumn(2).width = 25;
		worksheet.getColumn(3).width = 12;
		worksheet.getColumn(4).width = 8;
		worksheet.getColumn(5).width = 30;
		worksheet.getColumn(6).width = 30;
		worksheet.getColumn(7).width = 15;
		worksheet.getColumn(8).width = 30;
		worksheet.getColumn(9).width = 20;

		await workbook.xlsx.writeFile(filePath);

		return { success: true };
	} catch (error) {
		console.error("Error saving to Excel:", error);
		return { success: false, error: error.message };
	}
});

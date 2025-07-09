const { app, BrowserWindow } = require("electron");
const path = require("path");
const { ipcMain } = require("electron");
const ExcelJS = require("exceljs");
const fs = require("fs");
const os = require("os");

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
		const preferredDir = path.join(os.homedir(), "Documents");
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

ipcMain.handle(
	"generate-report",
	async (event, reportType, customStartDate, customEndDate) => {
		try {
			const preferredDir = path.join(os.homedir(), "Documents");
			const dataFilePath = path.join(preferredDir, "OCPL-log.xlsx");

			if (!fs.existsSync(dataFilePath)) {
				return {
					success: false,
					error: "No data file found. Please log some entries first.",
				};
			}

			// Read existing data
			const workbook = new ExcelJS.Workbook();
			await workbook.xlsx.readFile(dataFilePath);
			const worksheet = workbook.getWorksheet("Logs");

			if (!worksheet) {
				return { success: false, error: "No logs worksheet found." };
			}

			// Calculate date range based on report type
			const now = new Date();
			let startDate, endDate;

			switch (reportType) {
				case "1week":
					startDate = new Date(
						now.getTime() - 7 * 24 * 60 * 60 * 1000
					);
					endDate = now;
					break;
				case "1month":
					startDate = new Date(
						now.getFullYear(),
						now.getMonth() - 1,
						now.getDate()
					);
					endDate = now;
					break;
				case "custom":
					startDate = new Date(customStartDate);
					endDate = new Date(customEndDate);
					break;
				default:
					return { success: false, error: "Invalid report type." };
			}

			// Filter data by date range
			const filteredData = [];
			const rows = worksheet.getRows(2, worksheet.rowCount - 1); // Skip header row

			rows.forEach((row) => {
				if (row.values && row.values[1]) {
					// Check if timestamp exists
					const timestamp = new Date(row.values[1]);
					if (timestamp >= startDate && timestamp <= endDate) {
						filteredData.push({
							timestamp: row.values[1],
							fullname: row.values[2],
							gender: row.values[3],
							age: row.values[4],
							schoolOffice: row.values[5],
							address: row.values[6],
							contactNumber: row.values[7],
							purpose: row.values[8],
						});
					}
				}
			});

			// Create report workbook
			const reportWorkbook = new ExcelJS.Workbook();
			const reportWorksheet =
				reportWorkbook.addWorksheet("Visitor Report");

			// Add report header
			const reportTitle = `Olongapo City Public Library - Visitor Report`;
			const dateRange = `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;

			reportWorksheet.addRow([reportTitle]);
			reportWorksheet.addRow([dateRange]);
			reportWorksheet.addRow([`Generated on: ${now.toLocaleString()}`]);
			reportWorksheet.addRow([`Total Visitors: ${filteredData.length}`]);
			reportWorksheet.addRow([]); // Empty row

			// Style the header
			reportWorksheet.getCell("A1").font = { size: 16, bold: true };
			reportWorksheet.getCell("A2").font = { size: 12, bold: true };
			reportWorksheet.getCell("A3").font = { size: 10 };
			reportWorksheet.getCell("A4").font = { size: 12, bold: true };

			// Add data headers
			reportWorksheet.addRow([
				"Timestamp",
				"Full Name",
				"Gender",
				"Age",
				"School/Office",
				"Address",
				"Contact Number",
				"Purpose of Visit",
			]);

			// Style data headers
			const headerRow = reportWorksheet.getRow(6);
			headerRow.font = { bold: true };
			headerRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFE0E0E0" },
			};

			// Add filtered data
			filteredData.forEach((row) => {
				reportWorksheet.addRow([
					row.timestamp,
					row.fullname,
					row.gender,
					row.age,
					row.schoolOffice,
					row.address,
					row.contactNumber,
					row.purpose,
				]);
			});

			// Auto-size columns
			reportWorksheet.columns.forEach((column) => {
				let maxLength = 0;
				column.eachCell({ includeEmpty: true }, (cell) => {
					const columnLength = cell.value
						? cell.value.toString().length
						: 10;
					if (columnLength > maxLength) {
						maxLength = columnLength;
					}
				});
				column.width = Math.min(maxLength + 2, 50);
			});

			// Add statistics section
			const statsRow = reportWorksheet.rowCount + 2;
			reportWorksheet.addRow([]);
			reportWorksheet.addRow(["STATISTICS"]);
			reportWorksheet.getCell(`A${statsRow + 1}`).font = {
				size: 14,
				bold: true,
			};

			// Gender statistics
			const genderStats = {};
			filteredData.forEach((row) => {
				genderStats[row.gender] = (genderStats[row.gender] || 0) + 1;
			});

			reportWorksheet.addRow(["Gender Distribution:"]);
			Object.entries(genderStats).forEach(([gender, count]) => {
				reportWorksheet.addRow([`  ${gender}:`, count]);
			});

			// Purpose statistics
			const purposeStats = {};
			filteredData.forEach((row) => {
				purposeStats[row.purpose] =
					(purposeStats[row.purpose] || 0) + 1;
			});

			reportWorksheet.addRow([]);
			reportWorksheet.addRow(["Purpose Distribution:"]);
			Object.entries(purposeStats).forEach(([purpose, count]) => {
				reportWorksheet.addRow([`  ${purpose}:`, count]);
			});

			// Age group statistics
			const ageGroups = {
				"Under 18": 0,
				"18-30": 0,
				"31-50": 0,
				"51-65": 0,
				"Over 65": 0,
			};
			filteredData.forEach((row) => {
				const age = parseInt(row.age);
				if (age < 18) ageGroups["Under 18"]++;
				else if (age <= 30) ageGroups["18-30"]++;
				else if (age <= 50) ageGroups["31-50"]++;
				else if (age <= 65) ageGroups["51-65"]++;
				else ageGroups["Over 65"]++;
			});

			reportWorksheet.addRow([]);
			reportWorksheet.addRow(["Age Group Distribution:"]);
			Object.entries(ageGroups).forEach(([ageGroup, count]) => {
				reportWorksheet.addRow([`  ${ageGroup}:`, count]);
			});

			// Save report
			const reportFileName = `OCPL-Report-${reportType}-${now.getFullYear()}-${(
				now.getMonth() + 1
			)
				.toString()
				.padStart(2, "0")}-${now
				.getDate()
				.toString()
				.padStart(2, "0")}.xlsx`;
			const reportFilePath = path.join(preferredDir, reportFileName);

			await reportWorkbook.xlsx.writeFile(reportFilePath);

			return {
				success: true,
				message: `Report generated successfully: ${reportFileName}`,
				filePath: reportFilePath,
				recordCount: filteredData.length,
			};
		} catch (error) {
			console.error("Error generating report:", error);
			return { success: false, error: error.message };
		}
	}
);

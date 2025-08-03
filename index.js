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
	async (
		event,
		reportType,
		customStartDate,
		customEndDate,
		reportOptions = {}
	) => {
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
				case "3months":
					startDate = new Date(
						now.getFullYear(),
						now.getMonth() - 3,
						now.getDate()
					);
					endDate = now;
					break;
				case "6months":
					startDate = new Date(
						now.getFullYear(),
						now.getMonth() - 6,
						now.getDate()
					);
					endDate = now;
					break;
				case "1year":
					startDate = new Date(
						now.getFullYear() - 1,
						now.getMonth(),
						now.getDate()
					);
					endDate = now;
					break;
				case "today":
					startDate = new Date(
						now.getFullYear(),
						now.getMonth(),
						now.getDate()
					);
					endDate = new Date(
						now.getFullYear(),
						now.getMonth(),
						now.getDate(),
						23,
						59,
						59
					);
					break;
				case "custom":
					startDate = new Date(customStartDate);
					endDate = new Date(customEndDate);
					endDate.setHours(23, 59, 59, 999); // Include the entire end date
					break;
				default:
					return { success: false, error: "Invalid report type." };
			}

			// Filter data by date range
			const filteredData = [];
			const rows = worksheet.getRows(2, worksheet.rowCount - 1); // Skip header row

			rows.forEach((row) => {
				if (row.values && row.values[1]) {
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

			// Sort data by timestamp (newest first)
			filteredData.sort(
				(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
			);

			// Create comprehensive report workbook
			const reportWorkbook = new ExcelJS.Workbook();

			// Set workbook properties
			reportWorkbook.creator = "OCPL Logging System";
			reportWorkbook.company = "Olongapo City Public Library";
			reportWorkbook.created = now;
			reportWorkbook.modified = now;

			// === EXECUTIVE SUMMARY SHEET ===
			const summarySheet = reportWorkbook.addWorksheet(
				"Executive Summary",
				{
					pageSetup: { orientation: "portrait", paperSize: 9 },
				}
			);

			// Header with logo placeholder and title
			summarySheet.mergeCells("A1:H3");
			const titleCell = summarySheet.getCell("A1");
			titleCell.value =
				"OLONGAPO CITY PUBLIC LIBRARY\nVISITOR ANALYTICS REPORT";
			titleCell.font = {
				name: "Arial",
				size: 18,
				bold: true,
				color: { argb: "FF0F766E" },
			};
			titleCell.alignment = {
				horizontal: "center",
				vertical: "middle",
				wrapText: true,
			};
			titleCell.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFF0F9FF" },
			};
			titleCell.border = {
				top: { style: "thick", color: { argb: "FF0F766E" } },
				left: { style: "thick", color: { argb: "FF0F766E" } },
				bottom: { style: "thick", color: { argb: "FF0F766E" } },
				right: { style: "thick", color: { argb: "FF0F766E" } },
			};

			// Report metadata
			summarySheet.addRow([]);
			summarySheet.addRow([
				"Report Period:",
				`${startDate.toLocaleDateString("en-PH", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				})} to ${endDate.toLocaleDateString("en-PH", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				})}`,
			]);
			summarySheet.addRow([
				"Generated On:",
				now.toLocaleString("en-PH", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}),
			]);
			summarySheet.addRow(["Report Type:", reportType.toUpperCase()]);
			summarySheet.addRow(["Total Records:", filteredData.length]);

			// Key Performance Indicators
			summarySheet.addRow([]);
			summarySheet.addRow(["KEY PERFORMANCE INDICATORS"]);
			const kpiHeaderRow = summarySheet.lastRow;
			kpiHeaderRow.font = {
				bold: true,
				size: 14,
				color: { argb: "FF0F766E" },
			};
			kpiHeaderRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFE6FFFA" },
			};

			// Calculate daily averages and trends
			const dateRange =
				Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
			const dailyAverage = (filteredData.length / dateRange).toFixed(1);

			// Calculate peak days and hours
			const dailyVisits = {};
			const hourlyVisits = {};
			filteredData.forEach((record) => {
				const date = new Date(record.timestamp).toDateString();
				const hour = new Date(record.timestamp).getHours();
				dailyVisits[date] = (dailyVisits[date] || 0) + 1;
				hourlyVisits[hour] = (hourlyVisits[hour] || 0) + 1;
			});

			const peakDay = Object.entries(dailyVisits).reduce(
				(a, b) => (dailyVisits[a[0]] > dailyVisits[b[0]] ? a : b),
				["", 0]
			);
			const peakHour = Object.entries(hourlyVisits).reduce(
				(a, b) => (hourlyVisits[a[0]] > hourlyVisits[b[0]] ? a : b),
				["", 0]
			);

			summarySheet.addRow(["Daily Average Visitors:", dailyAverage]);
			summarySheet.addRow([
				"Peak Day:",
				`${peakDay[0]} (${peakDay[1]} visitors)`,
			]);
			summarySheet.addRow([
				"Peak Hour:",
				`${peakHour[0]}:00 - ${(parseInt(peakHour[0]) + 1) % 24}:00 (${
					peakHour[1]
				} visitors)`,
			]);

			// Visitor Demographics Summary
			const genderStats = {};
			const ageGroups = {
				"Under 18": 0,
				"18-30": 0,
				"31-50": 0,
				"51-65": 0,
				"Over 65": 0,
			};
			const purposeStats = {};

			filteredData.forEach((row) => {
				genderStats[row.gender] = (genderStats[row.gender] || 0) + 1;
				purposeStats[row.purpose] =
					(purposeStats[row.purpose] || 0) + 1;

				const age = parseInt(row.age);
				if (age < 18) ageGroups["Under 18"]++;
				else if (age <= 30) ageGroups["18-30"]++;
				else if (age <= 50) ageGroups["31-50"]++;
				else if (age <= 65) ageGroups["51-65"]++;
				else ageGroups["Over 65"]++;
			});

			summarySheet.addRow([]);
			summarySheet.addRow(["DEMOGRAPHICS OVERVIEW"]);
			const demoHeaderRow = summarySheet.lastRow;
			demoHeaderRow.font = {
				bold: true,
				size: 14,
				color: { argb: "FF0F766E" },
			};
			demoHeaderRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFE6FFFA" },
			};

			// Most common demographics
			const topGender = Object.entries(genderStats).reduce(
				(a, b) => (a[1] > b[1] ? a : b),
				["", 0]
			);
			const topPurpose = Object.entries(purposeStats).reduce(
				(a, b) => (a[1] > b[1] ? a : b),
				["", 0]
			);
			const topAgeGroup = Object.entries(ageGroups).reduce(
				(a, b) => (a[1] > b[1] ? a : b),
				["", 0]
			);

			summarySheet.addRow([
				"Primary Gender:",
				`${topGender[0]} (${(
					(topGender[1] / filteredData.length) *
					100
				).toFixed(1)}%)`,
			]);
			summarySheet.addRow([
				"Primary Age Group:",
				`${topAgeGroup[0]} (${(
					(topAgeGroup[1] / filteredData.length) *
					100
				).toFixed(1)}%)`,
			]);
			summarySheet.addRow([
				"Top Purpose:",
				`${topPurpose[0]} (${(
					(topPurpose[1] / filteredData.length) *
					100
				).toFixed(1)}%)`,
			]);

			// Style the summary sheet
			summarySheet.columns.forEach((column, index) => {
				if (index === 0) column.width = 25;
				else column.width = 50;
			});

			// === DETAILED DATA SHEET ===
			const dataSheet = reportWorkbook.addWorksheet(
				"Detailed Visitor Data"
			);

			// Data headers with enhanced styling
			const headers = [
				"#",
				"Date",
				"Time",
				"Full Name",
				"Gender",
				"Age",
				"School/Office",
				"Address",
				"Contact Number",
				"Purpose of Visit",
			];
			dataSheet.addRow(headers);

			const headerRow = dataSheet.getRow(1);
			headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
			headerRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FF0F766E" },
			};
			headerRow.height = 25;

			// Add data with row numbers and formatted dates
			filteredData.forEach((row, index) => {
				const timestamp = new Date(row.timestamp);
				dataSheet.addRow([
					index + 1,
					timestamp.toLocaleDateString("en-PH"),
					timestamp.toLocaleTimeString("en-PH"),
					row.fullname,
					row.gender,
					row.age,
					row.schoolOffice,
					row.address,
					row.contactNumber,
					row.purpose,
				]);
			});

			// Apply alternating row colors
			for (let i = 2; i <= dataSheet.rowCount; i++) {
				const row = dataSheet.getRow(i);
				if (i % 2 === 0) {
					row.fill = {
						type: "pattern",
						pattern: "solid",
						fgColor: { argb: "FFF8FAFC" },
					};
				}
			}

			// Auto-size columns
			dataSheet.columns.forEach((column, index) => {
				let maxLength = 0;
				column.eachCell({ includeEmpty: true }, (cell) => {
					const columnLength = cell.value
						? cell.value.toString().length
						: 10;
					if (columnLength > maxLength) {
						maxLength = columnLength;
					}
				});
				column.width = Math.min(Math.max(maxLength + 2, 12), 50);
			});

			// === ANALYTICS DASHBOARD SHEET ===
			const analyticsSheet = reportWorkbook.addWorksheet(
				"Analytics Dashboard"
			);

			// Gender Distribution
			analyticsSheet.addRow(["GENDER DISTRIBUTION"]);
			analyticsSheet.lastRow.font = {
				bold: true,
				size: 14,
				color: { argb: "FF0F766E" },
			};
			analyticsSheet.addRow(["Gender", "Count", "Percentage"]);
			const genderHeaderRow = analyticsSheet.lastRow;
			genderHeaderRow.font = { bold: true };
			genderHeaderRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFE6FFFA" },
			};

			Object.entries(genderStats).forEach(([gender, count]) => {
				const percentage = (
					(count / filteredData.length) *
					100
				).toFixed(1);
				analyticsSheet.addRow([gender, count, `${percentage}%`]);
			});

			analyticsSheet.addRow([]);

			// Age Group Distribution
			analyticsSheet.addRow(["AGE GROUP DISTRIBUTION"]);
			analyticsSheet.lastRow.font = {
				bold: true,
				size: 14,
				color: { argb: "FF0F766E" },
			};
			analyticsSheet.addRow(["Age Group", "Count", "Percentage"]);
			const ageHeaderRow = analyticsSheet.lastRow;
			ageHeaderRow.font = { bold: true };
			ageHeaderRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFE6FFFA" },
			};

			Object.entries(ageGroups).forEach(([ageGroup, count]) => {
				const percentage = (
					(count / filteredData.length) *
					100
				).toFixed(1);
				analyticsSheet.addRow([ageGroup, count, `${percentage}%`]);
			});

			analyticsSheet.addRow([]);

			// Purpose Distribution
			analyticsSheet.addRow(["PURPOSE OF VISIT DISTRIBUTION"]);
			analyticsSheet.lastRow.font = {
				bold: true,
				size: 14,
				color: { argb: "FF0F766E" },
			};
			analyticsSheet.addRow(["Purpose", "Count", "Percentage"]);
			const purposeHeaderRow = analyticsSheet.lastRow;
			purposeHeaderRow.font = { bold: true };
			purposeHeaderRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFE6FFFA" },
			};

			Object.entries(purposeStats).forEach(([purpose, count]) => {
				const percentage = (
					(count / filteredData.length) *
					100
				).toFixed(1);
				analyticsSheet.addRow([purpose, count, `${percentage}%`]);
			});

			// === TRENDS ANALYSIS SHEET ===
			const trendsSheet = reportWorkbook.addWorksheet("Trends Analysis");

			// Daily visitor count
			trendsSheet.addRow(["DAILY VISITOR TRENDS"]);
			trendsSheet.lastRow.font = {
				bold: true,
				size: 14,
				color: { argb: "FF0F766E" },
			};
			trendsSheet.addRow(["Date", "Visitors", "Day of Week"]);
			const dailyHeaderRow = trendsSheet.lastRow;
			dailyHeaderRow.font = { bold: true };
			dailyHeaderRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFE6FFFA" },
			};

			Object.entries(dailyVisits)
				.sort((a, b) => new Date(a[0]) - new Date(b[0]))
				.forEach(([date, count]) => {
					const dayOfWeek = new Date(date).toLocaleDateString(
						"en-PH",
						{ weekday: "long" }
					);
					trendsSheet.addRow([date, count, dayOfWeek]);
				});

			trendsSheet.addRow([]);

			// Hourly distribution
			trendsSheet.addRow(["HOURLY VISITOR DISTRIBUTION"]);
			trendsSheet.lastRow.font = {
				bold: true,
				size: 14,
				color: { argb: "FF0F766E" },
			};
			trendsSheet.addRow(["Hour", "Visitors", "Time Period"]);
			const hourlyHeaderRow = trendsSheet.lastRow;
			hourlyHeaderRow.font = { bold: true };
			hourlyHeaderRow.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFE6FFFA" },
			};

			for (let hour = 0; hour < 24; hour++) {
				const count = hourlyVisits[hour] || 0;
				const timePeriod = hour < 12 ? "AM" : "PM";
				const displayHour =
					hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
				trendsSheet.addRow([
					`${displayHour}:00 ${timePeriod}`,
					count,
					hour < 6
						? "Early Morning"
						: hour < 12
						? "Morning"
						: hour < 18
						? "Afternoon"
						: "Evening",
				]);
			}

			// Style all analytics sheets
			[analyticsSheet, trendsSheet].forEach((sheet) => {
				sheet.columns.forEach((column, index) => {
					if (index === 0) column.width = 25;
					else if (index === 1) column.width = 15;
					else column.width = 20;
				});
			});

			// Generate filename with timestamp
			const timestamp = now
				.toISOString()
				.replace(/[:.]/g, "-")
				.slice(0, 19);
			const reportFileName = `OCPL-Comprehensive-Report-${reportType}-${timestamp}.xlsx`;
			const reportFilePath = path.join(preferredDir, reportFileName);

			await reportWorkbook.xlsx.writeFile(reportFilePath);

			return {
				success: true,
				message: `Comprehensive report generated successfully: ${reportFileName}`,
				filePath: reportFilePath,
				recordCount: filteredData.length,
				statistics: {
					dailyAverage: parseFloat(dailyAverage),
					peakDay: peakDay[0],
					peakDayVisits: peakDay[1],
					peakHour: `${peakHour[0]}:00`,
					peakHourVisits: peakHour[1],
					demographics: {
						gender: genderStats,
						ageGroups: ageGroups,
						purposes: purposeStats,
					},
				},
			};
		} catch (error) {
			console.error("Error generating report:", error);
			return { success: false, error: error.message };
		}
	}
);

ipcMain.handle("export-data", async (event, exportOptions = {}) => {
	try {
		const preferredDir = path.join(os.homedir(), "Documents");
		const dataFilePath = path.join(preferredDir, "OCPL-log.xlsx");

		if (!fs.existsSync(dataFilePath)) {
			return {
				success: false,
				error: "No data file found to export.",
			};
		}

		// Read existing data
		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile(dataFilePath);
		const worksheet = workbook.getWorksheet("Logs");

		if (!worksheet) {
			return { success: false, error: "No logs worksheet found." };
		}

		const now = new Date();
		const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);

		// Create export workbook with all data
		const exportWorkbook = new ExcelJS.Workbook();
		exportWorkbook.creator = "OCPL Logging System - Data Export";
		exportWorkbook.company = "Olongapo City Public Library";
		exportWorkbook.created = now;

		// Copy the original data
		const exportSheet = exportWorkbook.addWorksheet("Complete Data Export");

		// Copy header
		const headerRow = worksheet.getRow(1);
		exportSheet.addRow(headerRow.values);
		exportSheet.getRow(1).font = {
			bold: true,
			color: { argb: "FFFFFFFF" },
		};
		exportSheet.getRow(1).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FF0F766E" },
		};

		// Copy all data rows
		for (let i = 2; i <= worksheet.rowCount; i++) {
			const row = worksheet.getRow(i);
			if (
				row.values &&
				row.values.some((val) => val !== null && val !== undefined)
			) {
				exportSheet.addRow(row.values);
			}
		}

		// Auto-size columns
		exportSheet.columns.forEach((column) => {
			let maxLength = 0;
			column.eachCell({ includeEmpty: true }, (cell) => {
				const columnLength = cell.value
					? cell.value.toString().length
					: 10;
				if (columnLength > maxLength) {
					maxLength = columnLength;
				}
			});
			column.width = Math.min(Math.max(maxLength + 2, 12), 50);
		});

		// Create metadata sheet
		const metadataSheet = exportWorkbook.addWorksheet("Export Information");
		metadataSheet.addRow(["OCPL Data Export Information"]);
		metadataSheet.addRow(["Export Date:", now.toLocaleString("en-PH")]);
		metadataSheet.addRow(["Total Records:", exportSheet.rowCount - 1]);
		metadataSheet.addRow(["Export Type:", "Complete Database Backup"]);
		metadataSheet.addRow(["System Version:", "1.0.0"]);
		metadataSheet.addRow([]);
		metadataSheet.addRow([
			"This file contains a complete backup of all visitor logs.",
		]);
		metadataSheet.addRow([
			"Keep this file secure and use it for data recovery if needed.",
		]);

		// Style metadata
		metadataSheet.getCell("A1").font = {
			size: 16,
			bold: true,
			color: { argb: "FF0F766E" },
		};
		metadataSheet.columns.forEach((column, index) => {
			if (index === 0) column.width = 25;
			else column.width = 40;
		});

		const exportFileName = `OCPL-Complete-Export-${timestamp}.xlsx`;
		const exportFilePath = path.join(preferredDir, exportFileName);

		await exportWorkbook.xlsx.writeFile(exportFilePath);

		return {
			success: true,
			message: `Complete data export created: ${exportFileName}`,
			filePath: exportFilePath,
			recordCount: exportSheet.rowCount - 1,
		};
	} catch (error) {
		console.error("Error exporting data:", error);
		return { success: false, error: error.message };
	}
});

ipcMain.handle("get-dashboard-stats", async (event) => {
	try {
		const preferredDir = path.join(os.homedir(), "Documents");
		const dataFilePath = path.join(preferredDir, "OCPL-log.xlsx");

		if (!fs.existsSync(dataFilePath)) {
			return {
				success: false,
				error: "No data file found.",
			};
		}

		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile(dataFilePath);
		const worksheet = workbook.getWorksheet("Logs");

		if (!worksheet) {
			return { success: false, error: "No logs worksheet found." };
		}

		const now = new Date();
		const today = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		);
		const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
		const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		const thisMonth = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			now.getDate()
		);

		let totalVisitors = 0;
		let todayVisitors = 0;
		let yesterdayVisitors = 0;
		let thisWeekVisitors = 0;
		let thisMonthVisitors = 0;

		const genderStats = {};
		const purposeStats = {};
		const recentVisitors = [];

		// Process all rows
		for (let i = 2; i <= worksheet.rowCount; i++) {
			const row = worksheet.getRow(i);
			if (row.values && row.values[1]) {
				const timestamp = new Date(row.values[1]);
				const visitor = {
					timestamp: row.values[1],
					fullname: row.values[2],
					gender: row.values[3],
					age: row.values[4],
					purpose: row.values[8],
				};

				totalVisitors++;

				if (timestamp >= today) todayVisitors++;
				if (timestamp >= yesterday && timestamp < today)
					yesterdayVisitors++;
				if (timestamp >= thisWeek) thisWeekVisitors++;
				if (timestamp >= thisMonth) thisMonthVisitors++;

				// Gender stats
				genderStats[visitor.gender] =
					(genderStats[visitor.gender] || 0) + 1;

				// Purpose stats
				purposeStats[visitor.purpose] =
					(purposeStats[visitor.purpose] || 0) + 1;

				// Recent visitors (last 10)
				recentVisitors.push(visitor);
			}
		}

		// Sort recent visitors by timestamp (newest first)
		recentVisitors.sort(
			(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
		);

		return {
			success: true,
			stats: {
				totalVisitors,
				todayVisitors,
				yesterdayVisitors,
				thisWeekVisitors,
				thisMonthVisitors,
				genderStats,
				purposeStats,
				recentVisitors: recentVisitors.slice(0, 10),
			},
		};
	} catch (error) {
		console.error("Error getting dashboard stats:", error);
		return { success: false, error: error.message };
	}
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	saveToExcel: (data) => ipcRenderer.invoke("save-to-excel", data),
	generateReport: (reportType, customStartDate, customEndDate) =>
		ipcRenderer.invoke(
			"generate-report",
			reportType,
			customStartDate,
			customEndDate
		),
	exportData: (exportOptions) =>
		ipcRenderer.invoke("export-data", exportOptions),
	getDashboardStats: () => ipcRenderer.invoke("get-dashboard-stats"),
});

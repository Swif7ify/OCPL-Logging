const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	saveToExcel: (data) => ipcRenderer.invoke("save-to-excel", data),
});

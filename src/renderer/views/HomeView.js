export const HomeView = {
	render() {
		return `
            <div class="container">
                <h1>OCPL Logging - Home</h1>
                <p>Welcome to the OCPL Logging application</p>
                <button onclick="router.navigate('logs')">View Logs</button>
                <button onclick="router.navigate('settings')">Settings</button>
            </div>
        `;
	},
};

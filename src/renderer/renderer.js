import { Router } from "./router/index.js";
import { HomeView } from "./views/HomeView.js";

const routes = {
	home: HomeView,
};

window.router = new Router(routes);

document.addEventListener("DOMContentLoaded", () => {
	const app = document.getElementById("app");
	app.innerHTML = HomeView.render();
	HomeView.mount(); 
});

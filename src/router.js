import { createRouter , createWebHistory } from "vue-router"
import Home from "./views/page/Home.vue"

// ADMIN
// import AdminHome from "./admin/AdminHome.vue"


const router = createRouter({ 
	history : createWebHistory("/"),
	routes : [
		{
			path: "/",
			name: "Home",
			component: Home
		} ,
	]
})

export default router
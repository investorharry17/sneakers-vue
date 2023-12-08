import { createRouter , createWebHistory } from "vue-router"
import Home from "./views/page/Home.vue"
import Categories from "./views/page/Categories.vue"
import SubCategories from "./views/page/SubCategories.vue"
import ErrorComponent from "./views/page/ErrorComponent.vue"

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
		{
			path: "/categories",
			name: "Categories",
			component: Categories
		} ,
		{
			path: "/subcategories",
			name: "Subcategories",
			component: SubCategories
		} ,
		{
			path: "/:catchall(.*)*",
			name: "404",
			component: ErrorComponent
		}
	]
})

export default router
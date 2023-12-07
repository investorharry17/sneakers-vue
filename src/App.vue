<script setup>
	import "@/assets/css/main.css"
	import Aside from "@/Views/generic/Aside.vue"
	import Header from "@/Views/generic/Header.vue"
	import Footer from '@/views/generic/Footer.vue'
	import { RouterView, useRouter } from "vue-router"

</script>

<template>
	<Aside />
    <main class="main-wrap">
   		<div class="screen-overlay"></div>
   		<Header />
  		<RouterView />
  		<Footer /> 
	</main>

</template>

<style scoped>
 
</style>

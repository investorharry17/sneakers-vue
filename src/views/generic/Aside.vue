<script setup>
    import { reactive } from "vue"
    import { RouterLink } from "vue-router"
    const dropdownStates = reactive({
        categories : false
    })
</script>
<template>
            <aside class="navbar-aside" id="offcanvas_aside">
            <div class="aside-top">
                <RouterLink to="/" class="brand-wrap">
                    <img src="https://res.cloudinary.com/djp2xd5rl/image/upload/v1699784268/da-net7/hefi0ey2dxsir0kvzuba.png" class="logo" alt="Nest Dashboard" />
                </RouterLink>
                <div>
                    <button class="btn btn-icon btn-aside-minimize"><i class="text-muted material-icons md-menu_open"></i></button>
                </div>
            </div>
            <nav>
                <ul class="menu-aside">
                    <li class="menu-item">
                        <RouterLink class="menu-link" to="/">
                            <i class="icon material-icons md-home"></i>
                            <span class="text">Dashboard</span>
                        </RouterLink>
                    </li> 
                    <li @click.prevent=" dropdownStates.categories = !dropdownStates.categories " class="menu-item has-submenu" :class=" { active: dropdownStates.categories} "> 
                        <a class="menu-link" href="#">
                            <i class="icon material-icons md-person"></i>
                            <span class="text">Categories</span>
                        </a>
                        <div class="submenu">
                            <RouterLink to="/categories">Main Categories</RouterLink>
                            <RouterLink to="/subcategories">Sub Categories</RouterLink> 
                        </div>
                    </li>
                    <li class="menu-item">
                        <a class="menu-link" href="page-reviews.html">
                            <i class="icon material-icons md-comment"></i>
                            <span class="text">Advert Banners</span>
                        </a>
                    </li> 
                    <li class="menu-item">
                        <a class="menu-link" disabled href="#">
                            <i class="icon material-icons md-pie_chart"></i>
                            <span class="text">Posts</span>
                        </a>
                    </li>
                </ul>
                <hr />
                <ul class="menu-aside">
                    <li class="menu-item has-submenu">
                        <a class="menu-link" href="#">
                            <i class="icon material-icons md-settings"></i>
                            <span class="text">Settings</span>
                        </a>
                        <div class="submenu">
                            <a href="page-settings-1.html">Setting sample 1</a>
                            <a href="page-settings-2.html">Setting sample 2</a>
                        </div>
                    </li>
                    <li class="menu-item">
                        <a class="menu-link" href="page-blank.html">
                            <i class="icon material-icons md-local_offer"></i>
                            <span class="text"> Starter page </span>
                        </a>
                    </li>
                </ul>
                <br />
                <br />
            </nav>
        </aside>
</template>
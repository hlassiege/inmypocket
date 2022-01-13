<template>
    <div class="row">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-4">Calcul des revenus</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <router-link class="nav-link text-white" to="/sasu">SASU</router-link>
                </li>
                <li>
                    <router-link class="nav-link text-white " to="/eurl">EURL</router-link>
                </li>
                <li>
                    <router-link class="nav-link text-white" to="/portage">Portage Salarial</router-link>
                </li>
                <li>
                    <router-link class="nav-link text-white" to="/micro">Auto/Micro Entreprise</router-link>
                </li>
                <li>
                    <router-link class="nav-link text-white" to="/employee">Salariat</router-link>
                </li>
            </ul>
            <hr>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar"
    };
</script>
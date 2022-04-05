<template>
    <main>
        <div class="container-fluid content">
            <div class="row">
                <div class="col-2">
                    <div class="row">
                        <div class="d-flex flex-column flex-shrink-0 p-3 " style="width: 280px;">
                                <span class="fs-4">Calcul des revenus</span>
                            <hr>
                            <ul class="nav nav-pills flex-column mb-auto">
                                <li class="nav-item">
                                    <router-link class="nav-link text-dark" to="/sasu">SASU</router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link  text-dark" to="/eurl">EURL</router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link text-dark" to="/portage">Portage Salarial</router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link text-dark" to="/micro">Auto/Micro Entreprise</router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link text-dark" to="/employee">Salariat</router-link>
                                </li>
                            </ul>
                            <hr>
                            <span class="text-center">
                                <img src="https://visitor-badge.laobi.icu/badge?page_id=hlassiege.inmypocket" alt="visitor badge" style="height:20px; width:67px">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-10">
                    <slot>

                    </slot>
                </div>
            </div>

        </div>
    </main>


</template>

<script>
    export default {
        name: "Sidebar"
    };
</script>
<style>
    a.active {
        color : #fff !important;
    }


</style>

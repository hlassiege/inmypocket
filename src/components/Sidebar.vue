<template>
    <div class="row">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-4">Calcul des revenus</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a href="/sasu" class="nav-link active" aria-current="page">
                        SASU
                    </a>
                </li>
                <li>
                    <a href="/eurl" class="nav-link text-white">
                        EURL
                    </a>
                </li>
                <li>
                    <a href="/portage" class="nav-link text-white">
                        Portage Salarial
                    </a>
                </li>
                <li>
                    <a href="/micro" class="nav-link text-white">
                        Auto/Micro Entreprise
                    </a>
                </li>
                <li>
                    <a href="/employee" class="nav-link text-white">
                        Salariat
                    </a>
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
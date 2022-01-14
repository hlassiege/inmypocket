<template>
    <footer class="text-center text-white mt-5">
        <!-- Grid container -->
        <div class="container pt-4 ">
            <!-- Section: Social media -->
            <section class="mb-4">

                <!-- Twitter -->
                <a
                        class="btn btn-link btn-floating btn-lg text-white m-1"
                        href="https://twitter.com/hugolassiege"
                        role="button"
                        data-mdb-ripple-color="dark"
                ><i class="bi-twitter"></i
                ></a>

                <!-- Linkedin -->
                <a
                        class="btn btn-link btn-floating btn-lg text-white m-1"
                        href="https://www.linkedin.com/in/hugolassiege/"
                        role="button"
                        data-mdb-ripple-color="dark"
                ><i class="bi-linkedin"></i
                ></a>
                <!-- Github -->
                <a
                        class="btn btn-link btn-floating btn-lg text-white m-1"
                        href="https://github.com/hlassiege"
                        role="button"
                        data-mdb-ripple-color="dark"
                ><i class="bi-github"></i
                ></a>
                <!-- Github -->
                <a
                        class="btn btn-link btn-floating btn-lg text-white m-1"
                        href="https://www.malt.fr/profile/hlassiege"
                        role="button"
                        data-mdb-ripple-color="dark"
                ><img class="malt-icon" src="https://dam.malt.com/brand/malt_logo_white-resize"></a>
            </section>
            <!-- Section: Social media -->
        </div>
        <!-- Grid container -->

        <!-- Copyright -->
        <div class="text-center text-white p-3">
            © {{ currentDate }} Copyright:
            <a class="text-white" href="https://www.eventuallycoding.com/">Eventuallycoding.com</a>
        </div>
        <!-- Copyright -->
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        computed: {
            currentDate() {
                return /\d{4}/.exec(Date())[0];
            }
        }
    };
</script>

<style>
    footer {
        background-color: #27363b;
        flex-shrink: 0;
    }
    .malt-icon {
        width: 25px;
        margin-left : -7px;
        margin-top : -4px;
    }
</style>
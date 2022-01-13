<template>
    <footer class="text-center text-white mt-5" style="background-color: #f1f1f1;">
        <!-- Grid container -->
        <div class="container pt-4">
            <!-- Section: Social media -->
            <section class="mb-4">

                <!-- Twitter -->
                <a
                        class="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="https://twitter.com/hugolassiege"
                        role="button"
                        data-mdb-ripple-color="dark"
                ><i class="bi-twitter"></i
                ></a>

                <!-- Linkedin -->
                <a
                        class="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="https://www.linkedin.com/in/hugolassiege/"
                        role="button"
                        data-mdb-ripple-color="dark"
                ><i class="bi-linkedin"></i
                ></a>
                <!-- Github -->
                <a
                        class="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="https://github.com/hlassiege"
                        role="button"
                        data-mdb-ripple-color="dark"
                ><i class="bi-github"></i
                ></a>
            </section>
            <!-- Section: Social media -->
        </div>
        <!-- Grid container -->

        <!-- Copyright -->
        <div class="text-center text-dark p-3">
            © {{ currentDate }} Copyright:
            <a class="text-dark" href="https://www.eventuallycoding.com/">Eventuallycoding.com</a>
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
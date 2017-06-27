<template>
    <div class="wrapper">
       <sidebar></sidebar>
        <div class="main-panel">
            <_header></_header>
            <div class="content">
               <router-view></router-view>
            </div>
            <_footer></_footer>
        </div>
    </div>
</template>

<script>
    import sidebar from './sidebar.vue'
    import _header from './header.vue'
    import _footer from './footer.vue'
    export default {
        components:{
            sidebar,
            _header,
            _footer
        }
    }
</script>

<style scoped>

</style>
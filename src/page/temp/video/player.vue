<template>
    <div>
        <router-link to="/player/p1">1</router-link>
        <router-link to="/player/p2">2</router-link>
        <router-link to="/player/p3">3</router-link>
        <router-link to="/player/p4">4</router-link>
        <router-link to="/player/p5">5</router-link>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                a: 'a'
            }
        }
    }
</script>

<style scoped>

</style>
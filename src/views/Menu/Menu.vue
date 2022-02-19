<template>
    <div id="login-index">
        <h1>Mensaje 1</h1>
        <h2>{{ subtitulo }}</h2>
    </div>
</template>

<script>
export default {
    name: 'LoginIndex',
    data () {
        return {
            subtitulo: "Este es un mensaje"
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
<template>
    <div id="Menu" class="body-background" >
        <h1 class="display-4 text-center">Menu</h1>
        <hr>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="card mt-4">
                    <div class="card-body">

                        <div class="d-flex justify-content-center row p-1">
                            <button class="btn-primary btn-lg" @click="redirect(`persons`)">
                                <i class="fa-solid fa-plus"></i>
                                <i class="fa-solid fa-pencil"></i>
                                <i class="fa-solid fa-trash-can"></i>
                                CRUD Personas
                            </button>
                        </div>
                        <div class="d-flex justify-content-center row p-1">
                            <button class="btn-warning btn-lg" @click="redirect(`exercises`)">
                                <i class="fa-solid fa-list-ol"></i>
                                Ejercicios
                            </button>
                        </div>
                        <div class="d-flex justify-content-center row p-1">
                            <button class="btn-danger btn-lg" @click="redirect(`binary_tree`)">
                                <i class="fa-solid fa-tree"></i>
                                Arbol Binario
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuMain',
    data () {
        return {
            subtitulo: "Este es un mensaje"
        }
    },
    methods: {
        redirect (value) {
            window.location.href = `/${value}`
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
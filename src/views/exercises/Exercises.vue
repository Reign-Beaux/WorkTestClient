<template>
    <div id="Exercises" class="body-background">
        <h1 class="display-4 text-center">Ejercicios</h1>
        <hr>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="row p-1">
                            <div>
                                <button class="btn-success btn-sm btn-index"
                                        @click="back">
                                    <i class="fa-solid fa-left-long"></i>
                                    Atras
                                </button>
                            </div>
                        </div>
                        <div class="row p-1">

                            <div class="col-sm">
                                <label for="baseFactorial" class="form-label">Base</label>
                                <input v-model="factorial.base" type="number" class="form-control" id="baseFactorial">
                            </div>
                            <div class="col-sm d-flex justify-content-center">
                                <button class="btn-primary btn-sm" style="margin-top: 35px"
                                        @click="runFactorial">
                                    <i class="fa-solid fa-calculator"></i>
                                    Calcular Factorial
                                </button>
                            </div>
                            <div class="col-sm">
                                <label for="componentResultadoFactorial" class="form-label">Resultado</label>
                                <input v-model="factorial.result" type="number" class="form-control" id="componentResultadoFactorial"
                                       readonly>
                            </div>

                        </div>
                        <div class="row p-1">

                            <div class="col-2">
                                <label for="basePotencia" class="form-label">Base</label>
                                <input v-model="potencia.base" type="number" class="form-control" id="basePotencia">
                            </div>
                            <div class="col-2">
                                <label for="potencia" class="form-label">Potencia</label>
                                <input v-model="potencia.potencia" type="number" class="form-control" id="potencia">
                            </div>
                            <div class="col-sm d-flex justify-content-center">
                                <button class="btn-primary btn-sm" style="margin-top: 35px"
                                        @click="runPotencia">
                                    <i class="fa-solid fa-calculator"></i>
                                    Calcular Potencia
                                </button>
                            </div>
                            <div class="col-sm">
                                <label for="potenciaResult" class="form-label">Resultado</label>
                                <input v-model="potencia.result" type="number" class="form-control" id="potenciaResult"
                                       readonly>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
export default {
name: 'ExercisesRecursive',
data() {
    return {
        factorial: {
            base: 0,
            result: 0
        },
        potencia: {
            base: 0,
            potencia: 0,
            result: 0
        }
    }
},
methods: {
    back () {
        window.location.href = `/`
    },
    async runFactorial () {
        let res = await axios.get(`https://localhost:7078/api/persons/factorial?baseFactorial=${this.factorial.base}`)
        this.factorial.result = res.data.result
    },
    async runPotencia () {
        let res = await axios.get(`https://localhost:7078/api/persons/potencia?x=${this.potencia.base}&y=${this.potencia.potencia}`)
        this.potencia.result = res.data.result
    }
}
}
</script>

<style lang="scss" scoped>

</style>
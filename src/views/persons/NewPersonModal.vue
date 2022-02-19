<template>
    <div id="NewPersonModal" v-if="show">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        
                        <div class="modal-header">
                            <slot name="header"> {{title}} </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body">
                                <div class="col-12">
                                    <span>Nombre:</span>
                                    <input v-model="person.Nombre" type="text" class="form-control">
                                </div>
                                <div class="col-12">
                                    <span>Edad:</span>
                                    <input v-model="person.Edad" type="number" class="form-control">
                                </div>
                                <div class="col-12">
                                    <span>Fecha de Nacimiento:</span>
                                    <input v-model="person.FechaNacimiento" type="date" class="form-control">
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="btn-primary btn-sm modal-btn-footer" @click="close">
                                    <i class="fa-solid fa-floppy-disk"></i>
                                    Guardar
                                </button>
                                <button class="btn-danger btn-sm modal-btn-footer" @click="close">
                                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                    Salir
                                </button>
                            </slot>
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
    name: `NewPersonModal`,
    props: {
        show: Boolean,
        title: String,
        person_id: Number
    },
    data() {
        return {
            person: {
                Nombre: null,
                Edad: null,
                FechaNacimiento: null
            }
        }
    },
    methods: {
        close () {
            this.$emit(`close`)
        },
        getDefault () {
            this.person.Nombre = null
            this.person.Edad = null
            this.person.FechaNacimiento = null
        },
        async getPerson () {
            let res = await axios.get(`https://localhost:7078/api/persons/${this.person_id}`)
            console.log(res.data)
        },
        savePerson () {
            console.log("Holi<<<")
        }
    },
    watch: {
        show () {
            if (!this.show) return

            if (this.person_id === null) this.getDefault()
            else this.getPerson()
        }
    }
}
</script>
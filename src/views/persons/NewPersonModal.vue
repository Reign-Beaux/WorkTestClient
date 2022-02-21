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
                                    <label for="componentName" class="form-label">Nombre</label>
                                    <input v-model="person.nombre" type="text" class="form-control" id="componentName">
                                </div>
                                <div class="col-12">
                                    <label for="componentEdad" class="form-label">Edad</label>
                                    <input v-model="person.edad" type="number" class="form-control" id="componentEdad">
                                </div>
                                <div class="col-12">
                                    <label for="componentFNacimiento" class="form-label">Fecha de Nacimiento</label>
                                    <input v-model="person.fechaNacimiento" type="date" class="form-control" id="componentFNacimiento">
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="btn-primary btn-sm modal-btn-footer"
                                    @click="savePerson" :disabled="saving">
                                    <i class="fa-solid fa-floppy-disk"></i>
                                    Guardar
                                </button>
                                <button class="btn-danger btn-sm modal-btn-footer"
                                    @click="close" :disabled="saving">
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
    personId: Number
},
data() {
    return {
        saving: false,
        person: {
            nombre: null,
            edad: null,
            fechaNacimiento: null
        }
    }
},
methods: {
    close () {
        this.$emit(`close`)
    },
    getDefault () {
        this.person.nombre = null
        this.person.edad = null
        this.person.fechaNacimiento = null
    },
    async getPerson () {
        try {
            let res = await axios.get(`https://localhost:7078/api/persons/${this.personId}`)
            this.person = res.data
            var m = new Date(new Date(res.data.fechaNacimiento));
            let month = (m.getUTCMonth()+1) < 10 ? `0${(m.getUTCMonth()+1)}` : (m.getUTCMonth()+1)
            let day = m.getUTCDate() < 10 ? `0${m.getUTCDate()}` : m.getUTCDate()
            this.person.fechaNacimiento = m.getUTCFullYear() + "-" + month + "-" + day
        } catch (err) {
            alert(err.response.data.title)
            this.$emit(`getPersons`)
            this.close()
        }
    },
    async savePerson () {       
        if (this.saving) return
        
        let url = {}
        if (this.personId === null) {
            url = {
                method: 'POST',
                url: `https://localhost:7078/api/persons/`,
                data: this.person
            }
        } else {
            url = {
                method: 'PUT',
                url: `https://localhost:7078/api/persons/${this.personId}`,
                data: this.person
            }
        }

        try {
            console.log(url)
            await axios(url)
            alert("Proceso Exitoso")
            this.$emit(`getPersons`)
            this.close()
        } catch (error) {
            console.log(error.response)
        } finally {
            this.saving = false
        }
    }
},
watch: {
    show () {
        if (!this.show) return
        if ([null, undefined].includes(this.personId)) this.getDefault()
        else this.getPerson()
    }
}
}
</script>
<template>
    <div id="HistoricPersonModal" v-if="show">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        
                        <div class="modal-header">
                            <slot name="header"> {{title}} </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body">

                                <div class="row p-1">
                                    <table class="table table-bordered table-sm table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col" v-for="item in headers" :key="item">
                                                    {{ item }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="person in historic" :key="person.Id"
                                                @click="setCurrentId(person.id)">
                                                <td>{{formatDate(person.fechaCambio)}}</td>
                                                <td>{{person.nombre}}</td>
                                                <td>{{person.edad}}</td>
                                                <td>{{formatDate(person.fechaNacimiento)}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="btn-primary btn-sm modal-btn-footer"
                                    @click="restorePerson" :disabled="saving">
                                    <i class="fa-solid fa-rotate-left"></i>
                                    Restaurar
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
name: `HistoricPersonModal`,
props: {
    show: Boolean,
    title: String,
    personId: Number
},
data() {
    return {
        saving: false,
        currentHistoricId: null,
        headers: [
            "Fecha Cambio",
            "Nombre",
            "Edad",
            "Fecha de Nacimiento"
        ],
        historic: []
    }
},
methods: {
    close () {
        this.$emit(`close`)
    },
    async getHistoric () {
        let res = await axios.get(`https://localhost:7078/api/historic_persons/${this.personId}`)
        this.historic = res.data
    },
    setCurrentId(id) {
        this.currentHistoricId = id
    },
    async restorePerson () {
        if (this.saving) return
        
        try {
            await axios.put(`https://localhost:7078/api/historic_persons/${this.currentHistoricId}`, {})
            alert("Proceso Exitoso")
            this.$emit(`getPersons`)
            this.close()
        } catch (error) {
            console.log(error.response)
        } finally {
            this.saving = false
        }
    },
    formatDate (value) {
        return value.split('T')[0]
    }
},
watch: {
    show () {
        if (!this.show) return
        
        this.getHistoric()
    }
}
}
</script>
<template>
    <div id="Persons" class="body-background">
        <h1 class="display-4 text-center">Personas</h1>
        <hr>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-end row p-1">
                            <button class="btn-primary btn-sm btn-index"
                                @click="createPerson">
                                <i class="fa-solid fa-plus"></i>
                                Crear
                            </button>
                            <button class="btn-warning btn-sm btn-index"
                                @click="updatePerson">
                                <i class="fa-solid fa-pencil"></i>
                                Editar
                            </button>
                            <button class="btn-danger btn-sm btn-index"
                                @click="deletePerson">
                                <i class="fa-solid fa-trash-can"></i>
                                Eliminar
                            </button>
                        </div>
                        <div class="row g-2 p-1">
                            <div class="col-3">
                                <input v-model="filters.Nombre_cont" type="text" class="form-control" placeholder="Nombre" aria-describedby="basic-addon1">
                            </div>
                            <div class="col-3">
                                <!-- <input type="text" class="form-control" placeholder="Edad" aria-describedby="basic-addon1"> -->
                            </div>
                            <div class="col-3">
                                <!-- <input type="text" class="form-control" placeholder="Fecha de Nacimiento" aria-describedby="basic-addon1"> -->
                            </div>
                            <div class="d-grid gap-4 col-3 mx-auto">
                                <button class="btn-success btn-sm" @click="getPersons">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    Buscar
                                </button>
                            </div>
                        </div>
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
                                    <tr v-for="person in persons" :key="person.Id"
                                        @click="setCurrentId(person.id)">
                                        <td>{{person.nombre}}</td>
                                        <td>{{person.edad}}</td>
                                        <td>{{person.fechaNacimiento}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NewPersonModal
            :show="showPersonModal"
            :title="title"
            :personId="personId"
            @close="showPersonModal = false"
            @getPersons="getPersons" />
    </div>
</template>
<script>
import axios from 'axios'
import NewPersonModal from './NewPersonModal.vue'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
export default {
name: 'PersonsCRUD',
data()
{
    return {
        personId: null,
        showPersonModal: false,
        title: "",
        persons: [],
        currentId: null,
        filters: {
            Nombre_cont: ""
        },
        headers: [
            "Nombre",
            "Edad",
            "Fecha de Nacimiento"
        ]
    }
},
components: {
    NewPersonModal
},
methods: {
    async getPersons () {
        let res = await axios.get(`https://localhost:7078/api/persons`)
        this.persons = res.data
    },
    setCurrentId(id) {
        this.currentId = id
    },
    createPerson () {
        this.personId = null
        this.showPersonModal = true
        this.title = "Crear Nueva Persona"
    },
    updatePerson () {
        if (this.checkSelected()) return

        this.personId = this.currentId
        this.showPersonModal = true
        this.title = "Crear Nueva Persona"            
    },
    async deletePerson () {
        if (this.checkSelected()) return
        try {
            await axios.delete(`https://localhost:7078/api/persons/${this.currentId}`)
            alert("Proceso Exitoso")
        } catch (error) {
            console.log(error.response)
        }
        this.getPersons()
    },
    checkSelected () {
        if (![null, undefined].includes(this.currentId)) return false

        alert("Nada Seleccionado")
        return true
    }
},
mounted () {
    this.getPersons()
}
}
</script>
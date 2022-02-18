<template>
    <div class="body-background">
        <h1 class="display-4 text-center">Personas</h1>
        <hr>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-end row p-1">
                            <button class="btn-primary btn-sm btn-index"
                                @click="newPerson">
                                <i class="fa-solid fa-plus"></i>
                                Crear
                            </button>
                            <button class="btn-warning btn-sm btn-index">
                                <i class="fa-solid fa-pencil"></i>
                                Editar
                            </button>
                            <button class="btn-danger btn-sm btn-index">
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
                                        @click="setCurrentRow(person)">
                                        <td>{{person.Nombre}}</td>
                                        <td>{{person.Edad}}</td>
                                        <td>{{person.FechaNacimiento}}</td>
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
            :person_id="person_id"
            @close="showPersonModal = false" />
    </div>
</template>
<script>
import NewPersonModal from './NewPersonModal.vue'
export default {
    name: 'indexPerson',
    data()
    {
        return {
            person_id: null,
            showPersonModal: false,
            title: "",
            persons: [],
            currentRow: {},
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
        getPersons () {
            this.persons = [
                {
                    Id: 1,
                    Nombre: "Saúl Antonio",
                    Edad: 30,
                    FechaNacimiento: "1992-30-01"
                },
                {
                    Id: 2,
                    Nombre: "Brenda",
                    Edad: 26,
                    FechaNacimiento: "1996-02-23"
                }
            ]
        },
        setCurrentRow(row) {
            this.currentRow = row
        },
        newPerson () {
            this.person_id = null
            this.showPersonModal = true
            this.title = "Crear Nueva Persona"
        }
    },
    mounted () {
        this.getPersons()
    }
}
</script>
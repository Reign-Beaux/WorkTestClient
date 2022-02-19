import * as Vue from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Persons from './views/persons/Index.vue'

const routes = [
    { path: '/persons', component: Persons, name: 'persons' }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
const app = Vue.createApp(App)

app.use(router)
app.mount('#app')

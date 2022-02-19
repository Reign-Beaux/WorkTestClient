import * as Vue from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Menu from './views/Menu/Menu.vue'
import Persons from './views/persons/Persons.vue'

const routes = [
    { path: '/', component: Menu, name: 'menu' },
    { path: '/persons', component: Persons, name: 'persons' }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
const app = Vue.createApp(App)

app.use(router)
app.mount('#app')

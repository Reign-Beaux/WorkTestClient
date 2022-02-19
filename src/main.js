import * as Vue from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Menu from './views/menu/Menu.vue'
import Persons from './views/persons/Persons.vue'
import Exercises from './views/exercises/Exercises.vue'
import BinaryTree from './views/binary_tree/BinaryTree.vue'

const routes = [
    { path: '/', component: Menu, name: 'menu' },
    { path: '/persons', component: Persons, name: 'persons' },
    { path: '/exercises', component: Exercises, name: 'exercises' },
    { path: '/binary_tree', component: BinaryTree, name: 'binary_tree' }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
const app = Vue.createApp(App)

app.use(router)
app.mount('#app')

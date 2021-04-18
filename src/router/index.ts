import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/books",
    name: "books",
    component: () => import("../components/booksList.vue")
  },
  {
    path: "/books/:id",
    name: "book-details",
    component: () => import("../components/book.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/AddBook.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

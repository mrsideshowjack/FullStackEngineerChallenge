import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "admin",
    component: function() {
      return import(/* webpackChunkName: "admin" */ "../views/admin.vue");
    }
  },
  {
    path: "/employee",
    name: "employee",
    component: function() {
      return import(/* webpackChunkName: "employee" */ "../views/employee.vue");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

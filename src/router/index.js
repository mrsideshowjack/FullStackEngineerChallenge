import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home
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
    name: "selectEmployee",
    component: function() {
      return import(
        /* webpackChunkName: "selectEmployee" */ "../views/selectEmployee.vue"
      );
    }
  },
  {
    path: "/employee/:id",
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

import { RouteConfig } from "vue-router";
const item = {
  path: "/admin/workshops",
  name: "Workshops",
  component: () => import("../views/base.vue"),
  children: [
    {
      path: "",
      component: () => import("../views/admin/workshops/list.vue"),
    },
    {
      path: "add",
      component: () => import("../views/admin/workshops/add.vue")
    },
    {
      path: "edit/:id",
      component: () => import("../views/admin/workshops/edit.vue")
    },
    {
      path: "details/:id",
      component: () => import("../views/admin/workshops/details.vue")
    }
  ],
} as RouteConfig;

export default item;
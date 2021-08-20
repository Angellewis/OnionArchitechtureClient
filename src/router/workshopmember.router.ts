import { RouteConfig } from "vue-router";
const item = {
  path: "/admin/workshopmembers",
  name:"Workshopmembers",
  component: () => import("../views/base.vue"),
  children: [
    {
      path: "",
      component: () => import("../views/admin/workshopmembers/list.vue"),
    },
    {
      path: "add",
      component: () => import("../views/admin/workshopmembers/add.vue")
    },
    {
      path: "directadd/:id",
      component: () => import("../views/admin/workshopmembers/add.vue")
    },
    {
      path: "edit/:id",
      component: () => import("../views/admin/workshopmembers/edit.vue")
    }
  ],
} as RouteConfig;

export default item;
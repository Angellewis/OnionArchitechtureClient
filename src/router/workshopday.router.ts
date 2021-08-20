import { RouteConfig } from "vue-router";
const item = {
  path: "/admin/workshopdays",
  name:"Workshopdays",
  component: () => import("../views/base.vue"),
  children: [
    {
      path: "",
      component: () => import("../views/admin/workshopdays/list.vue"),
    },
    {
      path: "add",
      component: () => import("../views/admin/workshopdays/add.vue")
    },
    {
        path: "edit/:id",
        component: () => import("../views/admin/workshopdays/edit.vue")
    }
  ],
} as RouteConfig;

export default item;
import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/Home.vue";
import ContactList from "./components/ExampleComponent.vue";

const routes = [
    { path: "/:id", component: Home },
    {
        path: "/contacts",
        component: ContactList,
        // beforeEnter: (to, from, next) => {
        //     const variableValue = JSON.parse(localStorage.getItem('token'));
        //     if (variableValue) {
        //         next();
        //     } else {
        //         next("/");
        //     }
        // },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

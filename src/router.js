import { createRouter, createWebHistory } from "vue-router"; // Import necessary Vue Router functions

import RegUser from "./views/RegUser.vue";
import SelectOption from './views/SelectOption.vue'
import SocketConnect from './views/SocketConnect.vue';
import SelectLang from './views/LangSelect.vue';
import SuccessPage from './views/SuccessPage.vue';
import TestPage from './views/TestPage.vue'
// import ShowCount from './views/success.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/reg",
      component: RegUser,
    },
    {
      path: "/select",
      component: SelectOption,
    },

    {
      path: "/socket",
      component: SocketConnect,
    },

    {
      path: "/selectcheck",
      component: SelectLang,
    },


    {

      path:"/registration-success"
      ,component:SuccessPage
    },
    {

      path:"/test"
      ,component:TestPage
    }
  ],
});

export default router;

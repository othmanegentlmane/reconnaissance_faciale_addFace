import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import AddFace from '../views/AddFace.vue';
import Reconnaissance from '../views/Reconnaissance.vue';
import AppVideoRecognition from '../views/VideoRecognition.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: 'add-face',
        name: 'AddFace',
        component: AddFace,
      },
      {
        path: 'reconnaissance',
        name: 'Reconnaissance',
        component: Reconnaissance,
      },
      {
        path: 'video-reconnaissance',
        name: 'AppVideoRecognition',
        component: AppVideoRecognition,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

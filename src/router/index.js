import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LayoutLarge from '@/layouts/LayoutLarge.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: LayoutLarge,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView,
        },
        {
          path: '/produtos/adicionar',
          name: 'ProductAdd',
          component: () => import('@/views/ProductAdd.vue'),
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: '/produtos',
          name: 'Product',
          component: () => import('@/views/ProductView.vue'),

        },
        {
          path: '/categorias',
          name: 'Categorias',
          component: () => import('@/views/CategoriaView.vue'),
        },

        {
          path: '/acessorios',
          name: 'Acessorios',
          component: () => import('@/views/AcessorioView.vue'),
        },
        {
          path: '/cores',
          name: 'Cores',
          component: () => import('@/views/CoresView.vue'),
        },
        {
          path: '/marcas',
          name: 'Marcas',
          component: () => import('@/views/MarcasView.vue'),
        },
      ],
    },
  ],
});

export default router;
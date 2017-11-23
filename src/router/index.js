import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import DiamondMap from '@/components/DiamondMap';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },{
      path: '/diamondmap',
      name: 'diamondmap',
      component: DiamondMap
    }
  ]
});
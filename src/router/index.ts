import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import FollowingView from '../views/FollowingView.vue';
import SearchViewVue from '@/views/SearchView.vue';
import WriterViewVue from '@/views/WriterView.vue';
import NotificationView from '@/views/NotificationView.vue';
import MyPageView from '@/views/MyPageView.vue';
import LoginViewVue from '@/views/LoginView.vue';
import KakaoCallBackVue from '@/components/social-login/KakaoCallBack.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginViewVue,
    },
    {
      path: '/following',
      name: 'Following',
      component: FollowingView,
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchViewVue,
    },
    {
      path: '/writer',
      name: 'Writer',
      component: WriterViewVue,
    },
    {
      path: '/notification',
      name: 'Notification',
      component: NotificationView,
    },
    {
      path: '/myPage',
      name: 'MyPage',
      component: MyPageView,
    },
    {
      path: '/callback/kakaotalk',
      name: 'kakaotalk',
      component: KakaoCallBackVue,
    },
  ],
});

export default router;

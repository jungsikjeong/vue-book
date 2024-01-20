import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import FollowingView from '../views/FollowingView.vue';
import SearchView from '@/views/SearchView.vue';
import WriterView from '@/views/WriterView.vue';
import NotificationView from '@/views/NotificationView.vue';
import MyPageView from '@/views/MyPageView.vue';
import LoginViewVue from '@/views/LoginView.vue';
import KakaoCallBackVue from '@/components/social-login/KakaoCallBack.vue';
import PostDetailView from '@/views/PostDetailView.vue';

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
      component: SearchView,
    },
    {
      path: '/writer',
      name: 'Writer',
      component: WriterView,
    },

    {
      path: '/:id/post',
      name: 'Detail',
      component: PostDetailView,
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

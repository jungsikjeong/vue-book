import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import FollowingView from '../views/FollowingView.vue';
import SearchView from '@/views/SearchView.vue';
import WriterView from '@/views/WriterView.vue';
import EditPostView from '@/views/EditPostView.vue';
import NotificationView from '@/views/NotificationView.vue';
import MyPageView from '@/views/MyPageView.vue';
import LoginView from '@/views/LoginView.vue';
import KakaoCallBack from '@/components/social-login/KakaoCallBack.vue';
import PostDetailView from '@/views/PostDetailView.vue';
import UserInfoView from '@/views/UserInfoView.vue';

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
      component: LoginView,
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
      path: '/post/edit/:id',
      name: 'EditPost',
      component: EditPostView,
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
      path: '/:id/user',
      name: 'UserInfo',
      component: UserInfoView,
    },
    {
      path: '/callback/kakaotalk',
      name: 'kakaotalk',
      component: KakaoCallBack,
    },
  ],
});

export default router;

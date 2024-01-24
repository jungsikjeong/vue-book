import router from '@/router';

export const onUserRouterMove = (userId: string, user: any) => {
  if (userId === user?.uid) {
    return router.push('/myPage');
  } else {
    return router.push('/' + userId + '/user');
  }
};

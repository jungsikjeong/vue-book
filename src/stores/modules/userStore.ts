import { app } from '@/firebaseApp';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

const userStore = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state: any, user: any) {
      localStorage.setItem('user', JSON.stringify(user));

      state.user = user;
    },
  },
  actions: {
    initAuth({ commit }: any) {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          commit('setUser', user);

          resolve(user);
        });
      });
    },
  },
  getters: {
    getUser: (state: any) => {
      return state.user
        ? state.user
        : JSON.parse(localStorage.getItem('user') as any);
    },
  },
};

export default userStore;

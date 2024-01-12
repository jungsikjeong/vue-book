import { app } from '@/firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

const userStore = {
  namespaced: true,
  state: {
    user: '',
  },
  mutations: {
    setUser(state: any, user: any) {
      state.user = user;
    },
  },
  actions: {
    initAuth({ commit }: any) {
      onAuthStateChanged(auth, (user) => {
        commit('setUser', user);
      });
    },
  },
  getters: {
    getUser: (state: any) => state.user,
  },
};

export default userStore;

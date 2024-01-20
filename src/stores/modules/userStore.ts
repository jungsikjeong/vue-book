import { app, db } from '@/firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

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
    async initAuth({ commit }: any) {
      return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userRef = doc(db, 'users', user.uid);
            const oldUser = await getDoc(userRef);

            if (oldUser.exists()) {
              return commit('setUser', oldUser.data());
            }
          }

          commit('setUser', user);
          resolve();
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

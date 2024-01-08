const userStore = {
  namespaced: true,
  state: {
    userName: '도로시',
  },
  getters: {
    GE_USER_NAME: (state: any) => state.userName,
  },
  mutations: {
    MU_USER_NAME: (state: any, payload: any) => {
      state.userName = payload.userName;
    },
  },
  actions: {},
};

export default userStore;

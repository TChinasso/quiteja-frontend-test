import usersService from "@/services/usersService"
import Vue from 'vue'

export default {
  state: () => ({
    list: [],
    selected: null,
    page: null,
    total: null,
    limit: null
  }),
  mutations: {
    setList(state, payload){
      state.list = payload.data
      state.page = payload.page
      state.limit = payload.limit
      state.total = payload.total
    },
    updateUser(state, user){
      const userIndex = state.list.findIndex(item => item.id == user.id);
      if (userIndex == -1) return;
      Vue.set(state.list, userIndex, user);
    },
    deleteUser(state, user){
      const userIndex = state.list.findIndex(item => item.id == user.id);
      if (userIndex == -1) return;
      state.list.splice(userIndex, 1);
      state.total -= 1;
    },
  },
  actions: {
    async get ({ commit },params = null){
      let payload = {
        page: params?.page || 1,
        limit: params?.itemsPerPage || 10
      }
      const {data, error} = await usersService.get(payload)
      if (error) return
      commit('setList', data)
    },
    async update({commit}, payload){
      const {data, error} = await usersService.put(payload)
      if (error) return;
      commit('updateUser', data)
    },
    async delete({commit}, payload){
      const { data, error } = await usersService.delete(payload)
      if (error) return;
      commit('deleteUser', data)
    }
  },
  getters: {
    list: (state) => state.list,
    selected: (state) => state.selected,
    page: (state) => state.page,
    total: (state) => state.total,
    limit: (state) => state.limit,
  },
  namespaced: true
}
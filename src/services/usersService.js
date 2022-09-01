import { api } from '@/plugins/axios'

export default{
  get: async (params) => { 
    return api.get('user', {params: params})
  },
  put: async (payload) => { 
    return api.put(`user/${payload.id}`, payload)
  },
  delete: async (payload) => { 
    return api.delete(`user/${payload.id}`, payload)
  },
}
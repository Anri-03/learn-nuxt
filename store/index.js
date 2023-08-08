import axios from 'axios'

export const state = () => ({
    cont: [],
    contacts: [],
    loading: false
  });

export const mutations = {
   
    setAllContacts(state, contacts) {
        console.log(contacts)
        state.contacts = contacts
    },
    createNewCont(state, newCont) {
         state.cont.unshift(newCont)
    },
    setLoading(state, payload) {
        state.loading = payload
    }
}

export const getters = {
    newconts(state) {
        return state.cont
    },
    getAllContacts(state) {
        return state.contacts
    },
    getLoading(state) {
        return state.loading
    }
}

export const actions = { 
    async getAllNumbers({ commit}) {
        try {
            commit('setLoading', true)

            const url = 'https://64cf6ca4ffcda80aff51d62f.mockapi.io/phone'

            const { data } = await axios(url, {
                method: "GET"
            })
        
            
            commit('setAllContacts', data)
        } catch(e) {
            console.log(e)
        } finally {
            commit('setLoading', false)
        }
    },
    async editContact({ commit, dispatch }, { id, name, phone }) {
        try {
            commit('setLoading', true)

            const url = `https://64cf6ca4ffcda80aff51d62f.mockapi.io/phone/${id}`
            
            const body = {
                name, phone
            }

            console.log(body)
            await axios.put(url, body)

        } catch(e) {
            console.log(e)
            alert(e.message)
            commit('setLoading', false)
        } finally {
            dispatch('getAllNumbers')
        }
    },
    async addContact({ commit, dispatch }, { name, phone, createdAt }) {
        try {
            commit('setLoading', true)

            const url = 'https://64cf6ca4ffcda80aff51d62f.mockapi.io/phone'
            
            const body = {
                name, phone, createdAt
            }

            console.log(body)
            await axios.post(url, body)

        } catch(e) {
            console.log(e)
            alert(e.message)
            commit('setLoading', false)
        } finally {
            dispatch('getAllNumbers')
        }
    },
    async deleteContact({ commit, dispatch }, id ) {
        try {
            commit('setLoading', true)

            const url = `https://64cf6ca4ffcda80aff51d62f.mockapi.io/phone/${id}`

            await axios(url, {
                method: 'DELETE'
            })

        } catch(e) {
            console.log(e)
        } finally {
            dispatch('getAllNumbers')
            alert('Deleted user by id - ' + id)
        }
    }
}

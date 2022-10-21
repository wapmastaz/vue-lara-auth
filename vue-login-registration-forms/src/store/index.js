import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		errorMessage: '',
		isLoading: false,
	},
	getters: {
		errorMessage: (state) => state.errorMessage,
		isLoading: (state) => state.isLoading,
	},
	mutations: {
		setErrors(state, errors) {
			state.errorMessage = errors;
		},
		setIsLoading(state, payload) {
			state.isLoading = payload;
		},
	},
	actions: {},
	modules: {
		auth,
	},
});

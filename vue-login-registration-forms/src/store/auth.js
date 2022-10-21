import axios from 'axios';
// import { resolve } from 'core-js/fn/promise';

export default {
	namespaced: true,

	state: {
		user: null,
	},

	getters: {
		user: (state) => state.user,
	},

	mutations: {
		SET_USER(state, payload) {
			state.user = payload;
		},
	},

	actions: {
		REGISTER_USER({ commit }, payload) {
			commit('setIsLoading', true, { root: true });
			return new Promise((resolve, reject) => {
				axios
					.post('register', payload)
					.then((response) => {
						// console.log('store', res);
						commit('setIsLoading', false, { root: true });
						if (response.status == 200) {
							this._vm.$toasted.success('Registration Successful');
							localStorage.setItem('authToken', response.data.token);
							// set USER
							commit('SET_USER', response.data.user);
						}
						resolve(response);
					})
					.catch((err) => {
						reject(err);
						commit('setIsLoading', false, { root: true });

						// console.log('store', err);
					});
			});

			// .then((res) => {
			// 	commit('setIsLoading', false, { root: true });
			// 	if (res.status == 200) {
			// 		this._vm.$toasted.success('Registration Successful');
			// 		localStorage.setItem('authToken', response.data.token);
			// 		// set USER
			// 		commit('SET_USER', res.data.user);
			// 	}
			// 	// this.$toast('from success');
			// })
			// .catch((err) => {
			// 	commit('setIsLoading', false, { root: true });
			// 	console.log(err);
			// 	if (err.response.status == 422) {
			// 		const data = err.response.data.details;
			// 		for (const key in data) {
			// 			this._vm.$toasted.error(data[key][0]);
			// 		}
			// 	} else {
			// 		this._vm.$toasted.error(
			// 			'There was a problem while processing your request'
			// 		);
			// 	}
			// });
		},
	},
};

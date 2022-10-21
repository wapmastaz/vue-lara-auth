import App from './App.vue';
import vuetify from './plugins/vuetify';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import axios from 'axios';
import routes from './router/index';
import store from './store';
import Toasted from 'vue-toasted';

// SERVER BASE URL
axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

axios.interceptors.request.use((config) => {
	config.headers.common = {
		Authorization: `Bearer ${localStorage.getItem('authToken')}`,
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		Accept: 'application/json',
	};
	// return config to not block request
	return config;
});
const toastOptions = {
	duration: 5000,
};
Vue.use(Toasted, toastOptions);
Vue.use(Vuelidate);
Vue.use(VueRouter);

const router = new VueRouter({
	routes,
});

new Vue({
	vuetify,
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');

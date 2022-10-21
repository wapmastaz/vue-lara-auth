// import Vue from 'vue';
// import VueRouter from 'vue-router';
import Login from '@/views/Auth/Login';
import Register from '@/views/Auth/Register';
import Verify from '@/views/Auth/Verify';

// Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/verify',
		name: 'Verify',
		component: Verify,
		beforeEnter: (to, from, next) => {
			const token = localStorage.getItem('authToken');
			if (token) {
				next();
			} else {
				next('/');
			}
		},
	},
];

export default routes;

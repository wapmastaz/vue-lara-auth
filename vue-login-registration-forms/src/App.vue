<template>
	<v-app>
		<div class="content">
			<transition name="slide-fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</v-app>
</template>
<script>
import LoginForm from '@/views/Auth/Login.vue';
// import SignUpForm from '@/components/SignUp';
export default {
	name: 'App',
	components: { LoginForm },
	data() {
		return {
			//
		};
	},
};
</script>
<style>
.content {
	background-image: url('./assets/bg/3.jpg');
	background-position: center;
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
}

.login-form {
	width: 450px;
	overflow: hidden;
	padding: 30px 40px;
}
.login-button {
	margin-top: 12px;
	text-align: center;
}

/**** TRANSITIONS ***/
.fade-enter {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}
.fade-leave-to {
	opacity: 0;
}

.slide-fade-enter {
	transform: translateX(15px);
	opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.4s ease;
}
.slide-fade-leave-to {
	transform: translateX(-15px);
	opacity: 0;
}
</style>

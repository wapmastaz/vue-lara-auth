<template>
	<v-card d-flex class="login-form">
		<v-progress-linear
			:active="isLoading"
			:indeterminate="isLoading"
			absolute
			top
			color="deep-orange accent-4"
		></v-progress-linear>
		<h3 class="display-1 text-center mb-8">
			Login <span v-if="errorMessage">{{ errorMessage }}</span>
		</h3>
		<v-form @submit.prevent="loginUser" autocomplete="off">
			<v-layout>
				<v-flex class="form-flex">
					<v-text-field
						v-model="email"
						:error-messages="emailErrors"
						label="E-mail"
						autocomplete="off"
						@input="$v.email.$touch()"
						@blur="$v.email.$touch()"
						outlined
						required
						height="20px"
						success="true"
						class="mb-3"
					></v-text-field>

					<v-text-field
						v-model="password"
						:error-messages="passwordErrors"
						:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
						label="Password"
						:type="show ? 'text' : 'password'"
						@click:append="show = !show"
						required
						@input="$v.password.$touch()"
						@blur="$v.password.$touch()"
						autocomplete="off"
						outlined
					></v-text-field>

					<v-btn
						class="button login-button"
						color="accent"
						elevation="2"
						type="submit"
						large
						block
						:disabled="isLoading"
						:loading="isLoading"
					>
						LOGIN
					</v-btn>
					<v-card-text class="text-center">
						Don't have an account?
						<v-btn
							to="/register"
							text
							class="font-weight-normal text-capitalize pa-0"
							>Sign-up</v-btn
						>
					</v-card-text>
				</v-flex>
			</v-layout>
		</v-form>
	</v-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
	name: 'LoginForm',

	data: () => ({
		email: '',
		password: '',
		show: false,
	}),
	validations: {
		email: {
			required,
			email,
		},
		password: {
			required,
		},
	},
	computed: {
		...mapGetters(['errorMessage', 'isLoading']),
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) {
				return errors;
			}
			if (!this.$v.email.required) {
				errors.push('Email is required');
			}
			if (!this.$v.email.email) {
				errors.push('Invalid email provided');
			}
			return errors;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.password.$dirty) {
				return errors;
			}
			if (!this.$v.password.required) {
				errors.push('Password is required');
			}
			return errors;
		},
	},
	methods: {
		loginUser() {
			this.$v.$touch();
			this.$store.commit('setIsLoading', true);
			console.log('submit!');
			axios
				.get('/')
				.then((res) => {
					console.log(res);
					setTimeout(() => {
						this.$store.commit('setIsLoading', false);
						this.$store.commit('setErrors', res.data);
					}, 5000);
				})
				.catch((err) => {
					this.$store.commit('setIsLoading', false);
					console.log(err);
				});
		},
	},
};
</script>

<style></style>

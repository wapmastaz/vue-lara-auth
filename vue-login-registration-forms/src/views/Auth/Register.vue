<template>
	<v-card d-flex class="login-form">
		<v-progress-linear
			v-if="isLoading"
			:active="isLoading"
			:indeterminate="isLoading"
			absolute
			top
			color="deep-orange accent-4"
		></v-progress-linear>
		<h3 class="display-1 text-center mb-8">Register</h3>
		<v-form @submit.prevent="registerUser" autocomplete="off">
			<v-layout>
				<v-flex class="form-flex">
					<v-text-field
						v-model="name"
						label="Full Name"
						:error-messages="nameErrors"
						autocomplete="off"
						outlined
						required
						@input="$v.name.$touch()"
						@blur="$v.name.$touch()"
						class="mb-3"
					></v-text-field>

					<v-text-field
						v-model="email"
						label="E-mail"
						:error-messages="emailErrors"
						autocomplete="off"
						outlined
						required
						@input="$v.email.$touch()"
						@blur="$v.email.$touch()"
						class="mb-3"
					></v-text-field>

					<v-text-field
						v-model="password"
						:append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
						label="Password"
						:error-messages="passwordErrors"
						:type="passwordShow ? 'text' : 'password'"
						@click:append="passwordShow = !passwordShow"
						required
						autocomplete="off"
						outlined
						@input="$v.password.$touch()"
						@blur="$v.password.$touch()"
						class="mb-3"
					></v-text-field>

					<v-text-field
						v-model="confirmPassword"
						:append-icon="confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
						label="Confirm Password"
						:error-messages="confirmPasswordErrors"
						:type="confirmPasswordShow ? 'text' : 'password'"
						@click:append="confirmPasswordShow = !confirmPasswordShow"
						required
						autocomplete="off"
						outlined
						@input="$v.confirmPassword.$touch()"
						@blur="$v.confirmPassword.$touch()"
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
						REGISTER
					</v-btn>
					<v-card-text class="text-center">
						Have an account?<v-btn
							to="/"
							text
							class="font-weight-normal text-capitalize pa-0"
							>Login</v-btn
						>
					</v-card-text>
				</v-flex>
			</v-layout>
		</v-form>
	</v-card>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import axios from 'axios';
export default {
	name: 'Register',

	data: () => ({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		passwordShow: false,
		confirmPasswordShow: false,
	}),
	validations: {
		name: {
			required,
		},
		email: {
			required,
			email,
		},
		password: {
			required,
			minLength: minLength(2),
		},
		confirmPassword: {
			sameAsPassword: sameAs('password'),
		},
	},
	computed: {
		...mapGetters(['errorMessage', 'isLoading']),
		nameErrors() {
			const errors = [];
			if (!this.$v.name.$dirty) {
				return errors;
			}
			if (!this.$v.name.required) {
				errors.push('Name is required');
			}
			return errors;
		},

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
			if (!this.$v.password.minLength) {
				errors.push('Password should not be less than six character');
			}
			return errors;
		},
		confirmPasswordErrors() {
			const errors = [];
			if (!this.$v.confirmPassword.$dirty) {
				return errors;
			}
			if (!this.$v.confirmPassword.sameAsPassword) {
				errors.push('Password does not match');
			}
			return errors;
		},
	},
	methods: {
		...mapActions('auth', ['REGISTER_USER']),
		registerUser() {
			this.$v.$touch();
			if (this.$v.$invalid) {
			} else {
				const user = {
					name: this.name,
					email: this.email,
					password: this.password,
				};

				this.REGISTER_USER(user).then(
					(response) => {
						console.log(response);
						this.$router.push('/verify');
					},
					(err) => {
						console.log(err);
						if (err.response.status == 422) {
							const data = err.response.data.details;
							for (const key in data) {
								this.$toasted.error(data[key][0]);
							}
						} else {
							this._vm.$toasted.error(
								'There was a problem while processing your request'
							);
						}
					}
				);
			}
		},
	},
};
</script>

<style></style>

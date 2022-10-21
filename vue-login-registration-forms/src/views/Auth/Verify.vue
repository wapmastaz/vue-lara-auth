<template>
	<div class="content">
		<v-card d-flex class="login-form">
			<v-progress-linear
				:active="isLoading"
				:indeterminate="isLoading"
				absolute
				top
				color="deep-orange accent-4"
			></v-progress-linear>
			<h3 class="display-1 text-center mb-8">Welcome {{ user.name }}</h3>
			<p>Kindly check your email to verify your account</p>
			<v-form @submit.prevent="verifyUser" autocomplete="off">
				<v-layout>
					<v-flex class="form-flex">
						<v-text-field
							v-model="code"
							:error-messages="codeErrors"
							label="E-mail"
							autocomplete="off"
							outlined
							required
							class="mb-3"
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
							VERIFY
						</v-btn>
						<!-- <v-card-text class="text-center">
							Don't have an account?
							<v-btn
								to="/register"
								text
								class="font-weight-normal text-capitalize pa-0"
								>Sign-up</v-btn
							>
						</v-card-text> -->
					</v-flex>
				</v-layout>
			</v-form>
		</v-card>
	</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
	name: 'Verify',

	data: () => ({
		code: '',
	}),
	validations: {
		code: {
			required,
		},
	},
	computed: {
		...mapGetters(['errorMessage', 'isLoading']),
		user() {
			return this.$store.getters['auth/user'];
		},
		codeErrors() {
			const errors = [];
			if (!this.$v.code.$dirty) {
				return errors;
			}
			if (!this.$v.code.required) {
				errors.push('Email is required');
			}
			return errors;
		},
	},
	methods: {
		verifyUser() {
			this.$v.$touch();
			this.$store.commit('setIsLoading', true);
			console.log('submit!');
		},
	},
};
</script>

<style></style>

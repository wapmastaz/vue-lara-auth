<template>
  <validation-observer
      ref="observer"
      v-slot="{ invalid }"
  >
    <v-card height="550px" d-flex flex-column align-center justify-center>
      <v-form @submit.prevent="submit">
        <v-layout align-center justify-center>
          <v-flex xs8 class="form-flex">
            <validation-provider
                v-slot="{ errors }"
                name="First Name"
                rules="required|max:10"
            >
              <v-text-field
                  v-model="firstName"
                  :counter="10"
                  :error-messages="errors"
                  label="First Name"
                  required
                  class="field"
              ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="Last Name"
                rules="required|max:10"
            >
              <v-text-field
                  v-model="lastName"
                  :counter="10"
                  :error-messages="errors"
                  label="Last Name"
                  required
              ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
            >
              <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="E-mail"
                  required
              ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="Password"
                vid="confirm"
                :rules="{
          required: true,
          passwordRegex: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
        }"
            >
              <v-text-field
                  v-model="password"
                  :error-messages="errors"
                  label="Password"
                  required
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
              ></v-text-field>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="Password"
                rules="required|confirmed:confirm"
            >
              <v-text-field
                  v-model="passwordRepeat"
                  :error-messages="errors"
                  label="Repeat Password"
                  :append-icon="showPasswordRepeat ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPasswordRepeat ? 'text' : 'password'"
                  @click:append="showPasswordRepeat = !showPasswordRepeat"
              ></v-text-field>
            </validation-provider>
            <v-btn class="button"
                   color="accent"
                   elevation="2"
                   rounded
                   type="submit"
                   :disabled="invalid"
            >
              SIGN UP
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </validation-observer>
</template>

<script>
import {extend, setInteractionMode, ValidationObserver, ValidationProvider} from "vee-validate";
import {regex, max, email, required, confirmed} from "vee-validate/dist/rules";

setInteractionMode('eager')
extend('passwordRegex', {
  ...regex,
  message: '{_field_} is not strong enough',
})
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})
extend('email', {
  ...email,
  message: 'Email must be valid',
})
extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})
extend('confirmed', {
  ...confirmed,
  message: 'Password does not match',
})
export default {
  name: "SignUpForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    password: '',
    passwordRepeat: '',
    email: '',
    firstName: '',
    lastName: '',
    showPasswordRepeat: false,
    showPassword: false
  }),
  methods: {
    submit() {
      this.$refs.observer.validate()
    },
  },
}
</script>

<style>
.form-flex {
  margin-top: 15%;
}

.button {
  margin-left: 37%;
  margin-top: 5%;
}
</style>
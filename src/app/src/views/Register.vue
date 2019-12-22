<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card  my-5">
            <div class="card-body">
              <locale-changer></locale-changer>
              <h4 class="card-title text-center mb-4 mt-1">Sign Up</h4>
              <p class="text-success text-center" v-if="submitStatus === 'OK'">
                Thanks for your submission!
              </p>
              <!--    <p v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>-->
              <p class="text-danger text-center" v-if="submitStatus === 'ERROR'">
                {{ errorMessage }}
              </p>
              <p class="text-primary text-center" v-if="submitStatus === 'PENDING'">
                Sending...
              </p>
              <form @submit.prevent="submit">
                <div class="form-group">
                    <label>
                        Username
                    </label>
                  <div
                    :class="{
                      'input-group': true,
                      'form-group-error': $v.username.$error,
                    }"
                  >
                    <input
                      name=""
                      class="form-control"
                      placeholder="Username"
                      type="text"
                      v-model.trim="$v.username.$model"
                    />
                  </div>
                  <small class="form-error form-text text-danger" v-if="!$v.username.required">
                    {{ $t('form.validation.required') }}
                  </small>
                  <small class="form-error form-text text-danger" v-if="!$v.username.minLength">
                    username must have at least
                    {{ $v.username.$params.minLength.min }} letters.
                  </small>
                </div>
                <div class="form-group">
                    <label>
                        Email address
                    </label>
                  <div
                    :class="{
                      'input-group': true,
                      'form-group-error': $v.email.$error,
                    }"
                  >
                    <input
                      name=""
                      class="form-control"
                      placeholder="Email address"
                      type="text"
                      v-model.trim="$v.email.$model"
                    />
                  </div>
                  <small class="form-error form-text text-danger" v-if="!$v.email.required">
                    {{ $t('form.validation.required') }}
                  </small>
                  <small class="form-error form-text text-danger" v-if="!$v.email.email">
                    username email.
                  </small>
                </div>
                <div class="form-group">
                <div class="form-row">
                  <div class="col">
                      <label>
                          First Name
                      </label>
                      <div
                        :class="{
                          'input-group': true,
                          'form-group-error': $v.firstName.$error,
                        }"
                      >
                        <input
                          name=""
                          class="form-control"
                          placeholder="First Name"
                          type="text"
                          v-model.trim="$v.firstName.$model"
                        />
                      </div>
                      <small class="form-error form-text text-danger" v-if="!$v.firstName.required">
                        {{ $t('form.validation.required') }}
                      </small>
                  </div>
                  <div class="col">
                      <label>
                          Last Name
                      </label>
                      <div
                        :class="{
                          'input-group': true,
                          'form-group-error': $v.lastName.$error,
                        }"
                      >
                        <input
                          name=""
                          class="form-control"
                          placeholder="Last Name"
                          type="text"
                          v-model.trim="$v.lastName.$model"
                        />
                      </div>
                      <small class="form-error form-text text-danger" v-if="!$v.lastName.required">
                        {{ $t('form.validation.required') }}
                      </small>
                  </div>
                </div>
                </div>

                <div class="form-group">
                    <label>
                        Gender
                    </label>
                  <div class="form-row">
                    <div class="col">
                      <label class="d-block cursor-pointer m-0">
                        <input type="radio" name="gender" class="d-none" value="male" v-model.trim="$v.gender.$model"/>
                        <div class="card">
                          <div class="card-body p-2">
                            <p class="card-text text-center">Male</p>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div class="col">
                      <label class="d-block cursor-pointer m-0">
                        <input type="radio" name="gender" class="d-none" value="female" v-model.trim="$v.gender.$model"/>
                        <div class="card">
                          <div class="card-body p-2">
                            <p class="card-text text-center">Female</p>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div class="col">
                      <label class="d-block cursor-pointer m-0">
                        <input type="radio" name="gender" class="d-none" value="other" v-model.trim="$v.gender.$model"/>
                        <div class="card">
                          <div class="card-body p-2">
                            <p class="card-text text-center">Other</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="acceptTerms">
                  <label class="form-check-label" for="acceptTerms">I accept <a href="#">terms & conditions.</a></label>
                </div>

                <div class="form-group mt-5">
                  <button type="submit" class="btn btn-primary btn-block" :disabled="submitStatus === 'PENDING'">
                    Sign up
                  </button>
                </div>
                Already have an account? <router-link :to="{ name: 'login' }">Sign in</router-link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators';
import LocaleChanger from '../components/LocaleChanger';
import userService from '../services/user.service';
import { SubmitStatusEnum } from '../enums/SubmitStatusEnum';
import Vue from 'vue';

export default Vue.component({
  name: 'register',
  components: { LocaleChanger },
  data() {
    return {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      submitStatus: null,
      errorMessage: null,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
    },
    email: {
      email,
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    gender: {
      required,
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.submitStatus = SubmitStatusEnum.Pending;

        try {

          const formData = {
            username: this.username,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            gender: this.gender,
          };

          await userService.register(formData);

          this.submitStatus = SubmitStatusEnum.Success;

        } catch (error) {
          this.submitStatus = SubmitStatusEnum.Error;
          this.errorMessage = error.message;
        }
      }
    },
  },
});
</script>

<style scoped>
  input[type="radio"]:checked + .card {
    box-shadow: 0 0 1px 1px #007bff;
  }
</style>

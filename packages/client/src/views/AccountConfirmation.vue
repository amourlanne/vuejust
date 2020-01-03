<template>
  <div class="account-confirmation">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div v-if="valid === true">
            <div class="my-5">
              <locale-changer></locale-changer>
              <h4 class="card-title text-center mb-4 mt-1">Set your password</h4>
              <p class="text-center">
                Create your password and log in to your account.
              </p>
            </div>
            <div class="card my-5">
              <article class="card-body">
                <p class="text-success text-center" v-if="submitStatus === 'OK'">
                  Thanks for your submission!
                </p>
                <p class="text-danger text-center" v-if="submitStatus === 'ERROR'">
                  {{ errorMessage }}
                </p>
                <p class="text-primary text-center" v-if="submitStatus === 'PENDING'">
                  Sending...
                </p>
                <form @submit.prevent="submit">
                  <label>Create a new password *</label>
                  <div class="form-group">
                    <div
                      :class="{
                        'input-group': true,
                        'form-group-error': $v.formData.password.$error,
                      }"
                    >
                      <input
                        name=""
                        class="form-control"
                        placeholder="New password"
                        type="password"
                        v-model.trim="$v.formData.password.$model"
                      />
                    </div>
                    <small class="form-error form-text text-danger" v-if="!$v.formData.password.required">
                      {{ $t('form.validation.required') }}
                    </small>
                  </div>
                  <div class="form-group">
                    <div
                      :class="{
                        'input-group': true,
                        'form-group-error': $v.formData.passwordRepeat.$error,
                      }"
                    >
                      <input
                        name=""
                        class="form-control"
                        placeholder="Confirm new password"
                        type="password"
                        v-model.trim="$v.formData.passwordRepeat.$model"
                      />
                    </div>
                    <small class="form-error form-text text-danger" v-if="!$v.formData.passwordRepeat.required">
                      {{ $t('form.validation.required') }}
                    </small>
                  </div>
                  <div>
                    <label>Password requirements</label>
                    <ul>
                      <li>Must be a minimum of 8 characteres.</li>
                      <li>Must contains letters, numbers, and symbols.</li>
                      <li>Passwords must match.</li>
                    </ul>
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block" :disabled="submitStatus === 'PENDING'">
                      Set password and log in
                    </button>
                  </div>
                </form>
              </article>
            </div>
          </div>

          <div class="text-center" v-if="valid == false">
            <h5>There is a small problem</h5>
            <hr />
            This invitation link isn't valid. Perhaps you already used it?
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import LocaleChanger from '../components/LocaleChanger';

import userService from '../services/user.service';
import { SubmitStatusEnum } from '../enums/SubmitStatusEnum';

export default {
  name: 'account-confirmation',
  components: { LocaleChanger },
  data() {
    return {
      formData: {
        password: '',
        passwordRepeat: '',
      },
      token: null,
      valid: null,
      submitStatus: null,
      errorMessage: null,
    };
  },
  validations: {
    formData: {
      password: {
        required,
      },
      passwordRepeat: {
        required,
      },
    },
  },
  async beforeMount() {
    this.token = this.$route.params.token;
    try {
      this.valid = await userService.accountConfirmationValidateToken(this.token);
    } catch (e) {
      // catch error
    }
  },
  methods: {
    async submit() {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.submitStatus = SubmitStatusEnum.Pending;

        try {
          await userService.accountConfirmation(this.formData, this.token);
          this.submitStatus = SubmitStatusEnum.Success;
        } catch (e) {
          this.submitStatus = SubmitStatusEnum.Error;
        }
      }
    },
  },
};
</script>

<style scoped></style>

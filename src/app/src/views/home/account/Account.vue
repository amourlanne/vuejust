<template>
  <div class="account">
    <helmet>
      <title>Account</title>
    </helmet>
    <div class="container pt-5">
      <div class="row mb-5">
        <div class="col-3">
          <div>Profile</div>
          <small>Your email address is your identity on vuejust and is used to log in.</small>
        </div>
        <div class="col">
          <form @submit.prevent="submit">
            <div class="form-row mb-5">
              <div class="col-3 mr-5">
                <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                     width="180" class="rounded-circle img-fluid" alt="Cinque Terre">
              </div>
              <div class="col-5">
                <label>Upload new avatar</label>
                <div class="custom-file mb-2">
                  <input type="file" class="custom-file-input" id="customFile">
                  <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
                <div>The maximum file size allowed is 200KB.</div>
                <hr/>
                <button type="button" class="btn btn-outline-danger">Remove avatar</button>
              </div>
            </div>
            <hr/>
            <div class="form-row">
              <div class="col-8">
                <div class="form-row">
                  <div :class="{ 'col-md-6 mb-3': true, 'form-group-error': $v.profile.firstName.$error }">
                    <label for="firstName">First name</label>
                    <input name="firstName"
                           id="firstName"
                           :class="{ 'form-control': true, 'is-invalid': $v.profile.firstName.$error }"
                           placeholder="Firstname"
                           type="text"
                           v-model.trim="$v.profile.firstName.$model"/>
                    <small class="form-error form-text text-danger" v-if="!$v.profile.firstName.required">
                      {{ $t('form.validation.required') }}
                    </small>
                  </div>
                  <div :class="{ 'col-md-6 mb-3': true, 'form-group-error': $v.profile.lastName.$error }">
                    <label for="lastName">Last name</label>
                    <input name="lastName"
                           id="lastName"
                           :class="{ 'form-control': true, 'is-invalid': $v.profile.lastName.$error }"
                           placeholder="Last Name"
                           type="text"
                           v-model.trim="$v.profile.lastName.$model"/>
                    <small class="form-error form-text text-danger" v-if="!$v.profile.lastName.required">
                      {{ $t('form.validation.required') }}
                    </small>
                  </div>
                </div>
                <div class="form-row">
                  <div :class="{ 'col mb-3': true, 'form-group-error': $v.profile.email.$error }">
                    <label for="email">Email Address</label>
                    <input name="email"
                           id="email"
                           :class="{ 'form-control': true, 'is-invalid': $v.profile.email.$error }"
                           placeholder="Your email address"
                           type="email"
                           v-model.trim="$v.profile.email.$model"/>
                    <small class="form-error form-text text-danger" v-if="!$v.profile.email.required">
                      {{ $t('form.validation.required') }}
                    </small>
                    <small class="form-error form-text text-danger" v-if="!$v.profile.email.email">
                      {{ $t('form.validation.email') }}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Update profile</button>
          </form>
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="col-3">
          <div>Password</div>
          <small>...</small>
        </div>
        <div class="col">
          <form @submit.prevent="submit">
            <div class="form-row">
              <div :class="{ 'col-md-8 mb-3': true, 'form-group-error': $v.password.currentPassword.$error }">
                <label for="currentPassword">Current Password</label>
                <input name="currentPassword"
                       id="currentPassword"
                       :class="{ 'form-control': true, 'is-invalid': $v.password.currentPassword.$error }"
                       placeholder="enter your current password"
                       type="text"
                       v-model.trim="$v.password.currentPassword.$model"/>
                <small class="form-error form-text text-danger" v-if="!$v.password.currentPassword.required">
                  {{ $t('form.validation.required') }}
                </small>
              </div>
            </div>
            <hr/>
            <div class="form-row">
              <div :class="{ 'col-md-8 mb-3': true, 'form-group-error': $v.password.newPassword.$error }">
                <label for="newPassword">New Password</label>
                <input name="newPassword"
                       id="newPassword"
                       :class="{ 'form-control': true, 'is-invalid': $v.password.newPassword.$error }"
                       placeholder="enter a new password"
                       type="text"
                       v-model.trim="$v.password.newPassword.$model"/>
                <small class="form-error form-text text-danger" v-if="!$v.password.newPassword.required">
                  {{ $t('form.validation.required') }}
                </small>
                <small class="form-error form-text text-danger" v-if="!$v.password.newPassword.minLength">
                  Password must be {{ $v.password.newPassword.$params.minLength.min }} or more characters.
                </small>
              </div>
            </div>
            <div class="form-row">
              <div :class="{ 'col-md-8 mb-3': true, 'form-group-error': $v.password.repeatNewPassword.$error }">
                <label for="repeatNewPassword">Confirm New Password</label>
                <input name="repeatNewPassword"
                       id="repeatNewPassword"
                       :class="{ 'form-control': true, 'is-invalid': $v.password.repeatNewPassword.$error }"
                       placeholder="enter the password again"
                       type="text"
                       v-model.trim="$v.password.repeatNewPassword.$model"/>
                <small class="form-error form-text text-danger" v-if="!$v.password.repeatNewPassword.required">
                  {{ $t('form.validation.required') }}
                </small>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Update password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Helmet } from '@jnields/vue-helmet';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'account',
  components: { Helmet },
  data: () => ({
    profile: {
      firstName: null,
      lastName: null,
      email: null
    },
    password: {
      currentPassword: null,
      newPassword: null,
      repeatNewPassword: null
    }
  }),
  computed: mapState(['currentUser']),
  validations: {
    profile: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
        email
      },
    },
    password: {
      currentPassword: {
        required,
      },
      newPassword: {
        required,
        minLength: minLength(8)
      },
      repeatNewPassword: {
        required,
      }
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log(this.profile);
        try {
        } catch (error) {
          if(error) {
          }
        }
      }
    },
  },
  async beforeMount() {
    const {
      firstName,
      lastName,
      email
    } = this.currentUser;

    this.profile = {
      firstName,
      lastName,
      email
    };
  },
};
</script>

<style scoped></style>

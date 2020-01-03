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
          <form @submit.prevent="submitProfile">
            <div class="alert alert-danger" role="alert" v-if="profileSubmitStatus === 'ERROR'">
              {{ profileErrorMessage }}
            </div>
            <div class="alert alert-success" role="alert" v-if="profileSubmitStatus === 'OK'">
              Profile successfully updated !
            </div>
            <div class="form-row mb-5">
              <div class="col-3 mr-5">
                <img
                  :src="avatarUrl || defaultAvatarUrl"
                  style="width: 180px; height: 180px;"
                  class="rounded-circle img-fluid"
                />
              </div>
              <div class="col-5">
                <label>Upload new avatar</label>
                <div class="custom-file mb-2">
                  <input
                    type="file"
                    class="custom-file-input"
                    ref="avatar"
                    id="avatar"
                    name="avatar"
                    v-on:change="handleFileUpload"
                  />
                  <label class="custom-file-label" for="avatar">Choose file</label>
                </div>
                <div>The maximum file size allowed is 200KB.</div>
                <hr />
                <button type="button" class="btn btn-outline-danger" v-on:click="onClickRemoveAvatar">
                  Remove avatar
                </button>
              </div>
            </div>
            <hr />
            <div class="form-row">
              <div class="col-8">
                <div class="form-row">
                  <div :class="{ 'col-md-6 mb-3': true, 'form-group-error': $v.profile.firstName.$error }">
                    <label for="firstName">First name</label>
                    <input
                      name="firstName"
                      id="firstName"
                      :class="{ 'form-control': true, 'is-invalid': $v.profile.firstName.$error }"
                      placeholder="Firstname"
                      type="text"
                      v-model.trim="$v.profile.firstName.$model"
                    />
                    <small class="form-error form-text text-danger" v-if="!$v.profile.firstName.required">
                      {{ $t('form.validation.required') }}
                    </small>
                  </div>
                  <div :class="{ 'col-md-6 mb-3': true, 'form-group-error': $v.profile.lastName.$error }">
                    <label for="lastName">Last name</label>
                    <input
                      name="lastName"
                      id="lastName"
                      :class="{ 'form-control': true, 'is-invalid': $v.profile.lastName.$error }"
                      placeholder="Last Name"
                      type="text"
                      v-model.trim="$v.profile.lastName.$model"
                    />
                    <small class="form-error form-text text-danger" v-if="!$v.profile.lastName.required">
                      {{ $t('form.validation.required') }}
                    </small>
                  </div>
                </div>
                <div class="form-row">
                  <div :class="{ 'col mb-3': true, 'form-group-error': $v.profile.email.$error }">
                    <label for="email">Email Address</label>
                    <input
                      name="email"
                      id="email"
                      :class="{ 'form-control': true, 'is-invalid': $v.profile.email.$error }"
                      placeholder="Your email address"
                      type="email"
                      v-model.trim="$v.profile.email.$model"
                    />
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
      <hr />
      <div class="row">
        <div class="col-3">
          <div>Password</div>
        </div>
        <div class="col">
          <form @submit.prevent="submitPassword">
            <div class="form-row">
              <div :class="{ 'col-md-8 mb-3': true, 'form-group-error': $v.password.currentPassword.$error }">
                <label for="currentPassword">Current Password</label>
                <input
                  name="currentPassword"
                  id="currentPassword"
                  :class="{ 'form-control': true, 'is-invalid': $v.password.currentPassword.$error }"
                  placeholder="enter your current password"
                  type="text"
                  v-model.trim="$v.password.currentPassword.$model"
                />
                <small class="form-error form-text text-danger" v-if="!$v.password.currentPassword.required">
                  {{ $t('form.validation.required') }}
                </small>
              </div>
            </div>
            <hr />
            <div class="form-row">
              <div :class="{ 'col-md-8 mb-3': true, 'form-group-error': $v.password.newPassword.$error }">
                <label for="newPassword">New Password</label>
                <input
                  name="newPassword"
                  id="newPassword"
                  :class="{ 'form-control': true, 'is-invalid': $v.password.newPassword.$error }"
                  placeholder="enter a new password"
                  type="text"
                  v-model.trim="$v.password.newPassword.$model"
                />
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
                <input
                  name="repeatNewPassword"
                  id="repeatNewPassword"
                  :class="{ 'form-control': true, 'is-invalid': $v.password.repeatNewPassword.$error }"
                  placeholder="enter the password again"
                  type="text"
                  v-model.trim="$v.password.repeatNewPassword.$model"
                />
                <small class="form-error form-text text-danger" v-if="!$v.password.repeatNewPassword.sameAsPassword">
                  {{ $t('form.validation.sameAsPassword') }}
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import userService from '../../../services/user.service';

export default {
  name: 'account',
  data: () => ({
    profile: {
      firstName: null,
      lastName: null,
      email: null,
      avatar: null,
      'remove-avatar': false,
    },
    avatarUrl: null,
    defaultAvatarUrl: 'https://secure.gravatar.com/avatar/2615a3a7473379de6863858e0ec7b32a?s=800&d=identicon',
    profileSubmitStatus: null,
    profileErrorMessage: null,
    password: {
      currentPassword: null,
      newPassword: null,
      repeatNewPassword: null,
    },
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
        email,
      },
    },
    password: {
      currentPassword: {
        required,
      },
      newPassword: {
        required,
        minLength: minLength(8),
      },
      repeatNewPassword: {
        sameAsPassword: sameAs('newPassword'),
      },
    },
  },
  methods: {
    async submitProfile() {
      this.$v.profile.$touch();
      if (!this.$v.profile.$invalid) {
        try {
          const user = await userService.updateAccountProfile(this.profile);
          this.profileSubmitStatus = 'OK';
          this.$store.commit('set_current_user', { currentUser: user });
        } catch (error) {
          this.profileSubmitStatus = 'ERROR';
          if (error) {
            this.profileErrorMessage = error.message;
          }
        }
      }
    },
    async submitPassword() {
      this.$v.password.$touch();
      if (!this.$v.password.$invalid) {
        // no empty block
      }
    },
    async handleFileUpload() {
      const avatar = this.$refs.avatar.files[0];
      this.profile.avatar = avatar;
      this.avatarUrl = URL.createObjectURL(avatar);
    },
    async onClickRemoveAvatar() {
      this.profile.avatar = null;
      this.avatarUrl = null;
    },
  },
  async beforeMount() {
    const { firstName, lastName, email, avatar } = this.currentUser;

    this.profile = {
      firstName,
      lastName,
      email,
    };

    if (avatar) {
      this.avatarUrl = avatar.path;
    }
  },
};
</script>

<style scoped></style>

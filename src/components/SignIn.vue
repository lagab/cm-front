<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm8 md4 lg3>
      <v-card class="elevation-2 pa-5">
        <v-card-text>
          <div class="text-xs-center ma-4">
            <v-avatar>
              <v-icon  x-large>person_pin</v-icon>
            </v-avatar>
          </div>
          <v-form v-model="canLogIn" ref="form">
            <v-text-field v-model="username" label="Login" :rules="[rules.required]" type="text"></v-text-field>
            <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            <v-checkbox label="Remember Me"></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-xs-center">
          <v-btn color="primary" block @click.native="submit">Login</v-btn>
          <br/>
        </v-card-actions>
      </v-card>
      <p class="text-xs-center ma-4">
        Already have an account? <a href="#/signin" class="primary--text">Sign in</a>
      </p>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Signin',
  data () {
    return {
      username: '',
      password: '',
      hidePassword: true,
      rules: {
        required: (value) => !!value || "this.$t('errors.missing')"
      },
      canLogIn: false,
      loading: false
    }
  },
  computed: {
    ...mapState({
      savedUser: state => state.credentials.username
    })
  },
  methods: {
    ...mapActions({
      login: 'credentials/login'
    }),
    submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        return this.login({
          username: this.username,
          password: this.password
        }).catch(err => {
          if (err.status === 500) {
            this.$notify(this.$t('errors.is500'))
          } else {
            this.$notify(this.$t('errors.wrongCredentials'))
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  },
  i18n: {
    messages: {
      en: {
        errors: {
          wrongCredentials: 'Wrong username or password'
        }
      },
      fr: {
        errors: {
          wrongCredentials: 'Utilisateur ou mot de passe incorrect'
        }
      }
    }
  },
  mounted () {
    this.username = this.savedUser
  }
}
</script>

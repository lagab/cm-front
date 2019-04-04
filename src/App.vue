<template>
  <v-app light v-if="authenticated">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Notification
      :value="notification"
      color="primary"
      @close="() => clearNotification()"
    ></Notification>
  </v-app>
  <v-app  v-else>
    <v-container class="ita-authentication-layout">
      <SignIn />
      <Notification
        :value="notification"
        color="primary"
        @close="() => clearNotification()"
      ></Notification>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Notification from './components/Notification'
import SignIn from '@/components/SignIn'

export default {
  name: 'App',
  computed: {
    ...mapState({
      notification: state => state.notification,
      username: state => state.credentials.username
    }),
    ...mapGetters({
      authenticated: 'credentials/isAuthenticated'
    })
  },
  components: {
    Notification,
    SignIn
  },
  methods: {
    ...mapActions({
      clearNotification: 'clearNotification'
    })
  },
  watch: {
    authenticated (newVal) {
      if (newVal) {
        this.$notify(this.$t('welcome', [this.username]))
      }
    }
  },
  data () {
    return {
      //
    }
  }
}
</script>

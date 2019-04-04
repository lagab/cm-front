<template>
  <v-snackbar
    :value="!!value"
    :color="color"
    :timeout="timeout"
    multi-line
    right
    bottom
  >
    {{ value }}
    <v-tooltip top>
      <v-btn slot="activator" icon dark flat @click.native="$emit('close')">
        <v-icon>clear</v-icon>
      </v-btn>
      <span>{{ $t('close') }}</span>
    </v-tooltip>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    value: String,
    color: String,
    timeout: {
      type: Number,
      default: 6000
    }
  },
  data () {
    return {
      timer: null
    }
  },
  watch: {
    value (newVal) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$emit('close')
      }, this.timeout)
    }
  }
}
</script>

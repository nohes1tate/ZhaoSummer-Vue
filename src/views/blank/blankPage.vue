<template>
  <div v-title data-title="墨书"></div>
</template>

<script>
export default {
  name: "blankPage",
  methods: {
    mounted() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>

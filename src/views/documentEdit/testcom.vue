<template>
  <div>{{prop}}</div>
</template>

<script>
export default {
  name: "testcom",
  props: {
    prop: {
      type: String,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>

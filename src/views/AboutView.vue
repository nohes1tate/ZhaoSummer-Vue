<template>
  <div class="about">
    <h1>This is an about page</h1>
    <tip-tap></tip-tap>
  </div>
</template>

<script>
import TipTap from "@/components/TipTap";
export default {
  components: {TipTap},
  data (){
    return {
      value: ''
    }
  }
}
</script>

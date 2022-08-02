<template>
  <div style="width: auto">
      <design-tool></design-tool>
  </div>
</template>

<script>
import designTool from "@/components/InlineAxure/DesignTool";
export default {
  components: {designTool},
  data (){
    return {
      value: ''
    }
  }
}
</script>

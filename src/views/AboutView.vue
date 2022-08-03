<template>
  <div style="width: auto">
      <design-tool></design-tool>
  </div>
</template>

<script>
import drawioEmbed from "drawio-embed";
import DesignTool from "@/components/InlineAxure/DesignTool";


export default {
  components: {DesignTool},
  mounted() {
    drawioEmbed()
  }
}
</script>

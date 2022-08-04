<template>
  <div style="width: auto" >
      <design-tool @fuck="fuck"></design-tool>
  </div>
</template>

<script>
import drawioEmbed from "drawio-embed";
import DesignTool from "@/components/InlineAxure/DesignTool";


export default {
  components: {DesignTool},
  mounted() {
    drawioEmbed()
  },
  methods:{
    fuck() {
      console.log('getFucked')
    }
  }
}
</script>

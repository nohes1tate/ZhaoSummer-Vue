<template>
<div>
  <document-editor></document-editor>
  <h1>114514</h1>
</div>
</template>

<script>
import documentEditor from "@/components/documentEdit/DocumentEditor";

export default {
  name: "DocumentView",
  components: {
    documentEditor
  },
  data() {
    return {
      roomName: '',
    }
  },
  mounted() {
    this.roomName=this.$route.params.documentID
  }
}
</script>

<style scoped>

</style>

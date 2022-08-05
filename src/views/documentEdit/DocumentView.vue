<template>
<div>
  <document-editor></document-editor>
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
    console.log('roomName:',this.roomName)
  },
}
</script>

<style scoped>

</style>

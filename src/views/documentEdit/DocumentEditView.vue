<template>
  <div>
    <el-button @click="fuckme"></el-button>
    <DocumentEditor :key="documentID"></DocumentEditor>
  </div>
</template>

<script>
import DocumentEditor from "@/components/WangEditor/DocumentEditor";

export default {
  name: "DocumentEditView",

  components: {
    DocumentEditor
  },
  data() {
    return {
      documentID: ''
    }
  },
  methods: {
    fuckme() {
      this.$router.push('/documentEdit/' + (this.$route.params.documentID+1))
    },
  },
  mounted() {
    this.documentID=this.$route.params.documentID
  }
}
</script>

<style scoped>

</style>

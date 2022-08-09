<template>
  <div>
    <DocumentEditor :documentid="documentID+''"></DocumentEditor>
  </div>
</template>

<script>
import DocumentEditor from "@/components/WangEditor/DocumentEditor";

export default {
  name: "DocumentEditView",

  components: {
    DocumentEditor,
  },
  data() {
    return {
      documentID: '',
      num: 3,
    }
  },
  methods: {
    fuckme() {
      this.num++,
          this.documentID++
    },
  },
  mounted() {
    this.documentID=this.$route.params.documentID
    this.num=this.$route.params.documentID
  }
}
</script>

<style scoped>

</style>

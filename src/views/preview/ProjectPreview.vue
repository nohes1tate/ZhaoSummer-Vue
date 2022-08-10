<template>
<div>
  <PreviewListView :list="this.previewList" :group="'0'" :key="reloadkey"></PreviewListView>
</div>
</template>

<script>
import PreviewListView from "@/views/preview/PreviewListView";
export default {
  name: "ProjectPreview",
  components: {
    PreviewListView
  },
  data() {
    return {
      previewList: [],
      reloadkey:false,
    }
  },
  methods: {
    getAxureInfo() {
      let data = new FormData()

      data.append('projectID',this.projectID)
      data.append('username',localStorage.getItem('username'))
      data.append('authorization',localStorage.getItem('authorization'))

      this.$axios({
        method: 'post',
        url: 'ProjectManager/viewAxureList/',
        data: data
      })
          .then(res=>{
            if(res.data.error === 0){
              console.log(res.data.axure_list)
              this.previewList=res.data.axure_list;
              this.reloadkey=!this.reloadkey;
            }
          })
    }
  },
  mounted() {this.projectID = this.$route.params.projectID;
    this.curUsername = localStorage.getItem('username');
    this.curUserID = localStorage.getItem('userID');
    this.getAxureInfo()
  }
}
</script>

<style scoped>

</style>

<template>
  <div style="width: auto" >
    <DesignView :list="axureList"></DesignView>
  </div>
</template>

<script>
import DesignView from "@/views/design/DesignView";

export default {
  components: {
    DesignView
  },
  data() {
    return {
      axureList: [{axureid: '1',
        title: '页面1',
        content: '',   },
        {axureid: '2',
          title: '页面2',
          content: '',}]
    }
  }
}

</script>

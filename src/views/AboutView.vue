<template>
  <div style="width: auto" >
    <UMLView :list="UMLList"></UMLView>
  </div>
</template>

<script>
import UMLView from "@/views/design/UMLView";

export default {
  components: {
    UMLView
  },
  data() {
    return {
      UMLList: [{UMLid: '1',
        title: '页面1',
        content: '',   },
        {UMLid: '2',
          title: '页面2',
          content: '',}]
    }
  }
}

</script>

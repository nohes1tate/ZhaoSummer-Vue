<template>
  <div style="width: auto" >
    <DesignView :list="[1,2]"></DesignView>
  </div>
</template>

<script>
import DesignView from "@/views/design/DesignView";

export default {
  components: {
    DesignView
  }
}

</script>

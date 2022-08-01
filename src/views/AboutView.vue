<template>
  <div class="about">
    <div >
      <DraggableComponent></DraggableComponent>
    </div>
  </div>
</template>

<script>
import DraggableComponent from "@/components/InlineAxure/DraggableComponent";
export default {
  components: {DraggableComponent},
  data (){
    return {
      value: ''
    }
  }
}
</script>

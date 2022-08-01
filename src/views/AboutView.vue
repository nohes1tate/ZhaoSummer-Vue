<template>
  <div class="about">
    <h1>This is an about page</h1>
    <DraggableComponent></DraggableComponent>
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

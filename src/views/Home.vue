<template>
  <div class="home">
    <ListagemRefris/>
  </div>
</template>

<script>
// @ is an alias to /src
import ListagemRefris from '@/components/ListagemRefris.vue'

export default {
  name: 'home',
  components: {
    ListagemRefris
  }
}
</script>

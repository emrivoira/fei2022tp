<template>
    <v-alert
          :type="type"
          class="mx-auto text-md-center"
          max-width="500px"
          
        >
          {{ message }}
        </v-alert>

</template>

<script>
export default {
    name: 'ComponentAlert',
    props:{
      message: {
        type: String,
        requiered: true,
        default:"Mensaje de advertencia via alert"
      },
      type: {
        type: String,
        default: "error"
      }
    },
    data:() => ({
        
    }),
    methods: {
 
    },    
}
</script>
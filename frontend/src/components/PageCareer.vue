<template>
   <v-data-table
    :headers="headers"
    :items="career"
    :items-per-page="10"
    class="elevation-10"
    max-width= 200px
  >
</v-data-table>
      

    

</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'id',value: 'id',
          },
          { text: 'Nombre de Carrera', value: 'nombre' },
        ],
        career: [],
      }
    },
    created() {
        this.getCareer();
    },
    methods:{
        async getCareer(){
            await this.axios.get("apiv1/carrera").then((response)=>{
               this.career = response.data; 
            })
        }
    },
  }
</script>
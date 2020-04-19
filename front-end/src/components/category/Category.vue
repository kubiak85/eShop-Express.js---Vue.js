<template>
  <div>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-4">Kategoria {{categoryName}}</h1>
        </div>
    </div>
    <div class="container">
      <div v-if="products.length">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Nazwa</th>
              <th scope="col">Opis</th>
              <th scope="col">Cena [ZŁ]</th>
              <th scope="col">Waga [KG]</th>
              <th scope="col">Akcja</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" v-bind:key="product._id">
              <td>{{product.name}}</td>
              <td>{{product.description}}</td>
              <td>{{product.price.$numberDecimal}}</td>
              <td>{{product.weight.$numberDecimal}}</td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="text-center">
          <h3>Brak produktów do wyświetlenia</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue'
import store from '../../store/store';
import * as type from '../../store/mutationTypes/types'

export default {
  name: 'Category',
  data () {
    return {
      categoryName: ""
    }
  },
  computed: mapState({
      products: (state) => {return state.products},
      categories: (state) => {return state.categories},
  }),
  mounted () {
    if(this.$store.state.categories.length ===0){
      Vue.axios.get('http://localhost:3000/categories')
      .then(response => {
        if(response.status === 200){
          store.dispatch({
            type: type.SetCategories,
            categories: response.data
          })
        }
      })
    }

    Vue.axios.get('http://localhost:3000/products')
      .then(response => {
        if(response.status === 200){
          let productList = response.data.filter((val) =>{
            return val.categoryId === this.$route.params.id 
          })
          productList = productList.map((product) => {
              let catName = "Brak kategorii"
              let categoryName = this.$store.state.categories.filter((category)=>{
                return category._id === product.categoryId
              })
              if(categoryName.length > 0)
                catName = categoryName[0]
              
              product.categoryName = catName.name
              return product

          })
          store.dispatch({
            type: type.SetProductsAdmin,
            products: productList
          })
        }
      })

      this.$store.state.categories.forEach(element => {
        if(this.$route.params.id  === element._id)
          this.categoryName = element.name
      });
  },
  
  
}
</script>

<style scoped>

</style>

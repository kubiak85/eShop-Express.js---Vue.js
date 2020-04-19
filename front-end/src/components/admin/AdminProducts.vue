<template>
  <div>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-4">Panel Administratora - Wszystkie towary sklepu</h1>
        </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-6 text-center">
          <h3>Lista produktów</h3>
        </div>
        <div class="col-6 text-center">
          <router-link :to="{ name: 'adminAddProduct'}" class="btn btn-secondary" >Dodaj produkt</router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <hr>
      <div class="row mt-5">
        <div class="col-12">
          <ProductsTable></ProductsTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsTable from '../products/ProductsTable'
export default {
  name: 'AdminProducts',
  components : {
      ProductsTable
  }
}
</script>

<style scoped>
</style>

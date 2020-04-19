<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand"><b>Prawie Allegro</b></router-link>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            
            <li class="nav-item">
              <router-link to="/basket" class="nav-link">Koszyk</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">Dział Administratora</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import { mapState } from 'vuex';
import Vue from 'vue'
import store from './store/store';
import * as type from './store/mutationTypes/types'
export default {
  name: 'app',
  computed: mapState({
      categories: (state) => {return state.categories}
  }),
  mounted () {
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
}
</script>
<style>
</style>

<template>
    <div>
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-4">Panel Administratora - Modyfikacja produktu</h1>
            </div>
        </div>
        <div v-if="init">
            <div class="container">
                <div class="row">
                    <div class="col-6 text-center">
                    <h3>Wypełnij formularz</h3>
                    </div>
                    <div class="col-6 text-center">
                    <router-link :to="{ name: 'adminProducts'}" class="btn btn-secondary" >Powrót do poprzedniej karty</router-link>
                    </div>
                </div>
            </div>
            <div class="container">
                <div v-if="modifyStaus">
                    <div class="alert alert-success mt-3" role="alert">
                        {{modifyStaus}}
                    </div>
                </div>
                <div v-if="errors.length">
                    <div class="alert alert-danger mt-3" role="alert">
                        <ul v-for="error in errors" v-bind:key="error.id">
                            <li>{{error}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row mt-2">
                    <div class="col-12">
                        <form v-on:submit.prevent="onSubmit">
                            <div class="form-group">
                                <label for="nameInput">Nazwa produktu</label>
                                <input type="text" class="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Wpisz nazwę produktu" v-model="name" disabled> 
                                <small id="nameHelp" class="form-text text-muted">Pole wymagane</small>
                            </div>
                            <div class="form-group">
                                <label for="descriptionInput">Opis produktu</label>
                                <textarea class="form-control" id="descriptionInput" aria-describedby="descriptionHelp" rows="3" placeholder="Wpisz opis produktu" v-model="description" disabled></textarea>
                                <small id="descriptionHelp" class="form-text text-muted">Pole wymagane</small>
                            </div>
                            <div class="form-group">
                                <label for="priceInput">Cena produktu</label>
                                <input type="text" class="form-control" id="priceInput" aria-describedby="priceHelp" placeholder="Wpisz cenę produktu" v-model="price">
                                <small id="priceHelp" class="form-text text-muted">Pole wymagane</small>
                            </div>
                            <div class="form-group">
                                <label for="weightInput">Waga produktu</label>
                                <input type="text" class="form-control" id="weightInput" aria-describedby="weightHelp" placeholder="Wpisz wagę produktu" v-model="weight">
                                <small id="weightHelp" class="form-text text-muted">Pole wymagane</small>
                            </div>
                            <div class="form-group">
                                <label for="categoryName">Kategoria produku</label>
                                <select  class="form-control" id="categoryName" v-model="categoryId">
                                        <option v-for="category in categories" v-bind:key="category._id" :value=category._id>
                                            {{ category.name }}
                                        </option>
                                </select>
                            </div>
                            <div class="text-right">
                                <input type="submit" value="Modyfikuj produkt" class="btn btn-primary ">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="container">
                <div class="text-center">
                    <h4>Coś poszło nie tak .... </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue'
export default {
    name: 'Modify',
    data () {
        return {
            id: "",
            name: "",
            description: "",
            price: "",
            weight: "",
            categoryId: "",
            errors: [],
            init: false,
            modifyStaus: ""
        }
    },
    computed: mapState({
      categories: (state) => {return state.categories},
    }),
    mounted () {
        //http://localhost:3000/products/
        Vue.axios.get('http://localhost:3000/products/' + this.$route.params.id)
        .then(response => {
            if(response.status === 200){
                this.init = true
                this.id = response.data._id
                this.name = response.data.name
                this.description = response.data.description
                this.price = response.data.price.$numberDecimal
                this.weight = response.data.weight.$numberDecimal
                this.categoryId = response.data.categoryId
            }
                

        })
    },
    methods:{
        onSubmit () {
            let weightTmp = parseFloat(this.weight)
            let priceTmp = parseFloat(this.price)

        if(isNaN(weightTmp))
            weightTmp = this.weight

        if(isNaN(priceTmp))
            priceTmp = this.price

        this.errors = []
        var _this = this
        
        Vue.axios.put('http://localhost:3000/products/'+_this.id, {
            price: priceTmp,
            weight: weightTmp,
            categoryId: this.categoryId
        })
        .then(function (response) {
            if(response.status === 200)
                _this.modifyStaus = "Zmodyfikowano produkt w bazie danych"
        })
        .catch(function (error) {
            error.response.data.errors.forEach((value) => {
                _this.errors.push(value.msg)
            });
        });
        }
    }
}
</script>
<style scoped>

</style>
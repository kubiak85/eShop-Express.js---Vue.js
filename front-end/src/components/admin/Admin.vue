<template>
  <div>
    <div class="jumbotron">
        <div class="container">
            <h1 class="display-4">Panel Administratora</h1>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h2>Wszystkie towary</h2>
                <p>Przechodząc tutaj ujrzysz wszystkie produkty w formie tabeli.</p>
                <p><router-link :to="{ name: 'adminProducts'}" class="btn btn-secondary" append>Przejdź do strony</router-link></p>
            </div>
            <div class="col-md-4">
                <h2>Niezrealizowane zamówienia</h2>
                <p>Przechodząc tutaj wyświetlisz wszystkie niezrealizowane zamówienia oraz będziesz mógł zmienić ich stan.</p>
                <p><router-link :to="{ name: 'adminUnrealizedOrder'}" class="btn btn-secondary" append>Przejdź do strony</router-link></p>
            </div>
            <div class="col-md-4">
                <h2>Wszystkie zamówienia</h2>
                <p>Przechodząc tutaj będziesz mógł zobaczyć wszystkie zamówienia, które są w sklepie.</p>
                <p><router-link :to="{ name: 'adminAllOrder'}" class="btn btn-secondary" append>Przejdź do strony</router-link></p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin'
}
</script>

<style scoped>

</style>

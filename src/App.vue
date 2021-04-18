<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/books" class="navbar-brand">LF SS Kulathur</a>
      <div class="navbar-nav mr-auto">
<!--        <li class="nav-item">-->
<!--          <a href="/books" class="nav-link">Tutorials</a>-->
<!--        </li>-->
        <li class="nav-item">
          <a href="/add" class="nav-link">Add books</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  // import { Component, Vue } from "vue-property-decorator";
  //
  // @Component
  // export default class App extends Vue {}
  export default {

  }
</script>
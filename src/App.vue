<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/books" class="navbar-brand">LF SS Kulathur</a>
      <div class="navbar-nav ml-auto">
        <li class="nav-item" v-if="isBooksTableView">
          <a href="#" class="nav-link" @click="printBooksList">Print</a>
        </li>
        <li class="nav-item" v-else>
          <a href="/add" class="nav-link">Add Book</a>
        </li>
        <li class="nav-item" v-if="!isBooksTableView">
          <a href="/books/table" class="nav-link">Books List</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component
  export default class App extends Vue {

    get isBooksTableView() {
      return this.$route.path && this.$route.path === '/books/table'
    }

    printBooksList() {
      window.print();
    }
  }
</script>
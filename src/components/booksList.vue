<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Books</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in books"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBook">
        <h4>Book Details</h4>
        <div>
          <label><strong>Book id:</strong></label> {{ currentBook.book_id }}
        </div>
        <div>
          <label><strong>Title:</strong></label> {{ currentBook.title }}
        </div>
        <div>
          <label><strong>Author:</strong></label>
          {{ currentBook.author }}
        </div>
        <div>
          <label><strong>Category:</strong></label>
          {{ currentBook.category }}
        </div>
        <div>
          <label><strong>Type:</strong></label>
          {{ currentBook.type }}
        </div>
        <div>
          <label><strong>Available:</strong></label>
          {{ currentBook.available ? "Available" : "Not available" }}
        </div>

        <a
          class="badge badge-warning"
          :href="'/books/' + currentBook.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please select a book to see details...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TutorialDataService from "../services/bookDataService";

@Component
export default class TutorialsList extends Vue {
  private books: any[] = [];
  private currentBook: any = null;
  private currentIndex = -1;
  private title = "";

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then((response) => {
        this.books = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.currentBook = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: any, index: number) {
    this.currentBook = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.title)
      .then((response) => {
        this.books = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.retrieveTutorials();
  }
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
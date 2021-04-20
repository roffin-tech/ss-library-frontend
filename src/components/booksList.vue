<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input
                        class="form-control"
                        placeholder="Search..."
                        type="text"
                        v-model="title"
                />
            </div>
        </div>
        <div class="col-md-6">
            <h4>Books</h4>
            <ul class="list-group" v-if="booksLengthCheck">
                <li
                        :class="{ active: index == currentIndex }"
                        :key="index"
                        @click="setActiveTutorial(tutorial, index)"
                        class="list-group-item"
                        v-for="(tutorial, index) in booksData"
                >
                    {{ tutorial.title }}
                </li>
            </ul>

            <div class="mt-3" v-else>
                No books found with your current search.
            </div>
        </div>
        <div class="col-md-6">
            <div class="mt-4" v-if="currentBook">
                <h4 style="font-size: 1.4em">Book Details</h4>
                <div class="mt-2 ml-2">
                    <label><strong>Book id:</strong></label> {{ currentBook.book_id }}
                </div>
                <div class="ml-2">
                    <label><strong>Title:</strong></label> {{ currentBook.title }}
                </div>
                <div class="ml-2">
                    <label><strong>Author:</strong></label>
                    {{ currentBook.author }}
                </div>
                <div class="ml-2">
                    <label><strong>Category:</strong></label>
                    {{ currentBook.category }}
                </div>
                <div class="ml-2">
                    <label><strong>Type:</strong></label>
                    {{ currentBook.type }}
                </div>
                <div class="ml-2">
                    <label><strong>Available:</strong></label>
                    {{ currentBook.available ? "Available" : "Not available" }}
                </div>

                <a :href="'/books/' + currentBook.id"
                   class="badge badge-warning ml-2"
                >
                    Edit
                </a>
            </div>
            <div v-else>
                <br/>
                <p v-if="booksLengthCheck">
                    Please select a book to see details...
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TutorialDataService from "../services/bookDataService";

    @Component
    export default class TutorialsList extends Vue {
        private books: any[] = [];
        private currentBook: any = null;
        private currentIndex = -1;
        private title = "";

        get booksLengthCheck() {
            return this.booksData && this.booksData.length > 0;
        }

        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        get booksData() {
            return this.books && this.books.length > 0 ?
                this.books.filter(book => {
                    return (book || {}).title.toLowerCase().includes(this.title.toLowerCase()) ||
                        (book || {}).book_id.toLowerCase().includes(this.title.toLowerCase()) ||
                        (book || {}).author.toLowerCase().includes(this.title.toLowerCase());
                }) : []
        }

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
<template>
    <div class="edit-form" v-if="currentBook">
        <h4>Book</h4>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input class="form-control"
                       id="title"
                       name="title"
                       required
                       type="text"
                       v-model="currentBook.title"
                />
            </div>

            <div class="form-group">
                <label for="book-id">Book id</label>
                <input class="form-control"
                       id="book-id"
                       name="book-id"
                       required
                       v-model="currentBook.book_id"
                />
            </div>

            <div class="form-group">
                <label for="author">Author</label>
                <input class="form-control"
                       id="author"
                       name="author"
                       required
                       v-model="currentBook.author"
                />
            </div>

            <div class="form-group">
                <label for="category">Category</label>
                <input class="form-control"
                       id="category"
                       name="category"
                       required
                       v-model="currentBook.category"
                />
            </div>

            <div class="form-group">
                <label for="type">Reference</label>
                <input class="form-control"
                       id="type"
                       name="type"
                       required
                       type="checkbox"
                       v-model="currentBook.reference"
                />
            </div>

            <div class="form-group">
                <label for="available">Available</label>
                <input class="form-control"
                       id="available"
                       name="available"
                       type="checkbox"
                       v-model="currentBook.available"
                />
            </div>
        </form>
        <button @click="updateBook" class="badge badge-success" type="submit">
            Update details
        </button>
        <p style="color: green">{{ message }}</p>
    </div>

    <div v-else>
        <br/>
        <p>Please select a Book...</p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import BookDataService from "../services/bookDataService";

    @Component
    export default class Book extends Vue {
        private currentBook: any = null;
        private message = "";

        getBook(id: string) {
            BookDataService.get(id)
                .then((response) => {
                    this.currentBook = response.data;
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        updatePublished(status: boolean) {
            const data = {
                title: this.currentBook.title,
                book_id: this.currentBook.book_id,
                author: this.currentBook.author,
                category: this.currentBook.category,
                type: this.currentBook.reference ? "reference" : "general",
                available: this.currentBook.available
            };

            BookDataService.update(this.currentBook.id, data)
                .then((response) => {
                    this.currentBook.published = status;
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        updateBook() {
            BookDataService.update(this.currentBook.id, this.currentBook)
                .then((response) => {
                    console.log(response.data);
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 2000);
                    this.message = "The book was updated successfully!";
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        deleteBook() {
            BookDataService.delete(this.currentBook.id)
                .then((response) => {
                    console.log(response.data);
                    this.$router.push({name: "books"});
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        mounted() {
            this.message = "";
            this.getBook(this.$route.params.id);
        }
    }
</script>

<style scoped>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }

    #type, #available {
        box-shadow: none;
        width: 10%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
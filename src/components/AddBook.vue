<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Title</label>
                <input class="form-control"
                       id="title"
                       name="title"
                       required
                       type="text"
                       v-model="book.title"
                />
            </div>

            <div class="form-group">
                <label for="book-id">Book id</label>
                <input class="form-control"
                       id="book-id"
                       name="book-id"
                       required
                       v-model="book.book_id"
                />
            </div>

            <div class="form-group">
                <label for="author">Author</label>
                <input class="form-control"
                       id="author"
                       name="author"
                       required
                       v-model="book.author"
                />
            </div>

            <div class="form-group">
                <label for="category">Category</label>
                <input class="form-control"
                       id="category"
                       name="category"
                       required
                       v-model="book.category"
                />
            </div>

            <div class="form-group">
                <label for="type">Reference</label>
                <input class="form-control"
                       type="checkbox"
                       id="type"
                       name="type"
                       required
                       v-model="book.reference"
                />
            </div>

            <div class="form-group">
                <label for="available">Available</label>
                <input class="form-control"
                       type="checkbox"
                       id="available"
                       name="available"
                       required
                       v-model="book.available"
                />
            </div>

            <button @click="saveBook" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button @click="newBook" class="btn btn-success">Add</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import BookDataService from "../services/bookDataService";

    @Component
    export default class AddBook extends Vue {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        private book: any = {
            title: "",
            book_id: "",
            author: "",
            reference: false,
            category: "",
            available: true
        };

        private submitted = false;

        saveBook(): void {
            console.log('books data', this.book)
            const data = {
                title: this.book.title,
                book_id: this.book.book_id,
                author: this.book.author,
                category: this.book.category,
                type: this.book.reference ? "reference": "general",
                available: this.book.available
            };

            BookDataService.create(data)
                .then((response) => {
                    this.book.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        newBook(): void {
            this.submitted = false;
            this.book = {};
        }
    }
</script>

<style scoped>
    .submit-form {
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
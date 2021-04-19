<template>
    <div class="table_wrapper">
        <table class="table table-bordered" style="">
            <thead>
            <tr>
                <th :key="index" v-for="(tableHead, index) in booksHeaders" style="text-transform: capitalize">
                    {{tableHead}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr :key="index1" v-for="(value, index1) in booksData">
                <td :key="index2" v-for="(data, index2) in value">
                    {{data}}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TutorialDataService from "@/services/bookDataService";

    @Component({})
    export default class TutorialsList extends Vue {
        public booksData: any = [];

        get booksHeaders() {
            return [
                'id',
                'title',
                'book id',
                'author',
                'category',
                'type',
                'availability',
                'created'
            ]
        }

        mounted() {
            this.retrieveTutorials();
        }

        retrieveTutorials() {
            TutorialDataService.getAll()
                .then((response) => {
                    this.booksData = response.data.map((responseData: any) => {
                        return {
                            id: responseData.id,
                            title: responseData.title,
                            book_id: responseData.book_id,
                            author: responseData.author,
                            category: responseData.category,
                            type: responseData.type,
                            available: responseData.available? "Available": "Not available",
                            created: new Date(responseData.createdAt).toLocaleDateString()
                        }
                    });
                    console.log(this.booksData);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .table_wrapper {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
</style>

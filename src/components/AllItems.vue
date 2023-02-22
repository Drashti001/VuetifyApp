<template>
<v-data-table :headers="headers" :items="lists.itemlist" sort-by="name" text--grey class="elevation-1 ">
    <template v-slot:top>
        <div class="d-flex justify-center ma-4">
            <v-col sm="12">
                <v-alert dense type="primary" v-model="alert" elevation="16" style="opacity: 0.8" border="top" transition="scale-transition" max-height="150" dismissible>
                    {{ message }}
                </v-alert>
            </v-col>
        </div>
        <v-toolbar flat>
            <v-toolbar-title>ALL ITEMS</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ attrs }">
                    <router-link to="/additems">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs">ADD NEW ITEMS</v-btn>
                    </router-link>
                </template>
               <!-- Modal -->
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="12">
                                    <v-text-field v-model="editedItem.name" label="ITEM NAME"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="12">
                                    <v-textarea label="DESCRIPTION" v-model="editedItem.description">
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12" sm="6" md="12">
                                    <v-text-field v-model="editedItem.price" label="ITEM PRICE"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeModel"> Cancel </v-btn>
                        <v-btn color="blue darken-1" text @click="saveModel"> Save </v-btn>
                    </v-card-actions>
                </v-card>
                <!-- Modal Close -->
            </v-dialog>
            <!-- Delete Model Open -->
            <v-dialog v-model="deleteDialog" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this Item!!!</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm(item)">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- Delete Model Close -->
        </v-toolbar>
    </template>
    <!-- status Change Switch format data -->
    <template v-slot:[`item.status`]="{ item }">
        <v-switch v-model="item.status" flat color="primary" :label="`${item.status ? 'Active' : 'Deactive'}`" @change="changeStatus(item)">
        </v-switch>
    </template>
    <!-- status Change Switch format data  close-->
    <!-- delete And Edit Action Icon data  -->
    <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItems(item)"> mdi-delete </v-icon>
    </template>
</v-data-table>
</template>

<script>
// import { mapState } from 'vuex';
import axios from "axios";
export default {
    data() {
        return {
            alert: false,
            search: '',
            pagination: {},
            selected: [],
            lists: [],
            editedIndex: -1,
            editedItem: {
                name: "",
            },
            deleteDialog: false,
            dialog: false,
            message: "",
            headers: [{
                    text: "Id",
                    value: "id"
                },
                {
                    text: "CATEGORY",
                    value: "category"
                },
                {
                    text: "NAME",
                    value: "name"
                },
                {
                    text: "DESCRIPTION",
                    value: "description"
                },
                {
                    text: "PRICE",
                    value: "price"
                },
                {
                    text: "STATUS",
                    value: "status"
                },
                {
                    text: "ACTIONS",
                    value: "actions",
                    sortable: false,
                }

            ]
        }
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

   created() {

        this.$store.dispatch('getItems');
        this.lists = this.$store.state.item;
        // this.lists = this.$store.state.itemlist;
        //console.log(this.lists);
    },
    computed: {
      
    formTitle() {
      return  "Edit Categories";
    },

       
        // ...mapState(['category'])
    },
    methods: {
        //change the status when switch between active or deactive
        async changeStatus(item) {
            await axios.put("http://localhost:3000/itemlist/" + item.id, {
                name: item.name,
                description: item.description,
                price: item.price,
                status: item.status ? true : false,
            });
        },
        // This method open delete confirmation  model
        deleteItems(item) {
            //alert('dfefdd');
            this.editedIndex = this.lists.itemlist.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.deleteDialog = true;
        },
        // This method for Open confirmation model if ok than it will delte the record
        deleteItemConfirm(item) {
            Object.assign(this.lists.itemlist[this.editedIndex], this.editedItem);
            this.$store.dispatch("deleteItems", this.editedItem.id);
            // console.log(this.$store.state.lists.id,'find id');
            this.editedItem = Object.assign({}, item);
            this.closeDelete();

        },
        editItem(item) {
            this.editedIndex = this.lists.itemlist.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        closeDelete() {

            this.deleteDialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        // close Edit Form Model
        closeModel() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        // Update data for json file
        saveModel() {
            if (this.editedIndex > -1) {
                Object.assign(this.lists.itemlist[this.editedIndex], this.editedItem);
                this.$store.dispatch("updateItems", this.editedItem).then(() => {
                    this.message = "Whoo.... Congratulations ! Items Updated Succesfully !!! ";
                    this.alert = true;
                    setTimeout(() => {
                        this.alert = false;
                    }, 3000);
                });
            } else {
                console.log(this.editedIndex);
            }
            this.closeModel();
        },

    }
}
//   computed:mapState([
//     'category'
//   ]),
// }
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
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
</style>

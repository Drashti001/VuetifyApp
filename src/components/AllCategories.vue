<template>
  <v-data-table
    :headers="headers"
    :items="list.category"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <div class="d-flex justify-center ma-4">
        <v-col sm="12">
          <v-alert
            dense
            type="primary"
            v-model="alert"
            elevation="16"
            style="opacity: 0.8"
            border="top"
            transition="scale-transition"
            max-height="150"
            dismissible
          >
            {{ message }}
          </v-alert>
        </v-col>
      </div>
      <v-toolbar flat>
        <v-toolbar-title>ALL ITEM CAREGORIES</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ attrs }">
            <router-link to="/addcg"
              ><v-btn color="primary" dark class="mb-2" v-bind="attrs">ADD NEW CATEGORIES</v-btn>
            </router-link>
          </template>
          <!-- Model Form for Edit -->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="CATEGORIES NAME"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea
                      label="DESCRIPTION"
                      v-model="editedItem.description"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
          <!-- Model Form Edit Close -->
        </v-dialog>
       <!-- Modal for Delete confirmation -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text--grey">Are you sure you want to delete this Category!!! </v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteCategoryConfirm(item)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Delete Model Close -->
      </v-toolbar>
    </template>
    <!-- Changing status using v-switch -->
    <template v-slot:[`item.status`]="{ item }">
      <v-switch
        v-model="item.status"
        flat
        color="primary"
        :label="`${item.status ? 'Active' : 'Deactive'}`"
        @change="changeStatus(item)"
      ></v-switch>
    </template>
   
    <!-- Edit and Delete Action with Icons -->
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteCategories(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    alert: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: "ID",value: "id"},
      {
        text: "CATEGORIES NAME",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "DESCRIPTION", value: "description" },
      { text: "STATUS", value: "status" },
      { text: "ACTIONS", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
      message: "",
  }),
  computed: {
    ...mapGetters(["allcategories"]),
    formTitle() {
      return "Edit Categories";
    },
  },
  created() {
        //alert('fbdjsbgj');
        this.$store.dispatch('getData');
        this.list = this.$store.state.category;
    },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    // status Change open
    async changeStatus(item) {
      await axios.put("http://localhost:3000/category/" + item.id, {
        name: item.name,
        description: item.description,
        status: item.status ? true : false,
      });
    },
    // status Change close
    // open edit model when click on edit icon
    editItem(item) {
      this.editedIndex = this.list.category.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // This method open delete confirmation  model
    deleteCategories(item) {
      //alert('delete confirmation called');
      this.editedIndex = this.list.category.indexOf(item);
      //console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    // This method for Open confirmation model if ok than it will delete the record
    deleteCategoryConfirm(item) {
      Object.assign(this.list.category[this.editedIndex], this.editedItem);
      this.$store.dispatch("deleteCategories", this.editedItem.id);
      
      this.editedItem = Object.assign({}, item);
      this.closeDelete();
    },
    // close Edit Form Model
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    // Close Delete Model
    closeDelete() {
      
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    // Update data for json file
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.list.category[this.editedIndex], this.editedItem);
        this.$store.dispatch("updateCategories", this.editedItem).then(() => {
          this.message = "Whoo.... Congratulations ! Categories Updated Succesfully !!! ";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });
      } else {
        console.log(this.editedIndex);
      }
      this.close();
    },
  },
};
</script>

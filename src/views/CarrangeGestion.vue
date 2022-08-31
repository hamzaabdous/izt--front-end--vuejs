<template>
  <div style="padding: 60px; padding-top: 4%">
    <v-data-table
      :headers="headers"
      :items="carranges"
      :search="search"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>List des Car Range</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#002f6c"
                class="mb-2 btn white--text"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left> mdi-account-multiple-plus </v-icon>
                Add
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.Label"
                        label="Label"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.MinPassengers"
                        label="MinPassengers"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.MaxPassengers"
                        label="MaxPassengers"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.PricePercentage"
                        label="PricePercentage"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="" @click="close(item)">Cancel</v-btn>
                <v-btn color="primary" @click="save(editedItem)">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-toolbar dark color="error">
                <v-toolbar-title>Warning !</v-toolbar-title>
              </v-toolbar>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this Equipment ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="closeDelete">Cancel</v-btn>
                <v-btn depressed color="error" @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="primary"
          class="ml-2 m-2 btn white--text"
          @click="editItem(item)"
        >
          <v-icon medium class="mr-2"> mdi-pencil </v-icon>
        </v-btn>

        <v-btn
          color="#f45"
          class="ml-2 m-2 btn white--text"
          @click="deleteItem(item)"
        >
          <v-icon medium> mdi-delete </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize()"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "id", value: "id", sortable: true },
      { text: "Label", value: "Label", sortable: true },
      {
        text: " MinPassengers",
        value: "MinPassengers",
        sortable: true,
      },
      {
        text: " MaxPassengers",
        value: "MaxPassengers",
        sortable: true,
      },
      {
        text: "PricePercentage (%)",
        value: "PricePercentage",
        sortable: true,
      },
      {
        text: "cars count",
        value: "car.length",
        sortable: true,
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    carranges: [],

    idgrp: null,
    editedIndex: -1,
    editedItem: {
      id: 0,
      Label: "",
      MinPassengers: 0,
      MaxPassengers: 0,
      PricePercentage: 0,
    },
    defaultItem: {
      id: 0,
      Label: "",
      MinPassengers: 0,
      MaxPassengers: 0,
      PricePercentage: 0,
    },
  }),
  mounted() {
    document.title = "user";
    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getCarranges"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
      if (!val) {
        this.editedIndex = -1;
        this.editedItem = {
          id: null,
          name: "",
          profile_group_id: "",
        };
      }
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {},
  methods: {
    initialize() {
      this.setCARRANGSAction().then(() => {
        this.carranges = [...this.getCarranges];
      });
    },
    ...mapActions([
      "setCARRANGSAction",
      "editCARRANGAction",
      "deleteCARRANGAction",
      "addCARRANGAction",
    ]),

    editItem(item) {
      this.editedIndex = this.carranges.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteCARRANGAction(this.editedItem).then(() => {
        this.carranges = this.carranges.filter((e) => {
          return e.id != this.editedItem.id;
        });
      });
      this.editedIndex = -1;
      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.editedIndex == -1) {
        this.addCARRANGAction(this.editedItem).then((equipment) => {
          this.carranges.push(equipment);
        });
      } else {
        this.editCARRANGAction(this.editedItem).then((equipment) => {
          this.carranges = this.carranges.map((c) => {
            if (c.id == equipment.id) return equipment;
            return c;
          });
        });
      }

      this.close();
    },
  },
};
</script>

<style></style>

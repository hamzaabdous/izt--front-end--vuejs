<template>
  <div style="padding: 60px; padding-top: 4%">
    <v-data-table
      :headers="headers"
      :items="reservations"
      :search="search"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>List des reservations</v-toolbar-title>
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
            
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.FirstName"
                        label="FirstName"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.LastName"
                        label="LastName"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.Email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.PhoneNumber"
                        label="PhoneNumber"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.NbrPersons"
                        label="NbrPersons"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.NbrLuggage"
                        label="NbrLuggage"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                        <v-select
                        :items="destinationcarranges"
                        item-text="Price"
                        item-value="id"
                        v-model="editedItem.IdDestinationCarRange"
                        label="Destination Car Range price (DH)"
                        outlined
                      ></v-select>
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
      { text: "id", value: "reservation.id", sortable: true },
      { text: "FirstName", value: "reservation.FirstName", sortable: true },
      { text: "LastName", value: "reservation.LastName", sortable: true },
      { text: "Email", value: "reservation.Email", sortable: true },
      { text: "PhoneNumber", value: "reservation.PhoneNumber", sortable: true },
      { text: "NbrPersons", value: "reservation.NbrPersons", sortable: true },
      { text: "Depart", value: "Depart.Label", sortable: true },
      { text: "Destination", value: "Destination_.Label", sortable: true },
      { text: "Carrange", value: "Carrange.Label", sortable: true },

    ],
    reservations: [],
    idgrp: null,
    editedIndex: -1,
    editedItem: {
      NbrPersons: 0,
      NbrLuggage: 0,
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      IdDestinationCarRange: 0,
      id: 0,
    },
    defaultItem: {
      NbrPersons: 0,
      NbrLuggage: 0,
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      IdDestinationCarRange: 0,
      id: 0,
    },
    destinationcarranges:[],
  }),
  mounted() {
    document.title = "user";
    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getReservation","getDestinationcarranges"]),
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
      this.setRESERVATIONSAction().then(() => {
        this.reservations = [...this.getReservation];
      });
      this.setDESTINATIONCARRANGESAction().then(() => {
        this.destinationcarranges = [...this.getDestinationcarranges];
      });
    },
    ...mapActions([
      "setRESERVATIONSAction",
      "editRESERVATIONAction",
      "deleteRESERVATIONAction",
      "addRESERVATIONAction",
      "setDESTINATIONCARRANGESAction"
    ]),

    editItem(item) {
      this.editedIndex = this.reservations.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteRESERVATIONAction(this.editedItem).then(() => {
        this.reservations = this.reservations.filter((e) => {
          return e.reservation.id != this.editedItem.id;
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
        this.addRESERVATIONAction(this.editedItem).then((equipment) => {
          this.reservations.push(equipment);
        });
      } else {
        this.editRESERVATIONAction(this.editedItem).then((equipment) => {
          this.reservations = this.reservations.map((c) => {
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

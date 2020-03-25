<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="secondary" v-on="on">Assign reviews</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Assign reviews for Employee</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="selectedUsers"
                  :items="users.map(usr => usr.name)"
                  label="Select"
                  multiple
                  chips
                  hint="What are the target regions"
                  persistent-hint
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            :loading="saveBtnIsLoading"
            @click="editUser()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  name: "assignReview",
  props: ["userId"],
  data() {
    return {
      dialog: false,
      saveBtnIsLoading: false,
      users: [],
      selectedUsers: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    editUser() {
      this.saveBtnIsLoading = true;
      axios
        .put(`${process.env.VUE_APP_API_URI}updateUser`, {
          data: {
            id: this.userId,
            user: {
              reviewsTodo: this.selectedUsers
            }
          }
        })
        .then(response => {
          console.log(response);
          this.saveBtnIsLoading = false;
          this.dialog = false;
          this.selectedUsers = [];
          this.$emit("updateUsers");
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.saveBtnIsLoading = false;
        });
    },
    getUsers() {
      axios
        .get(`${process.env.VUE_APP_API_URI}listUser`)
        .then(response => {
          this.users = response.data.data;
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        });
    }
  }
};
</script>

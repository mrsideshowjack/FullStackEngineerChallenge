<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Create User</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Name*"
                  required
                  rounded
                  v-model="userName"
                ></v-text-field>
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
            @click="createUser()"
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
  name: "createUser",
  data() {
    return {
      dialog: false,
      userName: "",
      saveBtnIsLoading: false
    };
  },
  methods: {
    createUser() {
      this.saveBtnIsLoading = true;
      axios
        .post("http://localhost:8888/createUser", {
          data: {
            name: this.userName
          }
        })
        .then(response => {
          console.log(response);
          this.saveBtnIsLoading = false;
          this.dialog = false;
          this.$emit("updateUsers");
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.saveBtnIsLoading = false;
        });
    }
  }
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn small color="secondary" v-on="on">
          <v-icon>mdi-comment-plus</v-icon> Create review</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create reviews for {{ user }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  outlined
                  v-model="reviewBody"
                  label="Performace Review"
                ></v-textarea>
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
            @click="addReview()"
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
  name: "createReview",
  props: ["reviewer", "user"],
  data() {
    return {
      dialog: false,
      saveBtnIsLoading: false,
      reviewBody: ""
    };
  },
  methods: {
    editUser() {
      this.saveBtnIsLoading = true;
      axios
        .put(
          `${process.env.VUE_APP_API_URI ||
            "https://trusting-stonebraker-df23c9.netlify.com/.netlify/functions/"}updateUser`,
          {
            data: {
              id: this.userId,
              user: {
                reviewsTodo: this.selectedUsers
              }
            }
          }
        )
        .then(response => {
          console.log(response);
          this.saveBtnIsLoading = false;
          this.dialog = false;
          this.selectedUsers = [];
          this.$emit("updateUsers");
          // TODO edit the reviewer to remove the reviewtodo from this user
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.saveBtnIsLoading = false;
        });
    },
    addReview() {
      this.saveBtnIsLoading = true;
      axios
        .post(
          `${process.env.VUE_APP_API_URI ||
            "https://trusting-stonebraker-df23c9.netlify.com/.netlify/functions/"}createReview`,
          {
            data: {
              user: this.user,
              authorId: this.reviewer,
              reviewBody: this.reviewBody
            }
          }
        )
        .then(response => {
          console.log(response);
          this.saveBtnIsLoading = false;
          this.dialog = false;
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

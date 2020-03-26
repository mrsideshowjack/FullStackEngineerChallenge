<template>
  <div class="admin">
    <h1>Admin</h1>

    <createUser @updateUsers="getUsers" />

    <div class="user" v-for="user in users" :key="user._id">
      <h2>{{ user.name }}</h2>
      <p>Reviews: {{ user.reviews.length }}</p>

      <assignReview :userId="user._id" @updateUsers="getUsers" />
      <deleteUser :userId="user._id" @updateUsers="getUsers" />
      <editUser :userId="user._id" @updateUsers="getUsers" />
      <p>
        Assigned Reviews Todo:
        <template v-for="user in user.reviewsTodo">{{ user }} </template>
      </p>
      <v-expansion-panels>
        <v-expansion-panel v-for="review in user.reviews" :key="review._id">
          <v-expansion-panel-header
            >{{ user.name }}'s review of
            {{ review.authorId }}</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <p>{{ review.body }}</p>
            <v-btn
              outlined
              small
              color="error"
              :loading="deleteReviewBtnIsLoading"
              @click="deleteReview(user._id, review._id)"
              ><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn
            >
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import createUser from "../components/createUser";
import editUser from "../components/editUser";
import deleteUser from "../components/deleteUser";
import assignReview from "../components/assignReview";
export default {
  name: "admin",
  components: {
    createUser,
    editUser,
    deleteUser,
    assignReview
  },
  data() {
    return {
      error: false,
      users: [],
      deleteReviewBtnIsLoading: false
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get(
          `${process.env.VUE_APP_API_URI ||
            "https://trusting-stonebraker-df23c9.netlify.com/.netlify/functions/"}listUser`
        )
        .then(response => {
          this.users = response.data.data;
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        });
    },
    deleteReview(userId, reviewId) {
      console.log(userId, reviewId);
      this.deleteReviewBtnIsLoading = true;
      axios
        .delete(
          `${process.env.VUE_APP_API_URI ||
            "https://trusting-stonebraker-df23c9.netlify.com/.netlify/functions/"}deleteReview`,
          {
            data: {
              id: userId,
              reviewId: reviewId
            }
          }
        )
        .then(response => {
          console.log("user deleted", response);
          this.deleteReviewBtnIsLoading = false;
          this.getUsers();
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.deleteReviewBtnIsLoading = false;
        });
    }
  }
};
</script>

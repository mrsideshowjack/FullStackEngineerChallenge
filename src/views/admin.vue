<template>
  <div class="admin">
    <h1>This is an admin page</h1>

    Needs to:
    <li>Add/remove/update/view employees</li>
    <li>Add/update/view performance reviews</li>
    <li>
      Assign employees to participate in another employee's performance review
    </li>

    <createUser @updateUsers="getUsers" />

    <div class="user" v-for="user in users" :key="user._id">
      <h2>{{ user.name }}</h2>
      <p>Reviews: {{ user.reviews.length }}</p>

      <deleteUser :userId="user._id" @updateUsers="getUsers" />
      <editUser :userId="user._id" @updateUsers="getUsers" />
      <v-expansion-panels>
        <v-expansion-panel v-for="review in user.reviews" :key="review._id">
          <v-expansion-panel-header
            >review from
            {{ getUserNameById(review.authorId) }}</v-expansion-panel-header
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
    </div>
  </div>
</template>
<script>
import axios from "axios";
import createUser from "../components/createUser";
import editUser from "../components/editUser";
import deleteUser from "../components/deleteUser";
export default {
  name: "admin",
  components: {
    createUser,
    editUser,
    deleteUser
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
        .get("http://localhost:8888/listUser")
        .then(response => {
          this.users = response.data.data;
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        });
    },
    getUserNameById(id) {
      if (!id) return "no author id found";
      let name = this.users.find(usr => {
        return usr._id === id;
      });
      if (name) return name.name;
      return "User does not exsist";
    },
    deleteReview(userId, reviewId) {
      console.log(userId, reviewId);
      this.deleteReviewBtnIsLoading = true;
      axios
        .delete("http://localhost:8888/deleteReview", {
          data: {
            id: userId,
            reviewId: reviewId
          }
        })
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

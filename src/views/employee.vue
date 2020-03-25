<template>
  <div class="employee">
    <template v-if="employee">
      <h1>Hello {{ employee.name }}</h1>

      <h2>Reviews TODO list</h2>
      <p v-if="employee.reviewsTodo.length <= 0">
        <b>Seems like you don't have any reviews to do. Good job 👍</b>
      </p>
      <v-list v-else subheader class="mx-auto" max-width="700">
        <v-subheader>Employees</v-subheader>

        <v-list-item v-for="user in employee.reviewsTodo" :key="user">
          <v-list-item-avatar>
            <v-img :src="'https://i.pravatar.cc/150?u=' + user"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <createReview :reviewer="employee._id" :user="user" />
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <h2>Your reviews</h2>
      <p v-if="employee.reviews.length <= 0">
        <b>Seems like you have not received any reviews yet. </b>
      </p>
      <template v-else>
        <v-card
          class="mx-auto"
          max-width="700"
          outlined
          v-for="review in employee.reviews"
          :key="review._id"
        >
          <v-card-title>Review from {{ review.authorId }}</v-card-title>
          <v-card-text>{{ review.body }}</v-card-text>
        </v-card>
      </template>
    </template>
    <h1 v-else>Could not find employee {{ employee }}</h1>
  </div>
</template>
<script>
import axios from "axios";
import createReview from "../components/createReview";
export default {
  name: "employee",
  components: {
    createReview
  },
  data() {
    return {
      employee: null,
      users: []
    };
  },
  mounted() {
    this.getEmployee();
    this.getUsers();
  },
  watch: {
    $route() {
      this.getEmployee();
    }
  },
  methods: {
    getEmployee() {
      axios
        .get(
          `${process.env.VUE_APP_API_URI}readUser?name=${this.$route.params.id}`
        )
        .then(response => {
          this.employee = response.data.data;
        })
        .catch(error => {
          console.log(error);
          this.error = true;
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

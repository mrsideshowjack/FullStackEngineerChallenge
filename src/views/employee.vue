<template>
  <div class="employee">
    <v-select
      :items="users.map(usr => usr.name)"
      @change="setEmployee"
      label="Outlined style"
      hint="Select employee"
      persistent-hint
      outlined
    ></v-select>
    <template v-if="employee">
      <h1>Hello {{ employee.name }}</h1>

      <h2>Reviews TODO list</h2>
      <p v-if="employee.reviewsTodo.length <= 0">
        <b>Seems like you don't have any reviews to do. Good job 👍</b>
      </p>
      <v-list v-else subheader>
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
  methods: {
    getEmployee() {
      axios
        .get(`http://localhost:8888/readUser?id=${this.$route.params.id}`)
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
        .get("http://localhost:8888/listUser")
        .then(response => {
          this.users = response.data.data;
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        });
    },
    setEmployee(employee) {
      this.$router.push({ name: "employee", params: { employee } });
    }
  }
};
</script>

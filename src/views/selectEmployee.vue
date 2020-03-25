<template>
  <div class="employee">
    <h1>Select employee</h1>
    <p>
      Select an employee for demenstation purposes. Takes the place of a auth
      system.
    </p>
    <v-select
      :items="users.map(usr => usr.name)"
      @change="setEmployee"
      label="Outlined style"
      hint="Select employee"
      persistent-hint
      outlined
    ></v-select>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "selectEmployee",
  data() {
    return {
      employee: null,
      users: []
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
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
    },
    setEmployee(employee) {
      this.$router.push({ name: "employee", params: { id: employee } });
    }
  }
};
</script>

<template>
  <div class="admin">
    <h1>This is an admin page</h1>

    Needs to:
    <li>Add/remove/update/view employees</li>
    <li>Add/update/view performance reviews</li>
    <li>
      Assign employees to participate in another employee's performance review
    </li>

    <div v-for="user in users" :key="user._id">
      <p>{{ user }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "admin",
  data() {
    return {
      error: false,
      users: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:8085/listUser", { crossdomain: true })
      .then(response => {
        this.users = response.data.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  }
};
</script>

<template>
  <v-row justify="center">
    <v-btn outlined small color="error" dark @click.stop="dialog = true">
      Delete User
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>

        <v-card-text>
          Are you sure you wish to delete {{ userId }}?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn
            color="red"
            text
            :loading="deleteBtnIsLoading"
            @click="deleteUser()"
          >
            DELETE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  name: "deleteUser",
  props: ["userId"],
  data() {
    return {
      dialog: false,
      deleteBtnIsLoading: false
    };
  },
  methods: {
    deleteUser() {
      this.deleteBtnIsLoading = true;
      axios
        .delete(
          `${process.env.VUE_APP_API_URI ||
            "https://trusting-stonebraker-df23c9.netlify.com/.netlify/functions/"}deleteUser`,
          {
            data: this.userId
          }
        )
        .then(response => {
          console.log(response);
          this.deleteBtnIsLoading = false;
          this.dialog = false;
          this.$emit("updateUsers");
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.deleteBtnIsLoading = false;
        });
    }
  }
};
</script>

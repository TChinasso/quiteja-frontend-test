<template>
  <div fill-height>
    <v-row class="my-4 d-flex justify-center align-center">
      <div class="text-center d-flex">
        <v-pagination
          v-model="options.page"
          :length="Math.ceil((totalUsers / 12) - 1)"
          circle
        ></v-pagination>
      </div>
    </v-row>
    <div fill-height class="d-flex justify-center" v-if="loading">
      <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
      class="mt-10"
    ></v-progress-circular>
    </div>
    <v-row v-if="!loading" class="pa-6">
      <v-col cols="3" v-for="(user, index) in usersList" :key="index">
        <v-card max-width="400" max-height="400">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="user.picture"></v-img>

          <v-card-title>
            <span class="text-capitalize">{{ `${user.title} ` }}</span
            >.
            {{ `${user.firstName} ` }}
            {{ `${user.lastName}` }}
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              outlined
              @click="openEditUser(user)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              color="red lighten-2"
              text
              outlined
              @click="openDeleteUser(user)"
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <EditUser ref="EditUser" />
    <DeleteUser ref="DeleteUser" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditUser from "@/components/users/EditUser.vue";
import DeleteUser from "@/components/users/DeleteUser.vue";
export default {
  components: {
    EditUser,
    DeleteUser,
  },
  data() {
    return {
      options: {
        page: 1,
        itemsPerPage: 12,
      },
      loading: false,
    };
  },
  async created() {
    await this.getUsers(this.options);
  },
  methods: {
    ...mapActions("users", {
      getUsers: "get",
      editUser: "edit",
      excludeUsers: "exclude",
    }),
    async updateParams(params) {
      let translatedParams = {
        page: params.page,
        view: this.$route.query.view,
      };
      this.$router.push({ query: translatedParams }).catch(() => {});
    },
    updateOptions() {
      Object.assign(this.options, {
        page: Number(this.$route.query.page) || 1,
        itemsPerPage: Number(this.$route.query.limit) || 12,
      });
    },
    openEditUser(user) {
      this.$refs.EditUser.open(JSON.parse(JSON.stringify(user)));
    },
    openDeleteUser(user) {
      this.$refs.DeleteUser.open(JSON.parse(JSON.stringify(user)));
    },
    getLength() {
      return this.options.itemsPerPage / this.totalUsers;
    },
  },
  computed: {
    ...mapGetters("users", {
      usersList: "list",
      totalUsers: "total",
    }),
  },
  watch: {
    options: {
      deep: true,
      async handler(newValue) {
        this.loading = true;
        debugger;
        await this.getUsers(newValue);
        this.updateParams(newValue);
        this.loading = false;
      },
    },
  },
};
</script>

<style>
</style>
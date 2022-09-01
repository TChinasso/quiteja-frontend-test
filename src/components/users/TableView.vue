<template>
  <div>
    <v-data-table
      v-if="$route.query.view == 'table'"
      :headers="headers"
      :items="usersList"
      :options.sync="options"
      :server-items-length="totalUsers"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:[`item.firstName`]="{ item }">
        <td>
          <v-avatar class="mr-2">
            <img :src="item.picture" :alt="item.firstName" />
          </v-avatar>
          <span class="text-capitalize">{{ `${item.title} ` }}</span
          >.
          <span>
            {{ `${item.firstName} ` }}
            {{ `${item.lastName}` }}
          </span>
        </td>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <td class="d-flex align-center justify-end">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon> mdi-dots-vertical </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="openEditUser(item)">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="openDeleteUser(item)">
                <v-list-item-title>Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </td>
      </template>
    </v-data-table>
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
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
          width: "auto",
        },
        { text: "Nome", value: "firstName", sortable: false, align: "start" },
        { text: "Açoes", sortable: false, value: "action", align: "end" },
      ],
      options: {},
      loading: false,
    };
  },
  mounted() {
    this.updateOptions();
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
        limit: params.itemsPerPage,
        view: this.$route.query.view,
      };
      this.$router.push({ query: translatedParams }).catch(() => {});
    },
    updateOptions() {
      Object.assign(this.options, {
        page: Number(this.$route.query.page) || 1,
        itemsPerPage: Number(this.$route.query.limit) || 10,
      });
    },
    openEditUser(user) {
      this.$refs.EditUser.open(JSON.parse(JSON.stringify(user)));
    },
    openDeleteUser(user) {
      this.$refs.DeleteUser.open(JSON.parse(JSON.stringify(user)));
    },
    getLength(){
      return this.options.itemsPerPage / this.totalUsers
    }
  },
  computed: {
    ...mapGetters("users", {
      usersList: "list",
      totalUsers: "total",
    }),
  },
  watch: {
    async options(newValue) {
      this.loading = true;
      await this.getUsers(newValue);
      this.updateParams(newValue);
      this.loading = false;
    },
  },
};
</script>

<style>
</style>
<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-if="user"
    v-model="dialog"
    width="400px"
  >
    <v-card :loading="loading">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>
        <span class="text-capitalize">{{`${user.title} `}}</span>.
          {{`${user.firstName} `}}
          {{`${user.lastName}`}}
      </v-card-title>

      <v-card-text>
        <span>Tem certeza que deseja excluir este usuario?</span>

      </v-card-text>

      <v-card-actions class="pb-2 d-flex justify-center">
        <v-btn color="red lighten-2" text outlined @click="deleteUsr()">
          excluir
        </v-btn>
        <v-btn color="deep-purple lighten-2" text @click="close">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      dialog: false,
      user: null,
      loading: false
    };
  },
  methods: {
    ...mapActions('users', {
      deleteUser: 'delete'
    }),
    open(user) {
      this.dialog = true;
      this.user = user;
    },
    close() {
      this.dialog = false;
      this.user = null;
    },
    async deleteUsr(){
      this.loading = true
      await this.deleteUser(this.user)
      this.dialog = false;
      this.loading = false
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
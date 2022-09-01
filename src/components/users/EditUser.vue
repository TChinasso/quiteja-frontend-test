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

      <v-img
        height="250"
        :src="user.picture"
      ></v-img>

      <v-card-title>
        <span class="text-capitalize">{{`${user.title} `}}</span>.
          {{`${user.firstName} `}}
          {{`${user.lastName}`}}
      </v-card-title>

      <v-card-text>
        <v-text-field
          name="First Name"
          label="First Name"
          id="id"
          v-model="user.firstName"
        ></v-text-field>
        <v-text-field
          name="Last name"
          label="Last name"
          id="id"
          v-model="user.lastName"
        ></v-text-field>
        <v-text-field
          name="title"
          label="title"
          v-model="user.title"
        ></v-text-field>

      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text outlined @click="update">
          Salvar
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
      updateUser: 'update'
    }),
    open(user) {
      this.dialog = true;
      this.user = user;
    },
    close() {
      this.dialog = false;
      this.user = null;
    },
    async update(){
      this.loading = true
      await this.updateUser(this.user)
      this.dialog = false;
      this.loading = false
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
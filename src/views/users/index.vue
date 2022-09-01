<template>
  <div>
    <TableView v-if="$route.query.view == 'table'" />
    <CardsView v-if="$route.query.view == 'card'" />
  </div>
</template>

<script>
import CardsView from "../../components/users/CardsView.vue";
import TableView from "../../components/users/TableView.vue";
export default {
  components: {
    CardsView,
    TableView,
  },
};
</script>

<style>
</style>
<template>
  <v-card>
    <v-card-title>
      Dashboard
    </v-card-title>

    <v-card-text>

      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.component">
          {{item.title}}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.title">
          <component :is="item.component"></component>
        </v-tab-item>
      </v-tabs-items>

    </v-card-text>
  </v-card>
</template>

<script>/* eslint-disable */

import QuestionsTab from "./QuestionsTab";
import AnswersTab from "./AnswersTab";
import StatusTab from "./StatusTab";

export default {
  name: "Dashboard",
  data() {
    return {
      tab: null,
      items: [
        {title: "Question", component: QuestionsTab},
        {title: "answer", component: AnswersTab},
        {title: "stats", component: StatusTab},
      ],
    }
  },
}
</script>

<style scoped>

</style>

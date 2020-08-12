<template>
      <v-card oulined class="fixedCard">
          <v-list class="pa-0">
            <v-list-item class="addBorder"
                         link v-for="item in topics"
                         :key="item.id"
                         :to="{name:'topic',params:{'id':item.id}}"
            >
              <v-avatar size="40" class="mr-4" color="grey">
                <v-img></v-img>
              </v-avatar>
              <v-list-item-content class="headline primary--text">
                <v-list-item-title>
                  {{item.title}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  topics description
                </v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list>
      </v-card>
</template>

<script>/* eslint-disable */
    export default {
        name: "TopicList",
      computed: {
        topics() {
          return this.$store.getters.getTopics;
        }
      },

      created() {
          this.$store.dispatch('retrieveTopics');
      }
    }
</script>

<style scoped>
  .addBorder{
    border-top-style: solid;
    border-width: 1px;
    border-color: rgba(0,0,0,0.2)!important;
  }
  .fixedCard {
    position: sticky;
    top: 50px;
  }
</style>

<template>
  <v-card>
    <v-row>
      <v-col cols="2" class="pa-0">
        <v-navigation-drawer height="100vh" permanent dark>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Application
              </v-list-item-title>
              <v-list-item-subtitle>
                subtext
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.to"
              link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10" class="pa-0">
        <v-card height="100%" color="purple lighten-4">
          <router-view/>
<!--            <app-charts/>-->
<!--        <app-reports/>-->
        </v-card>
      </v-col>
    </v-row>
  </v-card>

</template>

<script>/* eslint-disable */

import Reports from '../components/adminDashboard/Reports'
import Charts from '../components/Charts'

export default {
  components: {
    appReports: Reports,
    appCharts:Charts
  },
  data () {
    return {
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: {name: 'dashboard'}
        },
        {
          title: 'Reports',
          icon: 'mdi-help-box',
          to: {name: 'reports'}
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>

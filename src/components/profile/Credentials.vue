<template>
  <v-card>
    <v-card class="pa-4 my-4">
      <v-card-title>Credentials & Highlights</v-card-title>
      <v-card-text>

        <v-list flat max-width="max-content">

          <v-list-item link @click="openDialog('appEmpCredential')">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content class="indigo--text">
              <v-list-item-title>
                Add Employment Credentials
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="openDialog('appEduCredential')">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content class="indigo--text">
              <v-list-item-title>
                Add Education Credentials
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="openDialog('appLocCredential')">
            <v-list-item-icon></v-list-item-icon>
            <v-list-item-content class="indigo--text">
              <v-list-item-title>
                Add location Credentials
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown"
              :transition="$vuetify.breakpoint.smAndDown?'dialog-bottom-transition':'dialog-transition'"
              v-model="dialog" width="600px">
      <component :is="dialogComponent" @cancel="dialog=false"></component>
    </v-dialog>
  </v-card>
</template>

<script>/* eslint-disable */
  import EmpCredential from "./EmpCredential";
  import EduCredential from "./EduCredential";
  import LocCredential from "./LocCredential";

  export default {
    name: "Credentials",
    components: {
      appEmpCredential: EmpCredential,
      appEduCredential: EduCredential,
      appLocCredential: LocCredential,
    },
    data() {
      return {
        dialog: false,
        dialogComponent: 'appEmpCredential',
      }
    },
    methods: {
      openDialog(componentName) {
        this.dialogComponent = componentName
        this.dialog = true
      }
    },
  }
</script>

<style scoped>

</style>

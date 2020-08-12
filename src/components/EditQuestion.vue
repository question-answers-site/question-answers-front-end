<template>
  <v-card>
    <v-card-title color="grey">
      Edit Question
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="body"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mr-3" @click="cancel">
        Cancel
      </v-btn>
      <v-btn class="mr-3" @click="edit">Edit</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>/* eslint-disable */
  export default {
    props: {
      question: {
        type: Object,
        required:true
      },
    },
    data() {
      return {
        body: this.question.body
      }
    },
    methods: {
      edit() {
        this.question.body = this.body
        this.$store.dispatch('editQuestion',{question:this.question})
        .then(()=>{
          this.cancel()
        })
      },
      cancel() {
        this.$emit('cancel')
      }
    },
  }
</script>

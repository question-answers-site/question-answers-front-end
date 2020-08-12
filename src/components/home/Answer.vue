<template>
  <v-card
    class="mx-auto pt-0"
    flat
  >
    <!--    <v-card-title class="py-0">-->
    <!--      <v-list class="py-0">-->
    <!--        <v-list-item>-->
    <!--          <v-list-item-avatar color="grey">-->
    <!--            <v-img-->
    <!--              class="elevation-6"-->
    <!--              src=""-->
    <!--            ></v-img>-->
    <!--          </v-list-item-avatar>-->
    <!--          <v-list-item-content>-->
    <!--            <v-list-item-title>{{answerUser.first_name}} {{answerUser.last_name}}</v-list-item-title>-->
    <!--            <v-list-item-subtitle>description</v-list-item-subtitle>-->
    <!--          </v-list-item-content>-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-card-title>-->

    <v-card-text class="py-0" v-html="answer.body" style="font-size:18px;"></v-card-text>

    <v-card-actions class="py-0">
      <v-spacer/>
      <!--      <v-avatar color="red">{{answer.votes_value}}</v-avatar>-->
      <!--      option button --------------------------------------------------->
      <v-tooltip top>

        <template v-slot:activator="{ on }">
          <v-badge left overlap bordered :content="answer.upVotesCount">
            <v-btn v-on="on" class="mx-1"
                   small text :color="answer.userReacted===1?'blue':''"
                   @click="vote(1)"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </v-badge>
        </template>
        <span>Up Vote</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-badge left overlap bordered :content="answer.downVotesCount">
            <v-btn small v-on="on" class="mx-1"
                   text :color="answer.userReacted===-1?'blue':''"
                   @click="vote(-1)"
            >
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
          </v-badge>
        </template>
        <span>Down Vote</span>
      </v-tooltip>
      <v-menu left top offset-y transition="scroll-x-reverse-transition">
        <template v-slot:activator="{on}">
          <v-btn text small color="primary" v-on="on">
            ...
          </v-btn>
        </template>

        <v-list>
          <template v-for="(option,index) in answersOptions">
            <v-list-item :key="index"
                         v-if="option.isActive"
                         @click="option.action"
            >
              <v-list-item-action-text>
                {{option.title}}
              </v-list-item-action-text>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-card-actions>

    <v-expand-transition>
      <v-card v-if="expand" flat>
        <v-card-text>
          <ckeditor :editor="editor" v-model="editorData"></ckeditor>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn @click="editAnswer" outlined color="primary">submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>

  </v-card>

</template>

<script>/* eslint-disable */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    name: 'Answer',
    props: {
        answer: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            expand: false,
            editorData: this.answer.body,
            editor: ClassicEditor,
        }
    },
    computed: {

        answerUser() {
            return this.answer.user;
        },

        loggedInUser() {
            return this.$store.getters.user
        },

        isAuthorize() {
            return this.loggedInUser.id === this.answer.user_id
        },

        answersOptions() {
            return [
                {title: 'delete', action: this.deleteAnswer, icon: '', color: 'red', isActive: this.isAuthorize},
                {title: 'edit', action: this.showEditPanel, icon: '', color: 'green', isActive: this.isAuthorize},
                {title: 'report', action: this.reportAnswer1, icon: '', color: 'green', isActive: !this.isAuthorize}
            ];
        }

    },

    methods: {
        showEditPanel() {
            this.expand = !this.expand;
        },

        deleteAnswer() {
            this.$store.dispatch('deleteAnswer', {answer: this.answer})
        },

        editAnswer() {
            this.$store.dispatch('editAnswer', {answer: this.answer})
        },
        reportAnswer1() {
            this.$store.dispatch('reportAnswer', {id: this.answer.id,userId:this.loggedInUser.id})
        },

        vote(value) {
            this.$store.dispatch('answerVote', {
                answer: this.answer,
                value: value
            })
        }

    },

}
</script>

<style scoped>
  /*.addLeftBorder {*/
  /*  border-width: 0;*/
  /*  border-top-width: 1px;*/
  /*  border-bottom-width: 1px;*/
  /*  border-color: green;*/
  /*  border-style: solid;*/
  /*}*/
</style>

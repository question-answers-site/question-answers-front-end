<template>
  <v-card
    outlined
    class="mb-6"
    color="#def7f2"
  >
  <v-card-title class="py-0 blue darken-5" >
        <v-list class="py-0" width="100%">
          <v-list-item class="blue darken-5">
            <v-list-item-avatar color="red">
              <v-img class="elevation-6" v-if="questionUser.image!==null" :src="questionUser.image.url"></v-img>
              <span v-else class="white--text">
                {{questionUser.first_name.charAt(0).toUpperCase()}}
                {{questionUser.last_name.charAt(0).toUpperCase()}}
              </span>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{questionUser.first_name}} {{questionUser.last_name}}</v-list-item-title>
              <v-list-item-subtitle>description</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-menu offset-y transition="scroll-y-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    text
                    style="{font-size: 50px}"
                  >
                    More...
                  </v-btn>
                </template>
                <v-list>
                  <template
                    v-for="(item, index) in listItems"
                  >
                    <v-list-item
                      v-if="item.active"
                      :key="index"
                      @click="item.clicked"
                    >
                      <v-list-item-action-text>{{item.title}}</v-list-item-action-text>
                    </v-list-item>
                  </template>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </v-list-item>

        </v-list>
    </v-card-title>

    <v-divider/>

    <v-card-text class="py-0">
      <v-row v-if="question.topics.length>0" class="d-flex justify-center align-center">
        <v-col cols="auto">
          <v-chip-group
            mobile-break-point="150"
            active-class="primary--text"
          >
            <v-chip :disabled="true" v-for="(tag,index) in question.topics" :key="index">
              {{ tag.title }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-title class="py-0">
<!--      <v-list-item-title class="ml-5 font-weight-bold">-->
        <router-link :to="{name:'questionAnswers',params:{id:question.id}}" tag="div" style="cursor: pointer">
          {{question.body}}
        </router-link>
<!--      </v-list-item-title>-->
    </v-card-title>

    <slot name="answer"/>

    <v-divider/>
    <!--        <v-card-text class="headline font-weight-bold" >-->
    <!--          {{questionContent}}-->
    <!--        </v-card-text>-->

    <v-card-actions>
      <v-btn text color="primary" @click="expand=!expand">
        <v-icon>mdi-pencil-box-outline</v-icon>
        Answer
      </v-btn>

      <v-tooltip top class="ml-2">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="ml-5"
                 text color="secondary"
                 @click="answerRequestDialog=true"
          >
            <v-icon>mdi-account-plus</v-icon>
            Request
          </v-btn>
        </template>
        <span>request someone to answer this question</span>
      </v-tooltip>

    </v-card-actions>
    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown"
              :transition="$vuetify.breakpoint.smAndDown?'dialog-bottom-transition':'dialog-transition'"
              v-model="editQuestionDialog" width="600px">
      <app-edit-question v-if="editQuestionDialog" @cancel="editQuestionDialog=false" :question="question"/>
    </v-dialog>
    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown"
              :transition="$vuetify.breakpoint.smAndDown?'dialog-bottom-transition':'dialog-transition'"
              v-model="answerRequestDialog" width="40vw" scrollable>

      <app-answer-request v-if="answerRequestDialog" :question="question"
                          @cancel="answerRequestDialog=false"
      />

    </v-dialog>
    <v-expand-transition>
      <v-card v-if="expand" flat>
        <v-card-text>
          <ckeditor :editor="editor" v-model="editorData"></ckeditor>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn @click="addAnswer" outlined color="primary">submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>

</template>

<script>/* eslint-disable */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import EditQuestion from '../EditQuestion'
import AnswerRequest from '../layoutDialogs/AnswerRequest'

export default {
    name: 'Question',
    components: {
        appEditQuestion: EditQuestion, appAnswerRequest: AnswerRequest
    },
    props: {
        question: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editor: ClassicEditor,
            editQuestionDialog: false,
            editorData: '',
            expand: false,
            answerRequestDialog: false,
        }
    },
    computed: {
        listItems() {
            return [
                {
                    title: 'edit',
                    clicked: this.editQuestion,
                    active: this.questionUser.id === this.loggedInUser.id
                },
                {
                    title: 'delete',
                    clicked: this.deleteQuestion,
                    active: this.questionUser.id === this.loggedInUser.id
                },
                {
                    title: 'report',
                    clicked: this.reportQuestion,
                    active: this.questionUser.id !== this.loggedInUser.id
                }
            ]
        },
        questionUser() {
            return this.question.user
        },
        loggedInUser() {
            return this.$store.getters.user
        }
    },
    methods: {
        deleteQuestion() {
            this.$store.dispatch('deleteQuestion', this.question.id)
        },
        addAnswer() {
            this.$store.dispatch('addAnswer', {
                editorContent: this.editorData,
                questionId: this.question.id
            })
                .then(response => {
                    this.expand = false;
                })

        },
        editQuestion() {
            this.editQuestionDialog = true
        },
        reportQuestion() {
            this.$store.dispatch('reportQuestion', {
                id: this.question.id,
                userId: this.question.user_id,
            })
        }
    }
}
</script>

<style scoped>

</style>

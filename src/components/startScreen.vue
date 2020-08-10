<script>
// eslint-disable-next-line import/no-webpack-loader-syntax
import howToPlay from 'raw-loader!../assets/howToPlay.txt';
// eslint-disable-next-line import/no-webpack-loader-syntax
import nasilOynanir from 'raw-loader!../assets/nasilOynanir.txt';

export default {
  name: 'startScreen',
  components: {
  },
  props: ['players', 'winCounters'],
  data: () => ({
    isFirstPlayerNumberProper: null,
    isSecondPlayerNumberProper: null,
    dialog: false,
    howToPlay,
    nasilOynanir,
    nameRules: {
      required: (value) => !!value || 'Required.',
      counter: (value) => value.length <= 20 || 'Max 20 characters',
    },
    numberRules: {
      required: (value) => !!value || 'Required.',
      counter: (value) => value.length === 4 || 'Enter a 4 digit number',
    },
    rules: '',
    gameStatus: 'waiting for start',
  }),
  computed: {

  },
  mounted() {
    this.rules = this.howToPlay;
  },
  methods: {
    turkishTranslate() {
      this.rules = this.nasilOynanir;
    },
    englishTranslate() {
      this.rules = this.howToPlay;
    },
    startTheGame() {
      if (this.players.firstPlayer.number.length === 4
      && this.players.secondPlayer.number.length === 4) {
        this.gameStatus = 'game started';
        this.$emit('startTheGame', this.gameStatus);
      } else {
        // eslint-disable-next-line no-alert
        alert('Please make sure both player pick their number according to rules');
      }
    },
  },
};
</script>

<template>
  <v-layout justify-space-around fill-height
        style="background-color:#262626">
        <v-flex xs3 style="text-align:center;margin:75px 40px 20px 40px">
          <br><br>
          <h2 style="color:#30cb00"> {{ players.firstPlayer.name }} : {{winCounters.firstPlayer}}
          <br><br> Enter Your Name and Number Here <br><br>
          </h2>
          <v-layout row wrap justify-center>
            <v-flex xs6>
              <v-text-field
              label="Name"
              outlined
              color="white"
              dark
              :rules="[nameRules.required, nameRules.counter]"
              v-model=" players.firstPlayer.name "
              ></v-text-field>

              <v-text-field
              label="Number"
              outlined
              color="white"
              dark
              type="Password"
              :rules="[numberRules.required, numberRules.counter,]"
              v-model="players.firstPlayer.number"
              persistent-hint
              counter
              maxlength="4"
              hint="Your number should be a 4 digit number without repetition"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs5 style="text-align:center" pt-2>
          <h1 style="color:#ffe505">
            MASTERMIND
          </h1>
          <br> <br>
          <h4 style="color:white">This is a 2 Player Number Guess game.
          The goal at this game is to find your opponent's number before he/she find yours.
          If you dont know the game and rules you can easly read and understand it from here:
          </h4> <br>
          <div>
                <v-btn
                  color="#ffe505"
                  @click="dialog= true"
                >
                  HOW TO PLAY MASTERMIND
                </v-btn>
                <h4 class="red--text mt-3">
                  !!! IF YOU DONT KNOW THE GAME AND THE RULES PLEASE READ HOW TO PLAY !!!
                </h4>
            <v-dialog
              v-model="dialog"
              width="725"
              >
              <v-card>
                <v-card-title class="green">
                  How To Play MASTERMIND
                  <v-layout row wrap justify-end>
                    <v-flex mr-1 xs1>
                      <a @click="turkishTranslate()">
                        <img src="../assets/turkish_flag.png" alt="Turkish flag">
                      </a>
                    </v-flex>
                    <v-flex ml-1 xs1>
                      <a @click="englishTranslate()">
                        <img src="../assets/english_flag.png" alt="English flag">
                      </a>
                    </v-flex>
                  </v-layout>
                </v-card-title>
                <v-card-text>
                  <br>
                  <h3 style="font-family:sans-serif" ref="rules1" v-html="rules"></h3>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                    color="success"
                    text
                    @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> <br>
          </div>
          <br>
          <h4 style="color:white">Since we are ready for the game lets dont waste more time and <br>
          LET'S PLAY!</h4>
          <br>
          <v-btn x-large color="green" @click="startTheGame()">START MASTERMIND</v-btn>
        </v-flex>

        <v-flex xs3 style="text-align:center;margin:75px 40px 20px 40px;">
          <br><br>
          <h2 style="color:red"> {{players.secondPlayer.name}} : {{winCounters.secondPlayer}}
            <br><br> Enter Your Name and Number Here <br><br></h2>
          <v-layout row wrap justify-center>
            <v-flex xs6>
              <v-text-field
              label="Name"
              outlined
              color="white"
              dark
              :rules="[nameRules.required, nameRules.counter]"
              v-model="players.secondPlayer.name"
              ></v-text-field>

              <v-text-field
                label="Number"
                outlined
                color="white"
                dark
                :rules="[numberRules.required, numberRules.counter]"
                persistent-hint
                counter
                maxlength="4"
                type="Password"
                hint="Your number should be a 4 digit number without repetition"
                v-model="players.secondPlayer.number"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
</template>

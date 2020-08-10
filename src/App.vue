<script>

// eslint-disable-next-line import/no-webpack-loader-syntax
import howToPlay from 'raw-loader!./assets/howToPlay.txt';
// eslint-disable-next-line import/no-webpack-loader-syntax
import nasilOynanir from 'raw-loader!./assets/nasilOynanir.txt';

export default {
  name: 'App',
  data: () => ({
    firstPlayerNumber: '',
    secondPlayerNumber: '',
    isFirstPlayerNumberProper: null,
    isSecondPlayerNumberProper: null,
    firstPlayerGuesses: [],
    secondPlayerGuesses: [],
    firstPlayerGuess: null,
    secondPlayerGuess: null,
    firstPlayerResult: null,
    secondPlayerResult: null,
    firstPlayerResults: [],
    secondPlayerResults: [],
    plusResult: 0,
    minusResult: 0,
    winCounterFirstPlayer: 0,
    winCounterSecondPlayer: 0,
    disableGuess1: false,
    disableGuess2: true,
    gameStatus: 'waiting for start',
    winner: '',
    howToPlay,
    nasilOynanir,
    firstPlayer: '1st Player',
    secondPlayer: '2nd Player',
    dialog: false,
    rules: '',
    translate: '<h1>A</h1>',
    nameRules: {
      required: (value) => !!value || 'Required.',
      counter: (value) => value.length <= 20 || 'Max 20 characters',
    },
    numberRules: {
      required: (value) => !!value || 'Required.',
      counter: (value) => value.length === 4 || 'Enter a 4 digit number',
    },
    numbers: [
      { no: 0, color: 'white' },
      { no: 1, color: 'white' },
      { no: 2, color: 'white' },
      { no: 3, color: 'white' },
      { no: 4, color: 'white' },
      { no: 5, color: 'white' },
      { no: 6, color: 'white' },
      { no: 7, color: 'white' },
      { no: 8, color: 'white' },
      { no: 9, color: 'white' },
    ],
    numbers2: [
      { no: 0, color: 'white' },
      { no: 1, color: 'white' },
      { no: 2, color: 'white' },
      { no: 3, color: 'white' },
      { no: 4, color: 'white' },
      { no: 5, color: 'white' },
      { no: 6, color: 'white' },
      { no: 7, color: 'white' },
      { no: 8, color: 'white' },
      { no: 9, color: 'white' },
    ],
    a: '1324',
    b: true,
  }),
  mounted() {
    this.rules = this.howToPlay;
  },
  methods: {
    start() {
      this.gameStatus = 'started';
    },
    changeColor(number) {
      const myNumber = number;
      if (myNumber.color === 'white') {
        myNumber.color = 'green';
      } else if (myNumber.color === 'green') {
        myNumber.color = 'red';
      } else {
        myNumber.color = 'white';
      }
    },
    startTheGame() {
      if (this.firstPlayerNumber.length === 4 && this.secondPlayerNumber.length === 4) {
        this.gameStatus = 'game started';
      } else {
        // eslint-disable-next-line no-alert
        alert('Please make sure both player pick their number according to rules');
      }
    },
    newGame() {
      this.firstPlayerNumber = '';
      this.secondPlayerNumber = '';
      this.isFirstPlayerNumberProper = null;
      this.isSecondPlayerNumberProper = null;
      this.firstPlayerGuesses = [];
      this.secondPlayerGuesses = [];
      this.firstPlayerGuess = null;
      this.secondPlayerGuess = null;
      this.firstPlayerResult = null;
      this.secondPlayerResult = null;
      this.firstPlayerResults = [];
      this.secondPlayerResults = [];
      this.plusResult = 0;
      this.minusResult = 0;
      this.disableGuess1 = false;
      this.disableGuess2 = true;
      this.gameStatus = 'waiting for start';
      this.numbers.forEach((number) => {
        const myNumber = number;
        myNumber.color = 'white';
      });
      this.numbers2.forEach((number) => {
        const myNumber = number;
        myNumber.color = 'white';
      });
    },
    makeGuessFirstPlayer() {
      const array1 = this.firstPlayerGuess.split('');
      array1.forEach((number, index) => {
        if (this.secondPlayerNumber.includes(number)
        && this.secondPlayerNumber.indexOf(number) === index) {
          this.plusResult += 1;
        } else if (this.secondPlayerNumber.includes(number)) {
          this.minusResult += 1;
        }
      });
      this.disableGuess1 = true;
      this.disableGuess2 = false;

      if (this.plusResult === 4) {
        this.winner = this.firstPlayer;
        // eslint-disable-next-line no-alert
        alert(`
        Winner Winner Chicken Dinner! 
        ${this.winner} won the game! What about a return game?
        ${this.firstPlayer}'s number was ${this.firstPlayerNumber} `);
        this.winCounterFirstPlayer += 1;
        this.disableGuess1 = true;
        this.disableGuess2 = true;
      }
      this.firstPlayerResult = `+ ${this.plusResult} - ${this.minusResult}`;
      this.firstPlayerResults.push(this.firstPlayerResult);
      this.firstPlayerGuesses.push(this.firstPlayerGuess);
      this.firstPlayerResult = null;
      this.firstPlayerGuess = null;
      this.plusResult = 0;
      this.minusResult = 0;
      setTimeout(() => {
        const secondPlayerGuessField = this.$refs.secondPlayerGuessField.$el.querySelector('input');
        secondPlayerGuessField.focus();
      }, 100);
    },
    makeGuessSecondPlayer() {
      const array2 = this.secondPlayerGuess.split('');
      array2.forEach((number, index) => {
        if (this.firstPlayerNumber.includes(number)
        && this.firstPlayerNumber.indexOf(number) === index) {
          this.plusResult += 1;
        } else if (this.firstPlayerNumber.includes(number)) {
          this.minusResult += 1;
        }
      });
      this.disableGuess1 = false;
      this.disableGuess2 = true;
      if (this.plusResult === 4) {
        this.winner = this.secondPlayer;
        // eslint-disable-next-line no-alert
        alert(`
        Winner Winner Chicken Dinner! 
        ${this.winner} won the game! 
        ${this.secondPlayer}'s number was ${this.secondPlayerNumber} 
        What about a return game?`);
        this.winCounterSecondPlayer += 1;
        this.disableGuess1 = true;
        this.disableGuess2 = true;
      }
      this.secondPlayerResult = `+ ${this.plusResult} - ${this.minusResult}`;
      this.secondPlayerResults.push(this.secondPlayerResult);
      this.secondPlayerGuesses.push(this.secondPlayerGuess);
      this.secondPlayerResult = null;
      this.secondPlayerGuess = null;
      this.plusResult = 0;
      this.minusResult = 0;
      setTimeout(() => {
        const firstPlayerGuessField = this.$refs.firstPlayerGuessField.$el.querySelector('input');
        firstPlayerGuessField.focus();
      }, 100);
    },
    turkishTranslate() {
      this.rules = this.nasilOynanir;
    },
    englishTranslate() {
      this.rules = this.howToPlay;
    },
  },
};
</script>

<template>
  <v-app>
    <v-main>
      <v-layout v-if="gameStatus === 'waiting for start'" justify-space-around fill-height
        style="background-color:#262626">
        <v-flex xs3 style="text-align:center;margin:75px 40px 20px 40px">
          <br><br>
          <h2 style="color:#30cb00"> {{firstPlayer}} : {{winCounterFirstPlayer}}
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
              v-model="firstPlayer"
              ></v-text-field>

              <v-text-field
              label="Number"
              outlined
              color="white"
              dark
              type="Password"
              :rules="[numberRules.required, numberRules.counter,]"
              v-model="firstPlayerNumber"
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
                        <img src="./assets/turkish_flag.png" alt="Turkish flag">
                      </a>
                    </v-flex>
                    <v-flex ml-1 xs1>
                      <a @click="englishTranslate()">
                        <img src="./assets/english_flag.png" alt="English flag">
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
          <h2 style="color:red"> {{secondPlayer}} : {{winCounterSecondPlayer}}
            <br><br> Enter Your Name and Number Here <br><br></h2>
          <v-layout row wrap justify-center="">
            <v-flex xs6>
              <v-text-field
              label="Name"
              outlined
              color="white"
              dark
              :rules="[nameRules.required, nameRules.counter]"
              v-model="secondPlayer"
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
                v-model="secondPlayerNumber"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout v-if="gameStatus === 'game started'" row wrap text-center justify-space-between
      fill-height style="background-color:#262626">
        <v-flex xs2 style="background-color:green;margin:50px;padding:30px">
          <v-layout row wrap justify-space-between>
            <v-text-field
            dark
            label="Guess"
            outlined
            color="white"
            background-color="black"
            hint="Make your guess and hit Enter"
            persistent-hint
            counter
            maxlength="4"
            :disabled="disableGuess1"
            ref="firstPlayerGuessField"
            v-model="firstPlayerGuess"
            @keyup.enter="makeGuessFirstPlayer"
            ></v-text-field>
            <v-flex xs5 style="color:white">
              <b style="color:white">Guesses</b>
              <hr>
              <h3 v-for="guess in firstPlayerGuesses" :key="guess"> {{guess}} <hr> </h3>
            </v-flex>

            <v-flex xs1>
              <div id="line3"></div>
            </v-flex>

            <v-flex xs5 style="color:white">
              <b>Results</b>
              <hr>
              <h3 v-for="result in firstPlayerResults" :key="result"> {{result}} <hr> </h3>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs2 style="margin:30px">
          <h1 style="color:green;text-align:center">
            {{firstPlayer}} : {{winCounterFirstPlayer}}
          </h1><br>
          <v-layout column wrap>
            <v-flex v-for="number in numbers2" :key="number.no" xs1>
              <v-btn @click="changeColor(number)"
              class="ma-2" fab small :color="number.color">
                <h1>{{number.no}}</h1>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs1 style="margin:15px;text-align:center">
          <v-btn
            color="#ffe505"
            @click="newGame"
            >
            NEW GAME
          </v-btn>

          <div id="line"></div>

          <v-btn
            color="#ffe505"
            @click="dialog = true"
            style="margin:5px"
            >
            RULES
          </v-btn>
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
                        <img src="./assets/turkish_flag.png" alt="Turkish flag">
                      </a>
                    </v-flex>
                    <v-flex ml-1 xs1>
                      <a @click="englishTranslate()">
                        <img src="./assets/english_flag.png" alt="English flag">
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
          </v-dialog>
        </v-flex>

        <v-flex xs2 style="margin:30px;text-align:center">
          <h1 style="color:red;"> {{secondPlayer}} : {{winCounterSecondPlayer}} </h1> <br>
          <v-layout column wrap>
            <v-flex v-for="number in numbers" :key="number.no" xs1>
              <v-btn @click="changeColor(number)" class="ma-2" fab small :color="number.color">
                <h1>{{number.no}}</h1>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs2 style="background-color:#d10a0a;margin:50px;padding:30px">
          <v-layout row wrap justify-space-between>
            <v-text-field
            dark
            label="Guess"
            outlined
            color="white"
            background-color="black"
            hint="Make your guess and hit Enter"
            persistent-hint
            counter
            maxlength="4"
            v-model="secondPlayerGuess"
            :disabled="disableGuess2"
            ref="secondPlayerGuessField"
            @keydown.enter="makeGuessSecondPlayer"
            ></v-text-field>
            <v-flex xs5>
              <strong style="color:white">Guesses</strong>
              <hr>
              <h3 style="color:white" v-for="guess in secondPlayerGuesses" :key="guess">
              {{guess}} <hr> </h3>
            </v-flex>

            <v-flex xs1>
              <div id="line2"></div>
            </v-flex>

            <v-flex xs5 style="color:white">
              <strong>Results</strong>
              <hr>
              <h3 v-for="result in secondPlayerResults" :key="result">{{result}} <hr> </h3>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>

<style>
#line {
  border-left: 5px solid black;
  height: 600px;
  position: relative;
  left: 50%;
  margin-left: -3px;
  top: 10;
  margin-bottom: 5px;
  margin-top: 10px;
}
#line2 {
  border-left: 2px solid white;
  height: 450px;
  position: relative;
  left: 50%;
  margin-left: -3px;
  top: 10;
}
#line3 {
  border-left: 2px solid white;
  height: 450px;
  position: relative;
  left: 50%;
  margin-left: -3px;
  top: 10;
}
.langbutton {
  background-color: transparent;
}
</style>

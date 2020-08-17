<script>

import startScreen from './components/startScreen.vue';
import gameScreen from './components/gameScreen.vue';

export default {
  name: 'App',
  components: {
    startScreen,
    gameScreen,
  },
  data: () => ({
    players: {
      firstPlayer: {
        name: '1st Player',
        number: '',
      },
      secondPlayer: {
        name: '2nd Player',
        number: '',
      },
    },
    winCounters: {
      firstPlayer: 0,
      secondPlayer: 0,
    },
    gameStatus: 'waiting for start',
  }),
  methods: {
    start() {
      this.gameStatus = 'game started';
    },
    newGame() {
      this.gameStatus = 'waiting for start';
    },
  },
};
</script>

<template>
  <v-app>
    <v-main>
      <start-screen :players="players" :winCounters="winCounters"
                    v-if="gameStatus === 'waiting for start'"
                    @startTheGame=" gameStatus = $event "/>
      <game-screen  :players="players" :winCounters="winCounters"
                    v-if="gameStatus === 'game started'"
                    @newGame=" gameStatus = $event "/>
    </v-main>
  </v-app>
</template>

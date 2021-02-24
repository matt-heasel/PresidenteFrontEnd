<template>
  <div>
    <p>
        {{deck}}
    </p>
    <br>
    <br>

    <p :key="i" v-for="(card,i) in hand" @click="selectCard(card)">
        {{card}}
    </p>
  </div>
</template>

<script>

import axios from 'axios';
import store from '../store/index';

export default {
  data() {
    return {
      username: this.$store.state.username,
      pin: this.$store.state.pin,
      deck: '',
    };
  },
  computed: {
    hand() {
      return this.$store.state.hand;
    },
  },
  methods: {
    async selectCard(card) {
      const { data } = await axios.post('http://localhost:5000/play-card', {
        username: this.username,
        game_pin: this.pin,
        card: {
          number: card[0],
          suit: card[1],
        },
      });
      if (data !== 400) {
        store.dispatch('genericStoreUpdate', { property: 'hand', value: data });
      }
    },

  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    playedCard(playedCard) {
      this.deck = playedCard;
    },
  },
};
</script>

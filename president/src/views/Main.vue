<template>
  <div>
    <label for="username">Enter name:</label>
    <input type="username" name="username" id="username" v-model="username">

    <label for="pin">Enter pin:</label>
    <input type="text" name="pin" id="pin" v-model="pin">

    <h1 @click="createGame"> Create Game</h1>
    <h1 @click="joinGame"> Join Game</h1>

    <h3 v-if="joined">JOINED</h3>

    <h1 @click="startGame" v-if="created">Start Game</h1>
  </div>
</template>

<script>

import axios from 'axios';
import store from '../store/index';

export default {
  data() {
    return {
      username: '',
      pin: '',
      joined: false,
      created: false,
    };
  },
  methods: {
    async createGame() {
      console.log('make sure');
      // eslint-disable-next-line camelcase
      const { data: { game_pin } } = await axios.post('http://localhost:5000/create-game', { username: this.username });
      console.log(game_pin);
      this.joined = true;
      this.created = true;
      // eslint-disable-next-line camelcase
      this.pin = game_pin;

      store.dispatch('genericStoreUpdate', { property: 'pin', value: this.pin });
      store.dispatch('genericStoreUpdate', { property: 'username', value: this.username });

      this.subscribe(`${this.username}started`, (payload) => {
        store.dispatch('genericStoreUpdate', { property: 'hand', value: payload });
        this.$router.push('/game');
      });
    },
    async joinGame() {
      console.log('here ');
      await axios.post('http://localhost:5000/join-game', { username: this.username, game_pin: Number(this.pin) });
      this.joined = true;
      this.subscribe(`${this.username}started`, (payload) => {
        store.dispatch('genericStoreUpdate', { property: 'hand', value: payload });
        this.$router.push('/game');
      });

      store.dispatch('genericStoreUpdate', { property: 'pin', value: Number(this.pin) });
      store.dispatch('genericStoreUpdate', { property: 'username', value: this.username });
    },
    async startGame() {
      console.log('here a');
      await axios.post('http://localhost:5000/start-game', { game_pin: Number(this.pin) });
    },
    subscribe(channel, callback) {
      this.$socket.$subscribe(channel, callback);
    },
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    startGame() {
      console.log('gameStarted');
      // this.messages.push(data);
    },
  },
};
</script>

<template>
  <div>
    <h1 @click="test"> {{header}}</h1>
    <label for="message">type message:</label>
    <input type="text" name="message" id="message" v-model="message">
    <button @click="send">Send</button>
    <p v-for="(message,i) in messages" :key=i> {{message}}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      header: 'Hello World',
      message: '',
      messages: [],
    };
  },
  methods: {
    testEmit() {
      console.log('make sure');
      this.$socket.client.emit('test', 'test emit');
    },
    send() {
      this.$socket.client.emit('message', this.message);
      this.message = '';
    },
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    message(data) {
      this.messages.push(data);
    },
  },
};
</script>

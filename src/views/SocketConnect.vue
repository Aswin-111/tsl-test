<template>
    <button v-on:click="send('Hello from Vue.js')">Send</button>
  </template>
  
  <script>
  import io from "socket.io-client";

  export default {
    name: "SocketConnect",
    data() {
      return {
        connection: null,
      };
    },
    methods: {
      send(chat) {
        console.log(this.connection)


        setInterval(() => {
        this.connection.emit('fetchusers'); // Emit the 'fetchusers' event to the server
            
        }, 20000);
      },
    },
    created() {
        


        
        
        this.connection = io('http://localhost:3000'); // Use io() to establish a Socket.io connection
  
      this.connection.on('connect', () => {
        console.log('Connected to the Socket.io server');
        setInterval(() => {
        this.connection.emit('fetchusers'); // Emit the 'fetchusers' event to the server
            
        }, 20000);
      });
  
      this.connection.on('usersupdate', (data) => {
        console.log('Users update received:', data.results[0].count);
        // Handle the received data here
      });
  
      this.connection.on('error', (errorMessage) => {
        console.error('Socket error:', errorMessage);
      });
    },
  };
  </script>
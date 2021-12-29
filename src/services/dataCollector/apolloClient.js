import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
  import { WebSocketLink } from '@apollo/client/link/ws';
  
  // const wsLink = new WebSocketLink({
  //   uri: `ws://127.0.0.1:4000/graphql`,
  //   options: {
  //     reconnect: true,
  //   },
  // });
  
  // const client = new ApolloClient({
  //   uri: 'http://127.0.0.1:4000',
  //   cache: new InMemoryCache(),
  //   link: wsLink
  // });
  
  // export default client;
  


  class ApolloService {

    constructor(){
      const wsLink = new WebSocketLink({
        uri: `ws://127.0.0.1:4000/graphql`,
        options: {
          reconnect: true,
        },
      });
      
      this.client = new ApolloClient({
        uri: 'http://127.0.0.1:4000',
        cache: new InMemoryCache(),
        link: wsLink
      });    
    }

    getClient(){
      return this.client;
    }
  }

  export default new ApolloService();
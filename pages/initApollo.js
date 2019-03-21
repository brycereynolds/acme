import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import { split, ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-fetch';
import ws from 'websocket';

let apolloClient = null
const ssrMode = !process.browser

const GRAPHQL_URL = 'https://api.graph.cool/simple/v1/cjtglgyzg4k6j0105kssa533g'
const WS_URL = 'wss://subscriptions.graph.cool/v1/cjtglgyzg4k6j0105kssa533g'

if (ssrMode) {
  global.fetch = fetch
}

function create(initialState) {
  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   /*
  //   onError receives a callback in the event a GraphQL or network error occurs.
  //   This example is a bit contrived, but in the real world, you could connect
  //   a logging service to the errorLink or perform a specific action in response
  //   to an error.
  //   */
  //   if (graphQLErrors)
  //     graphQLErrors.map(({ message, location, path }) =>
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
  //       )
  //     );
  //   if (networkError) console.log(`[Network error]: ${networkError}`);
  // });
  
  const httpLink = new HttpLink({
    fetch,
    uri: GRAPHQL_URL,
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  })

  let httpOrWsLink = httpLink
  if (!ssrMode) {
    const wsLink = new WebSocketLink({
      uri: WS_URL,
      options: {
        reconnect: true,
      },
      webSocketImpl: ws.client,
    })

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    httpOrWsLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )
  }

  return new ApolloClient({
    ssrMode, // Disables forceFetch on the server (so queries are only run once)
    connectToDevTools: process.browser,
    link: ApolloLink.from([
      httpOrWsLink,
      // errorLink,
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState) {
  if (!process.browser) {
    return create(initialState)
  }

  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}

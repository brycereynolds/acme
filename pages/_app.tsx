import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo';
import initApollo from './initApollo';

// Pass initialState here...
const client = initApollo({});

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <ApolloProvider client={client}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ApolloProvider>
    )
  }
}

export default MyApp

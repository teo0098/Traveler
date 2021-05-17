import Head from "next/head";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { ThemeProvider } from "styled-components";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import GlobalStyles from "../styles/globalStyles";
import theme from "../styles/theme";
import Layout from "../Components/Layout/Layout";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: "ws://localhost:3000/api/subscriptions",
      options: {
        reconnect: true,
      },
    })
  : null;

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink!,
      httpLink
    )
  : null;

const apolloClient = new ApolloClient({
  link: splitLink!,
  cache: new InMemoryCache(),
});

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  </>
);

export default App;

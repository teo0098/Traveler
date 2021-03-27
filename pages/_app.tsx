import Head from 'next/head'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ThemeProvider } from 'styled-components'
import { ApolloClient, InMemoryCache , ApolloProvider} from '@apollo/client'

import GlobalStyles from '../styles/globalStyles'
import theme from '../styles/theme'
import Layout from '../Components/Layout/Layout'

const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
})

const App : React.FC<AppProps> = ({ Component, pageProps } : AppProps) => (
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
)

export default App

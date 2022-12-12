import '../styles/globals.css'
import '../styles/pages/article/content.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/pages/app.module.css'
import { LoadingContextProvider } from '../context/LoadingContext'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>The Peaks</title>
      <meta name="description" content="Latest News" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com/"
        crossOrigin="true"
      />
      <link
        rel="preconnect"
        href="https://fonts.cdnfonts.com/"
        crossOrigin="true"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
    <LoadingContextProvider>
      <Header />
      <main className={styles.page}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </LoadingContextProvider>
  </>
)

export default App

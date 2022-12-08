import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/pages/app.module.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Peaks</title>
        <meta name="description" content="Latest News" />
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
      <Header />
      <div className={styles.page}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}

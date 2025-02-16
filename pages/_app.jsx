import '../styles/globals.css'
import 'prismjs/themes/prism-okaidia.css'

import Head from 'next/head'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Web Developer | Didik Kamseno</title>
        <meta
          name="description"
          content="Creator of HyperUI and an eCommerce developer using the TALL stack and Shopify."
          key="description"
        />
        <meta
          property="og:title"
          content="Web Developer | Didik Kamseno"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Creator of HyperUI and an eCommerce developer using the TALL stack and Shopify."
          key="og:description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.didikkamseno.com/" />
        <meta property="og:image" content="https://www.didikkamseno.com/deka.jpg" />
        <meta
          name="twitter:title"
          content="Web Developer | Didik Kamseno"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="Creator of HyperUI and an eCommerce developer using the TALL stack and Shopify."
          key="twitter:description"
        />
        <meta name="twitter:image" content="https://www.didikkamseno.com/deka.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.didikkamseno.com/" />
        <link rel="icon" href="https://fav.farm/💐" />
      </Head>

      <div className="bg-white dark:bg-slate-900">
        <div className="flex flex-col justify-between max-w-2xl min-h-screen p-4 mx-auto sm:py-8">
          <div>
            <Header />

            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}

export default MyApp

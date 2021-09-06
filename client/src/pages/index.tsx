import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redundit: the front page of the internet</title>
      </Head>

      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-white">
        
        {/* Logo and Titile */}
        <div className="flex items-center">

          <Link href="/">
            <a>
              <img src={"../images/reddit.svg"} className="w-8 h-8 mr-2" />
            </a>
          </Link>

          <span className="text-2xl font-semibold">
            <Link href="/">Redundit</Link>
          </span>

        </div>

        {/* Search Input */}

        {/* Auth Buttons */}
        
      </div>

    </div>
  )
}

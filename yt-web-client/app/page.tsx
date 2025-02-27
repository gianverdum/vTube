import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getVideos } from './firebase/functions';

export default async function Home() {
  const videos = await getVideos();

  return (
    <main>
      {
        videos.map((video) => (
          <Link key={video.id} href={`/watch?v=${video.filename}`}>
            <Image
              src={`/thumbnail.png`}
              alt='video'
              width={120}
              height={80}
              className={styles.thumbnail}
            />
          </Link>
        ))
      }
    </main>
  )
}

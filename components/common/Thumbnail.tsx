import s from './Thumbnail.module.scss'
import cn from 'classnames'
import React, { useState } from 'react'
import { Image } from 'react-datocms/image'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { usePage } from '/lib/context/page'
import { randomInt, truncateText, truncateWords } from '/lib/utils'
import { remark } from 'remark'
import strip from 'strip-markdown'

export type Props = {
  image?: FileField
  slug: string
  title: string
  titleLength?: number
  titleRows?: number
  intro?: string
  meta?: string
}

export default function Thumbnail({ image, slug, intro, title, titleLength, titleRows = 3, meta }: Props) {

  const strippedIntro = truncateWords(remark().use(strip).processSync(intro).value as string, 500)
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={slug} className={s.thumbnail}>
      {image &&
        <div className={s.imageWrap}>
          <>
            <Image
              data={image.responsiveImage}
              className={s.image}
              pictureClassName={s.picture}
              onLoad={() => setLoaded(true)}
            /><div className={s.border}></div>
          </>
        </div>
      }
      <h3 className={cn(s[`rows-${titleRows}`])}>
        <span>
          {titleLength ? truncateWords(title, titleLength) : title}
        </span>
      </h3>
      {(strippedIntro || meta) &&
        <div className="thumb-intro">
          <p>
            {meta && <strong>{meta.trim()}</strong>}
            {strippedIntro}
          </p>
        </div>
      }
    </Link>
  )
}
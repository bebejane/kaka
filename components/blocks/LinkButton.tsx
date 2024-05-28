import s from './LinkButton.module.scss'
import React from 'react'
import { Button } from '/components'
import Link from 'next/link'
import { recordToSlug } from '/lib/utils'

export type LinkButtonBlockProps = { data: LinkButtonRecord, onClick: Function }

export default function LinkButton({ data: { link } }: LinkButtonBlockProps) {

	const slug = link.__typename === 'ExternalLinkRecord' ? link.url : recordToSlug(link.record)
	const title = link.__typename === 'ExternalLinkRecord' ? link.title : link.title

	return (
		<Link href={slug} className={s.button}>
			<Button>
				{title}
			</Button>
		</Link>
	)
}
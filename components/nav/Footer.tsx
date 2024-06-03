import s from './Footer.module.scss'
import cn from 'classnames'
import type { MenuItem } from '/lib/menu'
import KFLogo from '/public/images/kf-logo.svg'
import { usePage } from '/lib/context/page'
import { PROJECT_NAME } from '/lib/constant'

export type FooterProps = {
	menu: MenuItem[]
	footer: GeneralRecord
}

export default function Footer({ footer: { email, facebook, instagram, about } }: FooterProps) {
	const { isHome } = usePage()

	return (
		<footer className={cn(s.footer)} id="footer">
			<section>
				<div>
					Copyright {PROJECT_NAME}, 2024 <br />
					<a href={`mailto:${email}`}>{email}</a>
				</div>
				<div>
					Följ oss <a href={instagram}>Instagram</a>
				</div>
				<div>
					{about}
				</div>
				<KFLogo className={s.kf} />
			</section>
		</footer>
	)
}
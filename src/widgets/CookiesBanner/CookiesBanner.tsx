'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pagesLinks } from '@/shared/constants';
import styles from './CookiesBanner.module.scss';

const COOKIE_CONSENT_STORAGE_KEY = 'tehcomf-cookie-consent';

const CookiesBanner = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		try {
			setIsVisible(
				window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) !== 'accepted',
			);
		} catch {
			setIsVisible(true);
		}
	}, []);

	const acceptCookies = () => {
		try {
			window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted');
		} catch {
			// The banner can still be dismissed when browser storage is unavailable.
		}

		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<aside
			className={styles.banner}
			aria-labelledby='cookies-banner-title'
			aria-live='polite'
		>
			<div className={styles.content}>
				<p className={styles.message}>
					<strong id='cookies-banner-title' className={styles.title}>
						Мы используем cookies<span className={styles.period}>.</span>
					</strong>{' '}
					<span>
						Используя сайт, вы соглашаетесь с{' '}
						<Link
							href={`${pagesLinks.privacyPolicy}/#cookies`}
							className={styles.link}
						>
							обработкой данных
						</Link>{' '}
						с целью сбора аналитики. Cookies можно отключить в любой момент в
						настройках вашего браузера.
					</span>
				</p>

				<button type='button' className={styles.button} onClick={acceptCookies}>
					Хорошо
				</button>
			</div>
		</aside>
	);
};

export default CookiesBanner;

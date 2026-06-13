'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GreenButton from '@/shared/UI/GreenButton/GreenButton';
import PopupForm from '@/widgets/PopupForm/PopupForm';
import styles from './LinkScreen.module.scss';

export interface LinkScreenProps {
	photo: string;
	photoAlt?: string;
	title: string;
	text?: string;
}

const LinkScreen = ({ photo, photoAlt, title, text }: LinkScreenProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'instant',
		});
	}, []);

	return (
		<section className={styles.screen}>
			<PopupForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
			<div className={styles.imageWrapper}>
				<Image
					src={photo}
					alt={photoAlt || ''}
					fill
					priority
					className={styles.image}
				/>
			</div>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.textContent}>
						<h1 className={styles.title}>
							<span className={styles.desktopTitle}>{title}</span>

							<span className={styles.mobileTitle}>
								Надежный партнер по производству мебели
							</span>
						</h1>
						{text && <p className={styles.text}>{text}</p>}
					</div>
					<GreenButton
						classNames={styles.button}
						onClick={() => setIsModalOpen(true)}
					>
						Обсудить проект
					</GreenButton>
				</div>
			</div>
		</section>
	);
};

export default LinkScreen;

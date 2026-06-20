import React, { useEffect, useRef, useState } from 'react';
import styles from './PortfolioCard.module.scss';
import { IWork } from '@/types/IWork';
import MiniTitle from '@/shared/UI/MiniTitle/MiniTitle';
import Link from 'next/link';
import SliderImagesHover from '@/widgets/SliderHover/SliderImagesHover';

interface ICardProps {
	work: IWork;
}

const PortfolioCard = React.memo(({ work }: ICardProps) => {
	const imageBlockRef = useRef<HTMLDivElement | null>(null);
	const [imageBlockWidth, setImageBlockWidth] = useState<number>(0);

	useEffect(() => {
		const imageBlock = imageBlockRef.current;
		if (!imageBlock) return;

		setImageBlockWidth(imageBlock.clientWidth);
	}, []);

	return (
		<Link
			// href={`${pagesLinks.portfolio}/${work.name}`}
			href={'#'}
			className={styles.card}
		>
			<div className={styles.imageBlock} ref={imageBlockRef}>
				{work &&
				work.images &&
				work.images.length > 0 &&
				imageBlockWidth > 0 ? (
					<SliderImagesHover
						widthSlider={imageBlockWidth}
						images={work.images}
					/>
				) : (
					''
				)}
			</div>
			<div className={styles.description}>
				<div className={styles.tags}>
					{[work.tableTopColor, work.bodyColor, ...work.facadeColors]
						.filter(
							(color, num, self) =>
								num ===
								self.findIndex(
									(c) => c && color && c.hexCode === color.hexCode,
								),
						)
						.filter((color, num) => num < 3)
						.map((color, num) => (
							<div
								key={num}
								className={`${styles.tag}`}
								style={
									color.name === 'white'
										? {
												backgroundColor: color.hexCode,
												border: '1.5px solid #58595B',
											}
										: { backgroundColor: color.hexCode }
								}
							></div>
						))}
				</div>
				<div className={styles.type}>
					<span className={styles.typeSpan}>
						{(work.type && work.type.caption) ?? ''}
					</span>
				</div>
				<div className={styles.titleBlock}>
					<MiniTitle classNames={styles.cardTitle}>
						{work.title ?? ''}
					</MiniTitle>
				</div>
				<div className={styles.categories}>
					<span className={`${styles.category} ${styles.firstCategory}`}>
						{(work.style && work.style.caption) ?? ''}
					</span>
					<span className={`${styles.category}`}>
						{(work.layout && work.layout.caption) ?? ''}
					</span>
				</div>
			</div>
		</Link>
	);
});

PortfolioCard.displayName = 'PortfolioCard';

export default PortfolioCard;

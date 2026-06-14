'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import conceptImage1 from '@/data/images/how_we_works/1/image 41.jpg';
import conceptImage2 from '@/data/images/how_we_works/1/image 43.jpg';
import designImage1 from '@/data/images/how_we_works/2/image 44.jpg';
import designImage2 from '@/data/images/how_we_works/2/image 45.jpg';
import equipmentImage1 from '@/data/images/how_we_works/3/Fritz_Egger_Logo-1.png';
import equipmentImage2 from '@/data/images/how_we_works/3/Fritz_Egger_Logo-2.png';
import equipmentImage3 from '@/data/images/how_we_works/3/Fritz_Egger_Logo-3.png';
import equipmentImage4 from '@/data/images/how_we_works/3/Fritz_Egger_Logo.png';
import productionImage1 from '@/data/images/how_we_works/4/image 43.jpg';
import productionImage2 from '@/data/images/how_we_works/4/image 44.jpg';
import installationImage1 from '@/data/images/how_we_works/7/image 44.jpg';
import installationImage2 from '@/data/images/how_we_works/7/image 45.jpg';
import styles from './PartnersHowWeWork.module.scss';

interface WorkStage {
	title: string;
	description: string[];
	images: StaticImageData[];
}

const workStages: WorkStage[] = [
	{
		title: 'Концепция',
		description: [
			'1. Изучаем дизайн-проект заказчика;',
			'2. Определяем назначение мебели, габариты, стиль, цветовую гамму и бюджет;',
			'3. Формируем внешний вид и функционал будущего изделия с учетом технических параметров проекта, пожеланий и необходимых материалов;',
			'4. При необходимости делаем перезамер помещения, чтобы исключить ошибки при проектировании;',
			'5. Создаем детальный эскиз и визуализируем;',
			'6. Финальное согласовывание с клиентом или руководителем проекта (дизайнером).',
		],
		images: [conceptImage1, conceptImage2],
	},
	{
		title: 'Проектирование',
		description: [
			'После полного согласования и подписания договора на изготовление, подготовленные эскизы передаются в конструкторский отдел, где выполняются следующие этапы работ:',
			'1. Деталировка. Разработка чертежей каждого элемента мебели.',
			'2. Создание спецификаций: составление полного списка деталей, необходимого количества плитного материала, фурнитуры, крепежных элементов и аксессуаров.',
			'3. Создаются карты раскроя: оптимизация расположения деталей на листах материала (ЛДСП, МДФ, фанера, дерево) для минимизации отходов и оптимизации ненужных расходов на дополнительное количество материала.',
			'4. Вывод необходимых для производства моделей на специализированном программном обеспечении: работа ведется Базис-Мебельщик, AutoCAD, SolidWorks, bCAD.',
		],
		images: [designImage1, designImage2],
	},
	{
		title: 'Комплектация',
		description: [
			'Когда чертежи готовы, закупается всё необходимое.',
			'Плитные материалы: ЛДСП, МДФ, массив дерева, столешницы.',
			'Кромочные материалы: ПВХ-кромка, меламиновая лента.',
			'Фурнитура: петли, направляющие для ящиков, ручки, подъемные механизмы, конфирматы, эксцентрики и другое.',
			'Расходники: клей, шлифовальные шкурки, сверла, упаковка.',
		],
		images: [
			equipmentImage4,
			equipmentImage1,
			equipmentImage2,
			equipmentImage3,
		],
	},
	{
		title: 'Производство',
		description: [
			'Передаем подготовленный проект в производство.',
			'Изготавливаем детали и выполняем предварительную сборку изделий.',
		],
		images: [productionImage1, productionImage2],
	},
	{
		title: 'Контроль качества',
		description: [
			'1. Распил плитных материалов на детали нужного размера согласно картам раскроя (на форматно-раскроечных станках или станках с ЧПУ).',
			'2. Кромление (облицовка торцов): нанесение кромки на открытые срезы деталей для защиты от влаги и придания эстетичного вида, которую мы клеим исключительно на PUR.',
			'3. Присадки (сверление): выполнение технологических отверстий под крепеж (петли, стяжки, шканты) и фурнитуру.',
			'4. Фрезеровка. Создание пазов, выборка четвертей, фигурная обработка краев при необходимости.',
			'5. Покраска/лакировка (для МДФ или массива): подготовка поверхности, грунтовка, нанесение эмали или лака, сушка.',
		],
		images: [],
	},
	{
		title: 'Логистика',
		description: [
			'Производим обязательный контроль соответствия размеров чертежам, качества кромки, отсутствия сколов.',
			'Контрольная сборка (на производстве): для сложных или нестандартных изделий проводится сборка на фабрике, чтобы убедиться, что все отверстия совпадают, фурнитура работает корректно, а зазоры минимальны. Это позволяет избежать проблем при монтаже у клиента.',
		],
		images: [],
	},
	{
		title: 'Монтаж',
		description: [
			'Упаковываем детали в 3-х слойный гофрокартон, при необходимости дополнительно делаем обрешетку для предотвращения повреждений при транспортировке.',
			'Упаковка всей фурнитуры (винтов, заглушек, ручек) в отдельные пакеты/коробки для удобства монтажа.',
			'Каждая упаковка маркируется, чтобы сборщикам было легко найти нужную деталь.',
		],
		images: [installationImage1, installationImage2],
	},
];

interface StageImagesProps {
	images: StaticImageData[];
	title: string;
	className: string;
}

const StageImages = ({ images, title, className }: StageImagesProps) => {
	if (images.length === 0) return null;

	return (
		<div className={className}>
			{images.map((image, index) => (
				<div
					className={`${styles.imageWrapper} ${
						image.width / image.height > 2 ? styles.imageWrapperWide : ''
					}`}
					key={image.src}
				>
					<Image
						src={image}
						alt={`${title}, изображение ${index + 1}`}
						fill
						sizes='(max-width: 1000px) calc(100vw - 64px), 420px'
						className={`${styles.image} ${
							image.width / image.height > 2 ? styles.imageContain : ''
						}`}
					/>
				</div>
			))}
		</div>
	);
};

const StageDescription = ({ description }: Pick<WorkStage, 'description'>) => (
	<ol className={styles.description}>
		{description.map((paragraph) => (
			<li key={paragraph}>{paragraph}</li>
		))}
	</ol>
);

const PartnersHowWeWork = () => {
	const [activeStageIndex, setActiveStageIndex] = useState<number | null>(0);
	const activeStage = workStages[activeStageIndex ?? 0];

	useEffect(() => {
		const mobileMedia = window.matchMedia('(max-width: 1000px)');
		const handleViewportChange = () => {
			if (!mobileMedia.matches) {
				setActiveStageIndex((currentIndex) => currentIndex ?? 0);
			}
		};

		mobileMedia.addEventListener('change', handleViewportChange);

		return () =>
			mobileMedia.removeEventListener('change', handleViewportChange);
	}, []);

	const handleStageClick = (index: number) => {
		setActiveStageIndex((currentIndex) => {
			const isMobile = window.matchMedia('(max-width: 1000px)').matches;

			if (isMobile && currentIndex === index) return null;

			return index;
		});
	};

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.desktopAside}>
					<h2 className={styles.title}>Как мы работаем</h2>
					<StageImages
						images={activeStage.images}
						title={activeStage.title}
						className={styles.desktopImages}
					/>
				</div>

				<h2 className={`${styles.title} ${styles.mobileTitle}`}>
					Как мы работаем
				</h2>

				<div className={styles.accordion}>
					{workStages.map((stage, index) => {
						const isActive = activeStageIndex === index;
						const contentId = `partners-work-stage-${index}`;

						return (
							<article
								className={`${styles.stage} ${isActive ? styles.stageActive : ''}`}
								key={stage.title}
							>
								<button
									type='button'
									className={styles.stageButton}
									aria-expanded={isActive}
									aria-controls={contentId}
									onClick={() => handleStageClick(index)}
								>
									<span className={styles.stageNumber}>{index + 1}</span>
									<span className={styles.stageTitle}>{stage.title}</span>
									<svg
										className={styles.chevron}
										width='16'
										height='10'
										viewBox='0 0 16 10'
										fill='none'
										aria-hidden='true'
									>
										<path
											d='M2 2L8 8L14 2'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>

								<div
									id={contentId}
									className={styles.stageContent}
									aria-hidden={!isActive}
								>
									<div className={styles.stageContentInner}>
										<StageDescription description={stage.description} />
										<StageImages
											images={stage.images}
											title={stage.title}
											className={styles.mobileImages}
										/>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default PartnersHowWeWork;

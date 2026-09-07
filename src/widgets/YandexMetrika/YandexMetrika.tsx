import { Suspense } from 'react';
import {
	buildYandexMetrikaBootstrap,
	isValidYandexMetrikaCounter,
} from '@/shared/utils/yandexMetrika';
import YandexMetrikaRouteTracker from './YandexMetrikaRouteTracker';

interface YandexMetrikaProps {
	counterId: string;
}

export const YandexMetrikaHead = ({ counterId }: YandexMetrikaProps) => {
	const normalizedCounterId = counterId.trim();

	if (!isValidYandexMetrikaCounter(normalizedCounterId)) {
		return null;
	}

	return (
		<script
			id={`yandex-metrika-${normalizedCounterId}`}
			dangerouslySetInnerHTML={{
				__html: buildYandexMetrikaBootstrap(normalizedCounterId),
			}}
		/>
	);
};

export const YandexMetrika = ({ counterId }: YandexMetrikaProps) => {
	const normalizedCounterId = counterId.trim();

	if (!isValidYandexMetrikaCounter(normalizedCounterId)) {
		return null;
	}

	return (
		<>
			<Suspense fallback={null}>
				<YandexMetrikaRouteTracker counterId={normalizedCounterId} />
			</Suspense>
			<noscript>
				<div>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						alt=''
						height='1'
						src={`https://mc.yandex.ru/watch/${normalizedCounterId}`}
						style={{ left: '-9999px', position: 'absolute' }}
						width='1'
					/>
				</div>
			</noscript>
		</>
	);
};

export default YandexMetrika;

export interface IFilterBudget {
	id: number;
	name: string;
	minValue: number | null;
	maxValue: number | null;
	caption: string;
	type: 'budget';
	order: number;
}

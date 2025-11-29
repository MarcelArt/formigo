export type FormQuestionType = 'text' | 'number' | 'email' | 'phone' | 'date' | 'file' | 'single_select' | 'multi_select' | 'bool' | '';

export interface UpsertFormQuestion {
	ID: number;
	stepId: number;
	label: string;
	key: string;
	type: FormQuestionType;
	options: string[];
	index: number;
	isRequired: boolean;
	organizationId: number;
}

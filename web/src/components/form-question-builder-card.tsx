import { CircleMinus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import type { FormQuestionType, UpsertFormQuestion } from '@/types/form-question';

interface FormQuestionBuilderCardProps {
	value: UpsertFormQuestion;
	onChange: (val: UpsertFormQuestion) => void;
	onDelete: () => void;
}

export function FormQuestionBuilderCard({ value, onChange, onDelete }: FormQuestionBuilderCardProps) {
	const renderOption = () => {
		if (['single_select', 'multi_select'].includes(value.type)) {
			return (
				<>
					{value.options.map((option, i) => (
						<>
							<Label className="col-span-1" htmlFor={`option-${i}`}>
								Option {i + 1}
							</Label>
							<Input
								value={option}
								onChange={(e) => {
									value.options[i] = e.target.value;
									onChange({ ...value, options: value.options });
								}}
								className="col-span-2"
								id={`option-${i}`}
								name={`option-${i}`}
								type="text"
								placeholder={`Option ${i + 1}`}
							/>
							<Button
								onClick={() => {
									value.options.splice(i, 1);
									onChange(value);
								}}
								variant="destructive"
							>
								<Trash2 />
								Remove
							</Button>
						</>
					))}
					<Button
						onClick={() => {
							value.options = [...value.options, ''];
							onChange(value);
						}}
					>
						Add option
					</Button>
				</>
			);
		} else {
			return null;
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Input
						value={value.label}
						onChange={(e) => onChange({ ...value, label: e.target.value })}
						className="col-span-3"
						id="label"
						name="label"
						type="text"
						placeholder="What is your favorite animal?"
					/>
				</CardTitle>
				<CardAction>
					<Button onClick={onDelete} variant="destructive" size="icon-sm" className="rounded-full">
						<CircleMinus />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-4 gap-3">
					<Label className="col-span-1" htmlFor="key">
						Key
					</Label>
					<Input value={value.key} onChange={(e) => onChange({ ...value, key: e.target.value })} className="col-span-3" id="key" name="key" type="text" placeholder="favAnimal" />

					<Label className="col-span-1" htmlFor="type">
						Type
					</Label>
					<Select value={value.type} onValueChange={(type) => onChange({ ...value, type: type as FormQuestionType })}>
						<SelectTrigger className="col-span-3 w-full">
							<SelectValue placeholder="Select field type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Types</SelectLabel>
								<SelectItem value="text">Text</SelectItem>
								<SelectItem value="number">Number</SelectItem>
								<SelectItem value="email">Email</SelectItem>
								<SelectItem value="phone">Phone</SelectItem>
								<SelectItem value="date">Date</SelectItem>
								<SelectItem value="file">File</SelectItem>
								<SelectItem value="single_select">Single choice</SelectItem>
								<SelectItem value="multi_select">Multiple choices</SelectItem>
								<SelectItem value="bool">Checkbox</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{renderOption()}
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex items-center space-x-2">
					<Switch checked={value.isRequired} onCheckedChange={(isRequired) => onChange({ ...value, isRequired })} id="is-required" />
					<Label htmlFor="is-required">Required</Label>
				</div>
			</CardFooter>
		</Card>
	);
}

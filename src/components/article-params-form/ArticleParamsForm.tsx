import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, SyntheticEvent } from 'react';
import { Select } from '../select';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	fontColors,
	backgroundColors,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type TArticleState = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

type ArticleParamsFormProps = {
	articleState: TArticleState;
	setArticleState: (
		articleState: ArticleParamsFormProps['articleState']
	) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	//храним состояние(открыта или закрыта панель)
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLElement>(null);
	//сохраняем состояние форм
	const [formState, setFormState] = useState(defaultArticleState);

	const openClose = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: (newValue: boolean) => setIsOpen(newValue),
	});

	const handleChange = (type: keyof typeof articleState, value: OptionType) => {
		setFormState((prevFormState) => ({
			...prevFormState,
			[type]: value,
		}));
	};

	const handleFormSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={openClose} isOpen={isOpen} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form onSubmit={handleFormSubmit} className={styles.form}>
					<Text as='h2' size={31} weight={800} align='left'>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='шрифт'
						placeholder={
							formState.fontFamilyOption ? formState.fontFamilyOption.title : ''
						}
						onChange={(font) => handleChange('fontFamilyOption', font)}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(fontSize) => handleChange('fontSizeOption', fontSize)}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='цвет шрифта'
						placeholder={formState.fontColor ? formState.fontColor.title : ''}
						onChange={(fontColor) => handleChange('fontColor', fontColor)}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='цвет фона'
						placeholder={
							formState.backgroundColor ? formState.backgroundColor.title : ''
						}
						onChange={(backgroundColor) =>
							handleChange('backgroundColor', backgroundColor)
						}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='цвет фона'
						placeholder={
							formState.contentWidth ? formState.contentWidth.title : ''
						}
						onChange={(contentWidth) =>
							handleChange('contentWidth', contentWidth)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

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

type ArticleParamsFormProps = {
	articleState: {
		fontFamilyOption: OptionType;
		fontSizeOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
	};
	setArticleState: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontSizeOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
		}>
	>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	//храним состояние(открыта или закрыта панель)
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLElement>(null);

	const openClose = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onClose: openClose,
		onChange: setIsOpen,
	});

	//выбранный шрифт
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		articleState.fontFamilyOption
	);

	const handleFontChange = (font: OptionType) => {
		setSelectedFont(font);
	};

	//размер шрифта
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		articleState.fontSizeOption
	);

	const handleFontSizeChange = (fontSize: OptionType) => {
		setSelectedFontSize(fontSize);
	};

	//цвет шрифта
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		articleState.fontColor
	);

	const handleFontColorChange = (fontColor: OptionType) => {
		setSelectedFontColor(fontColor);
	};

	//цвет фона
	const [selectedBackgroundColor, setselectedBackgroundColor] =
		useState<OptionType>(articleState.backgroundColor);

	const handleBackgroundColorChange = (Color: OptionType) => {
		setselectedBackgroundColor(Color);
	};

	//ширина контента
	const [selectedWidth, setselectedWidth] = useState<OptionType>(
		articleState.contentWidth
	);

	const handleWideChange = (Color: OptionType) => {
		setselectedWidth(Color);
	};

	const handleFormSubmit = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
			fontColor: selectedFontColor,
			contentWidth: selectedWidth,
			backgroundColor: selectedBackgroundColor,
		});
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setselectedBackgroundColor(defaultArticleState.backgroundColor);
		setselectedWidth(defaultArticleState.contentWidth);
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
						selected={selectedFont}
						title='шрифт'
						placeholder={selectedFont ? selectedFont.title : ''}
						onChange={handleFontChange}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleFontSizeChange}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						title='цвет шрифта'
						placeholder={selectedFontColor ? selectedFontColor.title : ''}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColor}
						title='цвет фона'
						placeholder={
							selectedBackgroundColor ? selectedBackgroundColor.title : ''
						}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						options={contentWidthArr}
						selected={selectedWidth}
						title='цвет фона'
						placeholder={selectedWidth ? selectedWidth.title : ''}
						onChange={handleWideChange}
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

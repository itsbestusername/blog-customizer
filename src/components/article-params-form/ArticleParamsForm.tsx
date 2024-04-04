import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
import { Select } from '../select';
import {OptionType, fontFamilyOptions, fontSizeOptions, contentWidthArr, fontColors, backgroundColors} from 'src/constants/articleProps';
import {RadioGroup} from '../radio-group';
import {Separator} from '../separator';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';


export const ArticleParamsForm = () => {
	//храним состояние(открыта или закрыта панель)
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openClose = () => {
		setIsOpen(prevIsOpen => !prevIsOpen);
	}


	//выбранный шрифт
	const [selectedFont, setSelectedFont] = useState<OptionType>(fontFamilyOptions[0]);
	
	// Функция для обновления выбранного шрифта
    const handleFontChange = (font: OptionType) => {
        setSelectedFont(font);
    };

	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(fontSizeOptions[0]);

	const handleFontSizeChange = (fontSize: OptionType) => {
        setSelectedFontSize(fontSize);
    };

	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(fontColors[0]);
	
    const handleFontColorChange = (fontColor: OptionType) => {
        setSelectedFontColor(fontColor);
    };

	const [selectedBackgroundColor, setselectedBackgroundColor] = useState<OptionType>(backgroundColors[0]);
	
    const handleBackgroundColorChange = (Color: OptionType) => {
        setselectedBackgroundColor(Color);
    };

	const [selectedWidth, setselectedWidth] = useState<OptionType>(contentWidthArr[0]);
	
    const handleWideChange = (Color: OptionType) => {
        setselectedWidth(Color);
    };


	return (
		<>
			<ArrowButton onClick={openClose} isOpen={isOpen}/>
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<Text as="h2" size={31} weight={800} align="left">
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedFont}
						title="шрифт"
						placeholder={selectedFont ? selectedFont.title : ''} 
						onChange={handleFontChange}
					/>
					<RadioGroup
						name= 'fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleFontSizeChange}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={selectedFontColor}
						title="цвет шрифта"
						placeholder={selectedFontColor ? selectedFontColor.title : ''} 
						onChange={handleFontColorChange}
					/>
					<Separator/>
					<Select
						options={backgroundColors}
						selected={selectedBackgroundColor}
						title="цвет фона"
						placeholder={selectedBackgroundColor ? selectedBackgroundColor.title : ''} 
						onChange={handleBackgroundColorChange}
					/>
					<Select
						options={contentWidthArr}
						selected={selectedWidth}
						title="цвет фона"
						placeholder={selectedWidth ? selectedWidth.title : ''} 
						onChange={handleWideChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

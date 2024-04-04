import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	//храним состояние(открыта или закрыта панель)
	const [isOpen, setIsOpen] = useState<boolean>(false);
	
	// const formElement = useRef<HTMLElement | null>(null);

	const openClose = () => {
		setIsOpen(prevIsOpen => !prevIsOpen);
	}

	return (
		<>
			<ArrowButton onClick={openClose} isOpen={isOpen}/>
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

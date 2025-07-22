import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsFormProps = {
	initialTheme: ArticleStateType;
	setTheme: (newTheme: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialTheme,
	setTheme,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const sideBarRef = useRef<HTMLDivElement | null>(null);

	const [fontFamilyOptionsState, setFontFamilyOptionsState] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeOptionsState, setFontSizeOptionsState] = useState(
		defaultArticleState.fontSizeOption
	);
	const [fontColorsState, setFontColorsStateState] = useState(
		defaultArticleState.fontColor
	);
	const [backgroundColorsState, setBackgroundColorsStateState] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidthArrState, setContentWidthArrStateState] = useState(
		defaultArticleState.contentWidth
	);

	function updateGlobalStates(e: React.FormEvent) {
		e.preventDefault();
		setTheme({
			...initialTheme,
			fontFamilyOption: fontFamilyOptionsState,
			fontSizeOption: fontSizeOptionsState,
			fontColor: fontColorsState,
			backgroundColor: backgroundColorsState,
			contentWidth: contentWidthArrState,
		});
	}

	function onReset() {
		setTheme(defaultArticleState);
		setFontFamilyOptionsState(defaultArticleState.fontFamilyOption);
		setFontSizeOptionsState(defaultArticleState.fontSizeOption);
		setFontColorsStateState(defaultArticleState.fontColor);
		setBackgroundColorsStateState(defaultArticleState.backgroundColor);
		setContentWidthArrStateState(defaultArticleState.contentWidth);
	}

	function closeMenu(): void {
		setIsMenuOpen(false);
	}

	useClose({
		isOpen: isMenuOpen,
		onClose: closeMenu,
		rootRef: sideBarRef,
	});

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={sideBarRef}>
				<form
					className={styles.form}
					onSubmit={updateGlobalStates}
					onClick={(event) => {
						event.stopPropagation();
					}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamilyOptionsState}
						title='Шрифт'
						onChange={setFontFamilyOptionsState}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSizeOptionsState}
						title='Размер шрифта'
						name='fontSizeRadioGroup'
						onChange={setFontSizeOptionsState}
					/>
					<Select
						options={fontColors}
						selected={fontColorsState}
						title='Цвет шрифта'
						onChange={setFontColorsStateState}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColorsState}
						title='Цвет фона'
						onChange={setBackgroundColorsStateState}
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidthArrState}
						title='Ширина контента'
						onChange={setContentWidthArrStateState}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

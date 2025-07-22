import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [theme, setTheme] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': theme.fontFamilyOption.value,
					'--font-size': theme.fontSizeOption.value,
					'--font-color': theme.fontColor.value,
					'--container-width': theme.contentWidth.value,
					'--bg-color': theme.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm initialTheme={theme} setTheme={setTheme} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

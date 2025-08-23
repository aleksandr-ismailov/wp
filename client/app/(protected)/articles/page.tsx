import { ArticlesPage } from '@/views/articles';

interface ArticlesPageProps {
	searchParams: Record<string, string | string[]>;
}

const Articles = (props: ArticlesPageProps) => {
	const { searchParams } = props;

	return <ArticlesPage searchParams={searchParams} />;
};

export default Articles;

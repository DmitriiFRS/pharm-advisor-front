import { Article } from "../model/types";
import ArticleCard from "./ArticleCard";

interface Props {
	articles: Article[];
}

const ArticleList: React.FC<Props> = ({ articles }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-3 md:gap-y-10">
			{articles?.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>
	);
};

export default ArticleList;

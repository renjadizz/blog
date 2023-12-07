import './Article.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import ArticlesCard from '../Articles/ArticlesCard';
import realWorldApiService from '../../utils/realWorldApiSevice';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  let renderString = '';
  async function fetchData() {
    let data = new realWorldApiService();
    data = await data.getArticle(id);
    setArticle(data.article);
  }
  useEffect(() => {
    fetchData();
  }, []);
  if (article) {
    renderString = article.body.replace(/\\n/g, '\n');
    console.log(renderString);
  }

  return article ? (
    <>
      <ArticlesCard articleInfo={article} />
      <Markdown>{renderString}</Markdown>
    </>
  ) : null;
}
export default Article;

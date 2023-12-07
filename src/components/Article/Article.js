import './Article.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import realWorldApiService from '../../utils/realWorldApiSevice';
function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState();
  async function fetchData() {
    let data = new realWorldApiService();
    data = await data.getArticle(id);
    setArticle(data.article);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return <div>{article}</div>;
}
export default Article;

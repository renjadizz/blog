import './Article.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../Loading/Loading';
import ArticlesCard from '../Articles/ArticlesCard';
import realWorldApiService from '../../utils/realWorldApiSevice';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  async function fetchData() {
    setLoading(true);
    let data = new realWorldApiService();
    data = await data.getArticle(id);
    if (data instanceof Error) setError('Article was not Found');
    else setArticle(data.article);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
    let auth = localStorage.getItem('user');
    if (auth) {
      auth = JSON.parse(auth);
      setUser(auth.user);
    }
  }, []);

  return (
    <div className="articles">
      {loading ? <Loading /> : null}
      {error ? <h1>{error}</h1> : null}
      {article ? <ArticlesCard articleInfo={article} isFull={true} user={user} /> : null}
    </div>
  );
}
export default Article;

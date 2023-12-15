import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useLocation } from 'react-router-dom';

import Loading from '../Loading/Loading';
import realWorldApiService from '../../utils/realWorldApiSevice';

import ArticlesCard from './ArticlesCard';
import './Articles.css';

function Articles() {
  const [articles, setArticles] = useState();
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;
  const location = useLocation();
  //console.log(location, '/profile/articles');
  async function fetchData(pageNumber) {
    setLoading(true);
    let data = new realWorldApiService();
    let auth = localStorage.getItem('user');
    let authToken = null;
    let authUsername = null;
    if (auth) {
      auth = JSON.parse(auth);
      authToken = auth.user.token;
      authUsername = auth.user.username;
    }
    data = await data.getArticles(pageNumber, authToken);
    if (data instanceof Error) setError(error.message);
    else {
      let articlesAll = data.articles;
      if (location.pathname === '/profile/articles') {
        articlesAll = articlesAll.filter((article) => article.author.username === authUsername);
        setTotalArticles(articlesAll.length);
      } else setTotalArticles(data.articlesCount);
      setArticles(articlesAll);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData(currentPage);
  }, []);
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  useEffect(() => {
    fetchData(currentPage);
  }, [location.key]);
  return (
    <div className="articles">
      {loading ? <Loading /> : null}
      {error ? <h1>{error}</h1> : null}
      {!loading && !articles ? <p>No Articles found</p> : null}
      {articles ? (
        <>
          {articles.map((element) => {
            return <ArticlesCard articleInfo={element} isFull={false} key={element.slug} />;
          })}
          <Pagination
            defaultCurrent={1}
            pageSize={itemsPerPage}
            total={totalArticles}
            showSizeChanger={false}
            onChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : null}
    </div>
  );
}
export default Articles;

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

  async function fetchData(pageNumber) {
    setLoading(true);
    let data = new realWorldApiService();
    let auth = localStorage.getItem('user');
    if (auth) {
      auth = JSON.parse(auth);
      auth = auth.user.token;
    } else auth = null;
    data = await data.getArticles(pageNumber, auth);
    if (data instanceof Error) setError(error.message);
    else {
      setTotalArticles(data.articlesCount);
      let articlesAll = data.articles;
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

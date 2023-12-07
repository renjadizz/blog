import { useEffect, useState } from 'react';
import { Pagination } from 'antd';

import realWorldApiService from '../../utils/realWorldApiSevice';

import ArticlesCard from './ArticlesCard';

function Article() {
  const [articles, setArticles] = useState();
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  async function fetchData(pageNumber) {
    let data = new realWorldApiService();
    data = await data.getArticles(pageNumber);
    setTotalArticles(data.articlesCount);
    let articlesAll = data.articles;
    setArticles(articlesAll);
  }
  useEffect(() => {
    fetchData(currentPage);
  }, []);
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="articles">
      {!articles ? (
        <p>No Articles found</p>
      ) : (
        <>
          {articles.map((element) => {
            return <ArticlesCard articleInfo={element} key={element.slug} />;
          })}
          <Pagination
            defaultCurrent={1}
            pageSize={itemsPerPage}
            total={totalArticles}
            onChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}
export default Article;

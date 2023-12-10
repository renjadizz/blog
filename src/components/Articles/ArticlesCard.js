import { useNavigate, Link } from 'react-router-dom';
import { Card, Button, message, Popconfirm } from 'antd';
import { format } from 'date-fns';
import './ArticlesCard.css';
import { truncate } from 'lodash';
import Markdown from 'react-markdown';

import realWorldApiService from '../../utils/realWorldApiSevice';
import heartEmpty from '../../icons/heart_empty.svg';
import heartFull from '../../icons/heart_full.svg';

function ArticlesCard({ articleInfo, isFull, user = null }) {
  const navigate = useNavigate();
  const { slug, title, description, tagList, favorited, favoritesCount, createdAt, author, body = null } = articleInfo;
  let renderString = '';
  if (body) {
    renderString = body.replace(/\\n/g, '\n');
  }
  const confirm = async () => {
    let apiService = new realWorldApiService();
    const response = await apiService.articleDelete(slug, user.token);
    if (response instanceof Error) message.error(response.message);
    else {
      message.success('Article was deleted');
      navigate('/');
    }
  };
  let isAuthor = null;
  if (user) {
    isAuthor = user.username === author.username;
  }
  const handleEditClick = () => {
    let article = [slug, title, description, body, tagList];
    navigate(`/articles/${slug}/edit`, { state: article });
  };
  let articleButtons = isAuthor ? (
    <div className="articles-card__header__article-buttons">
      <Popconfirm
        title="Delete the article"
        description="Are you sure to delete this article?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      <Button style={{ color: '#52c41a', borderColor: '#52c41a' }} onClick={handleEditClick}>
        Edit
      </Button>
    </div>
  ) : null;
  return (
    <Card className="articles-card">
      <div className="articles-card__header">
        <div className="articles-card__header__left">
          <span className="articles-card__header__title">
            <Link to={`/articles/${slug}`}>{isFull ? title : truncate(title, { length: 60 })}</Link>
          </span>
          <span className="articles-card__header__likes">
            {favorited ? (
              <img src={heartFull} alt="heartFull" className="articles-card__header__heart" />
            ) : (
              <img className="articles-card__header__heart" src={heartEmpty} alt="heartEmpty" />
            )}
            <span>{favoritesCount}</span>
          </span>
          <div>
            {tagList.map((object, i) => (
              <span
                className={'articles-card__header__tags ' + (isFull ? 'articles-card__header--color-gray' : '')}
                key={i}
              >
                {object}
              </span>
            ))}
          </div>
          <div className={isFull ? 'articles-card__header--color-gray' : ''}>
            {isFull ? description : truncate(description, { length: 150 })}
          </div>
        </div>
        <div>
          <div className="articles-card__header__right">
            <div>
              <p className="articles-card__header__author-name">{author.username}</p>
              <p className="articles-card__header__author-date">{format(new Date(createdAt), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <img className="articles-card__header__author-img" src={author.image} alt="authorImg" />
            </div>
          </div>

          {articleButtons}
        </div>
      </div>
      {isFull ? (
        <div>
          <Markdown>{renderString}</Markdown>
        </div>
      ) : null}
    </Card>
  );
}
export default ArticlesCard;

import { Routes, Route } from 'react-router-dom';

import Articles from '../Articles/Articles';
import Header from '../Header/Header';
import Article from '../Article/Article';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import ArticleNew from '../Article/ArticleNew';
import NotFound from '../NotFound/NotFound';
import PrivateRoutes from '../../utils/PrivateRoutes';
import './App.css';

function App() {
  return (
    <div className="main">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/" element={<Articles />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/articles" element={<Articles />} />
          <Route path="/new-article" element={<ArticleNew />} />
          <Route path="/articles/:id/edit" element={<ArticleNew />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

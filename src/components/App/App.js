import { Routes, Route } from 'react-router-dom';

import Articles from '../Articles/Articles';
import Header from '../Header/Header';
import Article from '../Article/Article';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
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
      </Routes>
    </div>
  );
}

export default App;

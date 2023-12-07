import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Article from '../Article/Article';
import Header from '../Header/Header';
import './App.css';

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/articles" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

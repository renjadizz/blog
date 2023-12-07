import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Articles from '../Article/Articles';
import Header from '../Header/Header';
import './App.css';

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Articles />} exact />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

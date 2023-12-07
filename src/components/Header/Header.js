import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            ReadWorld Blog
          </Link>
        </p>
      </div>
      <div className="header__right">
        <button>Log In</button>
      </div>
    </div>
  );
}
export default Header;

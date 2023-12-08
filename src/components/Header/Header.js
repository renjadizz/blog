import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate('/');
  const handleSignInClick = () => navigate('/sign-in');
  const handleSignUpClick = () => navigate('/sign-up');
  return (
    <div className="header">
      <div className="header__left">
        <Button type="text" onClick={handleHomeClick}>
          ReadWorld Blog
        </Button>
      </div>
      <div className="header__right">
        <Button type="text" onClick={handleSignInClick}>
          Sign In
        </Button>
        <Button type="text" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
export default Header;

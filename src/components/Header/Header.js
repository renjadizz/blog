import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate('/');
  const handleSignInClick = () => navigate('/sign-in');
  const handleSignUpClick = () => navigate('/sign-up');
  const handleCreateNewArticleClick = () => navigate('/new-article');
  const handleLogOutClick = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };
  const userStorage = localStorage.getItem('user');
  let user = null;
  if (userStorage) {
    user = JSON.parse(userStorage);
  }

  const userSide = user ? (
    <>
      <Button type="text" onClick={handleCreateNewArticleClick}>
        Create Article
      </Button>
      <div className="profile" onClick={handleProfileClick}>
        <span>{user.user.username}</span>
        <img src={user.user.image} className="profile-image" />
      </div>
      <Button type="text" onClick={handleLogOutClick}>
        Log Out
      </Button>
    </>
  ) : (
    <>
      <Button type="text" onClick={handleSignInClick}>
        Sign In
      </Button>
      <Button type="text" onClick={handleSignUpClick}>
        Sign Up
      </Button>
    </>
  );
  return (
    <div className="header">
      <div className="header__left">
        <Button type="text" onClick={handleHomeClick}>
          ReadWorld Blog
        </Button>
      </div>
      <div className="header__right">{userSide}</div>
    </div>
  );
}
export default Header;

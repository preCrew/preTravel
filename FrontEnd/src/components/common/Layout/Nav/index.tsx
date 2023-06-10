import NavItem from '../NavItem';

const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-white py-2">
      <ul className="flex items-center justify-around">
        <NavItem
          to="/"
          index={0}
        />
        <NavItem
          to="/myschedule"
          index={1}
        />
        <NavItem
          to="/search"
          index={2}
        />
        <NavItem
          to={`/mypage`}
          index={3}
        />
      </ul>
    </nav>
  );
};

export default Nav;

import { useEffect, useRef } from 'react';
import NavItem from '../NavItem';

export const navH: any = [];

const Nav = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navCurrentH = navRef.current?.offsetHeight;
    navH.push(navCurrentH);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed bottom-0 left-0 z-50 w-full py-1 bg-white"
    >
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

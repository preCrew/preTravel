import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AiOutlineSchedule, AiOutlineUser } from 'react-icons/ai';
import { IconType } from 'react-icons';
import { BiHome } from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs';
import { GrFormSchedule, GrMapLocation } from 'react-icons/gr';

interface INavItemProps {
  to: string;
  index: number;
}

const NavItem = ({ to, index }: INavItemProps) => {
  const location = useLocation();
  const iconstyle = 'm-auto';
  const navActivStyle =
    to === location.pathname ? `${iconstyle}` : `${iconstyle} text-gray-500`;

  const iconArr = [
    <BiHome
      className={navActivStyle}
      size={20}
    />,
    <AiOutlineSchedule
      className={navActivStyle}
      size={20}
    />,
    <BsPencil
      className={navActivStyle}
      size={20}
    />,
    <AiOutlineUser
      className={navActivStyle}
      size={20}
    />,
  ];

  return (
    <li className="flex-1 p-2">
      <Link to={to}>{iconArr[index]}</Link>
    </li>
  );
};

export default NavItem;

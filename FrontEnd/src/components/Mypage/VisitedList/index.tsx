import { Link } from 'react-router-dom';
import tw from 'twin.macro';

interface VisitedListProps {
  data: any;
}

const VisitedList = ({ data }: VisitedListProps) => {
  const allPlaceCount = () => {
    const count = data.schedule.reduce((acc: any, current: any) => {
      return acc + current.list.length;
    }, 0);

    return count;
  };

  return (
    <li
      css={tw`shadow-lg bg-gray2 shadow-[0px 6px 10px 0px rgba(0,0,0,0.15)] rounded p-4 relative [&+li]:mt-6`}
    >
      <Link
        to={'list'}
        state={{ list: data.schedule }}
      >
        <h3 css={tw`mb-1 text-body3Bold`}>{data.city}</h3>
        <p css={tw`mb-3 text-body1Bold`}>{data.name}</p>
        <small css={tw`text-body4 text-gray1`}>
          {data.schedule[0].date} ~{' '}
          {data.schedule[data.schedule.length - 1].date}
        </small>
        <strong
          css={tw`absolute top-3.5 right-3.5 text-body4Bold bg-primary1 rounded text-white py-1 px-2`}
        >
          {allPlaceCount()}개의 장소
        </strong>
      </Link>
    </li>
  );
};

export default VisitedList;

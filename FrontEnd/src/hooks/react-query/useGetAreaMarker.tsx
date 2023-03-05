import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import { userFavoriteAtom } from '@src/recoil/user/getLike/atom';

interface ILikeMapData {
  memberIdx: string | null;
  smallLa: string | null;
  largeLa: string | null;
  smallLo: string | null;
  largeLo: string | null;
}

const areaMarekerFunc = async (data: ILikeMapData) => {
  try {
    const response = await axios.post(
      `https://port-0-pretravel-ll32glc6adwo3.gksl2.cloudtype.app/like`,
      { data },
    );

    return response.data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

const useGetAreaMarker = () => {
  const [userLikeState, setUserLikeState] = useRecoilState(userFavoriteAtom);

  const result = useMutation(areaMarekerFunc, {
    onMutate: variables => {
      //console.log(variables);
    },
    onSuccess: (data, variables, context) => {
      console.log(data, variables);
      setUserLikeState(data.data);
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });

  return result;
};

export default useGetAreaMarker;

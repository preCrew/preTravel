import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const add = async (data: any) => {
  try {
    axios.post(`${process.env.REAL_SERVER_URL}/spot`, data);
  } catch (err) {
    throw err;
  }
};

const useAddPlaceinScehduleQuery = () => {
  const navigate = useNavigate();

  return useMutation(['addMyScheduleDetail'], {
    mutationFn: (data: any) => add(data),
    onSuccess: (data: any, value) => {
      navigate(`/mySchedule/${value.sctIdx}`);
      //console.log('!');
    },
    onMutate: () => {
      //console.log('!');
    },
    onSettled: data => {
      //console.log('111', data);
    },
    onError: () => {
      console.log('!!!@#@!#');
    },
  });
};

export default useAddPlaceinScehduleQuery;

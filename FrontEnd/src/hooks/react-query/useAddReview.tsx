import { useQuery } from '@tanstack/react-query';

const addReview = (id: string) => {};
const useAddReview = (id: string) => useQuery(['review'], () => addReview(id));

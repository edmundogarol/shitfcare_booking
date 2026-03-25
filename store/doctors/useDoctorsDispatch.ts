import { useDispatch } from "react-redux";
import { setDoctors, setError, setLoading } from "./doctors";

export const useBookingDispatch = () => {
  const dispatch = useDispatch();
  return {
    setDoctors: (doctors: any) => dispatch(setDoctors(doctors)),
    setLoading: (loading: boolean) => dispatch(setLoading(loading)),
    setError: (error: string | null) => dispatch(setError(error)),
  };
};

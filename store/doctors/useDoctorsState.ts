import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useDoctorsState = () => {
  const doctors = useSelector((state: RootState) => state.doctors);
  return doctors;
};

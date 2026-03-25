import { doctorsScheduleAPI } from "@/app/api/doctorsScheduleAPI";
import { useBookingDispatch } from "@/store/doctors/useDoctorsDispatch";
import { useDoctorsState } from "@/store/doctors/useDoctorsState";
import { useEffect } from "react";

export const useGetDoctorAvailabilities: () => void = () => {
  const { doctors } = useDoctorsState();
  const { setDoctors } = useBookingDispatch();

  const fetchDoctors = async () => {
    try {
      const data = await doctorsScheduleAPI();
      setDoctors(data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Loading finished");
    }
  };

  useEffect(() => {
    console.log({ doctors });
    if (doctors.length === 0) {
      console.log({ fetchDoctors });
      fetchDoctors();
    }
  }, [doctors]);
};

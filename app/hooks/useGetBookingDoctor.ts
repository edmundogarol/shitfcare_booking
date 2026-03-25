import { useGetDoctorAvailabilities } from "../(tabs)/Landing/hooks/useGetDoctorAvailabilities";
import { useProcessDoctorsSchedule } from "../(tabs)/Landing/hooks/useProcessDoctorsSchedule";

export const useGetBookingDoctor = (): ((bookingKey: string) => string) => {
  useGetDoctorAvailabilities();
  const processedDoctors = useProcessDoctorsSchedule();

  return (bookingKey: string) => {
    let doctorName = "Unknown Doctor";
    Object.keys(processedDoctors).forEach((name) => {
      if (bookingKey.includes(name.replace(/ /g, ""))) {
        doctorName = name;
      }
    });
    return doctorName;
  };
};
export default useGetBookingDoctor;

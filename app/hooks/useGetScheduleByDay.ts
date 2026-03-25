import { useProcessDoctorsSchedule } from "../(tabs)/Landing/hooks/useProcessDoctorsSchedule";
import useGenerate30mTimeSlots from "./useGenerate30mTimeSlots";

export const useGetScheduleByDay = (): ((doctor: string) => {
  [dayOfWeek: string]: string[];
}) => {
  const doctorsProcessed = useProcessDoctorsSchedule();

  return (doctor: string) => {
    const doctorSchedule = doctorsProcessed[doctor.toString()];
    const generate30mTimeSlots = useGenerate30mTimeSlots();

    const scheduleByDay = doctorSchedule?.reduce(
      (acc, availability) => {
        if (!acc[availability.day_of_week]) {
          acc[availability.day_of_week] = [];
        }
        acc[availability.day_of_week].push(
          ...generate30mTimeSlots(
            availability.available_at,
            availability.available_until,
          ),
        );
        return acc;
      },
      {} as { [dayOfWeek: string]: string[] },
    );

    return scheduleByDay;
  };
};

export default useGetScheduleByDay;

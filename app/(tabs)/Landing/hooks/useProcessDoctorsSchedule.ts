import { Doctor } from "@/store/doctors/doctors";
import { useDoctorsState } from "@/store/doctors/useDoctorsState";

export const useProcessDoctorsSchedule = () => {
  const { doctors } = useDoctorsState();

  let doctorsBookingsMapped: {
    [doctorName: string]: Doctor[];
  } = {};

  doctors.map((doctor) => {
    const doctorName = doctor.name;

    if (!doctorsBookingsMapped[doctorName]) {
      doctorsBookingsMapped[doctorName] = [];
    }

    doctorsBookingsMapped[doctorName].push({
      ...doctor,
    });
  });

  return doctorsBookingsMapped;
};

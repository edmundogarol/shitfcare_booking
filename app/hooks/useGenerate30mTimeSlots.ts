import moment from "moment";

export const useGenerate30mTimeSlots = (): ((
  start: string,
  end: string,
) => string[]) => {
  return (start: string, end: string) => {
    const slots: string[] = [];

    const startHour = parseInt(moment(start, "HH:mm A").format("HH"), 10);
    const endHour = parseInt(moment(end, "HH:mm A").format("HH"), 10);

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };
};

export default useGenerate30mTimeSlots;

import moment from "moment";

export const useGetBookingTime = (): ((
  bookingKey: string,
  doctor: string,
) => string) => {
  return (bookingKey: string, doctor: string) => {
    const timePart = bookingKey.replace(
      `booking-${doctor.replace(/ /g, "")}-`,
      "",
    );
    return moment(timePart, "ddddh:mmA").format("dddd, MMMM Do YYYY, h:mm A");
  };
};

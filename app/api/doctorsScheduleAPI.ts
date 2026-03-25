import axios from "axios";

// Won't make this able to handle different endpoints as the challenge only requires one
export const doctorsScheduleAPI = async () => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Doctor Schedules:", error);
    throw error;
  }
};

import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { useGetDoctorAvailabilities } from "./Landing/hooks/useGetDoctorAvailabilities";
import { useProcessDoctorsSchedule } from "./Landing/hooks/useProcessDoctorsSchedule";
import { DoctorList, DoctorTile } from "./Landing/LandingStyledComponents";

export default function AvailableDoctors() {
  useGetDoctorAvailabilities();
  const processedBookings = useProcessDoctorsSchedule();

  if (Object.keys(processedBookings).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Available Doctors</Text>
        <Text>No doctors available this week</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Doctors</Text>
      <DoctorList>
        {Object.keys(processedBookings).map((doctorName) => (
          <Link href={`/DoctorSchedule?doctor=${doctorName}`} key={doctorName}>
            <DoctorTile key={doctorName}>
              <Text>{doctorName}</Text>
            </DoctorTile>
          </Link>
        ))}
      </DoctorList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

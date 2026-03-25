import { StyleSheet } from "react-native";

import Modal from "@/components/Modal/Modal";
import { Text, View } from "@/components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import useGetBookingDoctor from "../hooks/useGetBookingDoctor";
import { useGetBookingTime } from "../hooks/useGetBookingTime";
import { DoctorList, DoctorTile } from "./Landing/LandingStyledComponents";

export default function MyBookings() {
  const [bookings, setBookings] = React.useState<string[]>([]);
  const [deletingBooking, setDeletingBooking] = React.useState<string | null>(
    null,
  );
  const getBookingDoctor = useGetBookingDoctor();
  const getBookingTime = useGetBookingTime();

  const loadData = async () => {
    const appointmentStored = await AsyncStorage.getAllKeys().catch((error) => {
      console.error("Error loading bookings:", error);
    });
    if (appointmentStored && bookings.length !== appointmentStored.length) {
      setBookings(appointmentStored as string[]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        onClose={() => setDeletingBooking(null)}
        header="Remove Booking"
        content={`Are you sure you want to remove this booking with Dr. ${getBookingDoctor(
          deletingBooking || "",
        )} at ${getBookingTime(
          deletingBooking || "",
          getBookingDoctor(deletingBooking || ""),
        )}?`}
        isVisible={deletingBooking !== null}
        buttons={[
          {
            text: "Remove",
            onPress: async () => {
              await AsyncStorage.removeItem(deletingBooking || "");
              setDeletingBooking(null);
              loadData();
            },
          },
          {
            text: "Cancel",
            onPress: () => setDeletingBooking(null),
          },
        ]}
      />
      <Text style={styles.title}>My Bookings</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <DoctorList>
        {Object.values(bookings).map((booking) => (
          <DoctorTile key={booking} testID="booking-tile">
            <Text>{getBookingDoctor(booking)}</Text>
            <Text>{getBookingTime(booking, getBookingDoctor(booking))}</Text>
            <Ionicons
              name="trash-bin"
              size={24}
              color="#ee7878"
              testID={`delete-${booking}`}
              onPress={() => setDeletingBooking(booking)}
            />
          </DoctorTile>
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

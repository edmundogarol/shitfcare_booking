import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import Modal from "@/components/Modal/Modal";
import { Text, View } from "@/components/Themed";
import { useDoctorsState } from "@/store/doctors/useDoctorsState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useEffect } from "react";
import {
  DayHeaderContainer,
  EmptyHourContainer,
  HourContainer,
  HoursContainer,
  WeeklyScheduleContainer,
} from "./(tabs)/DoctorSchedule/DoctorScheduleStyledComponents";
import { useGetDoctorAvailabilities } from "./(tabs)/Landing/hooks/useGetDoctorAvailabilities";
import useGetScheduleByDay from "./hooks/useGetScheduleByDay";

export default function ModalScreen() {
  const { doctor } = useLocalSearchParams();
  useGetDoctorAvailabilities();
  const { doctors } = useDoctorsState();
  const scheduleByDay = useGetScheduleByDay();
  const [bookingTimeKey, setBookingTimeKey] = React.useState<string | null>(
    null,
  );
  const [bookingTime, setBookingTime] = React.useState<string | null>(null);
  const [loadedBookings, setLoadedBookings] = React.useState<string[]>([]);
  const router = useRouter();

  if (doctors?.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{doctor}</Text>
        <Text>No availabilities this week</Text>
      </View>
    );
  }

  const loadData = async () => {
    const appointmentStored = await AsyncStorage.getAllKeys();
    console.log({ appointmentStored });
    if (loadedBookings.length !== appointmentStored.length) {
      setLoadedBookings(appointmentStored as string[]);
    }
  };

  useEffect(() => {
    loadData();
  }, [bookingTimeKey]);

  console.log("Loaded bookings:", loadedBookings);
  // AsyncStorage.clear();
  return (
    <View style={styles.container}>
      <Modal
        header="Booking Confirmation"
        content={`Are you sure you want to book an appointment with ${doctor} at ${bookingTime}?`}
        isVisible={bookingTime !== null}
        buttons={[
          { text: "Cancel", onPress: () => setBookingTime(null) },
          {
            text: "Confirm",
            onPress: async () => {
              await AsyncStorage.setItem(
                `booking-${bookingTimeKey}`,
                "booked",
              ).then(() => {
                alert(`Appointment booked with ${doctor} at ${bookingTime}`);
                router.push("/MyBookings");
                setBookingTime(null);
              });
            },
          },
        ]}
        onClose={() => setBookingTime(null)}
      />
      <Text style={styles.title}>{doctor}</Text>
      <ScrollView horizontal={false}>
        <WeeklyScheduleContainer horizontal>
          <View>
            <HourContainer idx={1}>
              <Text>Time</Text>
            </HourContainer>
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
              return (
                <HourContainer key={hour} idx={hour}>
                  <Text>{`${moment(hour, "HH").format("h:mm A")}`}</Text>
                </HourContainer>
              );
            })}
          </View>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => {
            return (
              <View key={day}>
                <DayHeaderContainer>
                  <Text>{moment(day, "dddd").format("ddd")}</Text>
                </DayHeaderContainer>
                <HoursContainer>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                    if (
                      scheduleByDay(doctor.toString())[day]?.includes(
                        `${hour.toString().padStart(2, "0")}:00`,
                      )
                    ) {
                      const booked = loadedBookings.some((key) => {
                        return key.includes(
                          `${doctor.toString()}-${day}${moment(hour, "HH").format("h:mmA")}`
                            .toString()
                            .replaceAll(" ", ""),
                        );
                      });
                      return (
                        <HourContainer
                          key={`${day}-${hour}`}
                          idx={hour}
                          onPress={() => {
                            if (booked) {
                              alert("This slot is already booked!");
                              return;
                            }
                            setBookingTimeKey(
                              `${doctor.toString()}-${day}${moment(hour, "HH").format("h:mmA")}`.replaceAll(
                                " ",
                                "",
                              ),
                            );
                            setBookingTime(
                              `${day} at ${moment(hour, "HH").format("h:mm A")}`,
                            );
                          }}
                        >
                          <Text
                            key={hour}
                            style={{
                              color: booked ? "grey" : "green",
                              fontWeight: "bold",
                            }}
                          >{`${moment(hour, "HH").format("h:mm A")}`}</Text>
                        </HourContainer>
                      );
                    }
                    return (
                      <EmptyHourContainer key={`${day}-${hour}`} idx={hour}>
                        <Text style={{ color: "transparent" }}>0</Text>
                      </EmptyHourContainer>
                    );
                  })}
                </HoursContainer>
              </View>
            );
          })}
        </WeeklyScheduleContainer>
      </ScrollView>
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
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

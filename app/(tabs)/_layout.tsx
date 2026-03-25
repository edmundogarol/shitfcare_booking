import { Tabs } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { LandingPageHeader } from "./Landing/LandingStyledComponents";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        header: () => <LandingPageHeader>Shiftcare Medical</LandingPageHeader>,
      }}
    >
      <Tabs.Screen
        name="MyBookings"
        options={{
          title: "My Bookings",
        }}
      />
      <Tabs.Screen
        name="AvailableDoctors"
        options={{
          title: "Available Doctors",
        }}
      />
    </Tabs>
  );
}

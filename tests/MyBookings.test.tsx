import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import MyBookings from "../app/(tabs)/MyBookings";

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-native-async-storage/async-storage", () => ({
  getAllKeys: jest.fn(() => Promise.resolve(["booking1", "booking2"])),
  removeItem: jest.fn(),
}));
jest.mock("../app/hooks/useGetBookingDoctor", () => () => {
  return () => "Dr. Smith";
});
jest.mock("../app/hooks/useGetBookingTime", () => ({
  useGetBookingTime: () =>
    jest.fn((booking) => {
      if (booking === "booking1") return "Monday 2:00PM";
      if (booking === "booking2") return "Tuesday 3:00PM";
      return "Unknown";
    }),
}));

describe("MyBookings", () => {
  it("renders title", () => {
    const { getByText } = render(<MyBookings />);
    expect(getByText("My Bookings")).toBeTruthy();
  });

  it("loads and displays bookings", async () => {
    const { getAllByText } = render(<MyBookings />);

    await waitFor(() => {
      expect(getAllByText("Dr. Smith")).toHaveLength(2);
      expect(getAllByText("Monday 2:00PM")).toHaveLength(1);
      expect(getAllByText("Tuesday 3:00PM")).toHaveLength(1);
    });
  });

  it("renders no bookings when storage is empty", async () => {
    (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue([]);

    const { queryByTestId } = render(<MyBookings />);

    await waitFor(() => {
      expect(queryByTestId("booking-tile")).toBeNull();
    });
  });

  it("does NOT remove booking when user cancels", async () => {
    (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue(["booking1"]);

    const { getByTestId, getByText } = render(<MyBookings />);

    await waitFor(() => {
      expect(getByText("Dr. Smith")).toBeTruthy();
    });

    fireEvent.press(getByTestId("delete-booking1"));
    fireEvent.press(getByText("Cancel"));

    expect(AsyncStorage.removeItem).not.toHaveBeenCalled();
  });

  it("removes booking when delete is confirmed", async () => {
    (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue(["booking1"]);
    (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);

    const { getByTestId, getByText, queryByTestId } = render(<MyBookings />);

    await waitFor(() => {
      expect(getByText("Dr. Smith")).toBeTruthy();
    });

    (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue([]);

    fireEvent.press(getByTestId("delete-booking1"));
    fireEvent.press(getByText("Remove"));

    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("booking1");
    });
    await waitFor(() => {
      expect(queryByTestId("delete-booking1")).toBeNull();
    });
  });

  it("handles AsyncStorage failure gracefully", async () => {
    (AsyncStorage.getAllKeys as jest.Mock).mockRejectedValue(new Error("fail"));

    const { getByText } = render(<MyBookings />);

    // just ensure app doesn't crash
    await waitFor(() => {
      expect(getByText("My Bookings")).toBeTruthy();
    });
  });
});

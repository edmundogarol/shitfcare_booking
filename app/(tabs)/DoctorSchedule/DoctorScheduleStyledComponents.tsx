import styled from "styled-components/native";

export const WeeklyScheduleContainer = styled.ScrollView`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const DayHeaderContainer = styled.View`
  padding: 10px;
  border: 1px solid #00000021;
`;

export const HoursContainer = styled.View`
  border: 1px solid #00000021;
`;
export const HourContainer = styled.Pressable<{ idx: number }>`
  padding: 10px;
  border: 1px solid transparent;
  background-color: ${(props) =>
    props.idx % 2 === 0 ? "#00000005" : "transparent"};
`;
export const EmptyHourContainer = styled.View<{ idx: number }>`
  padding: 10px;
  border: 1px solid transparent;
  background-color: ${(props) =>
    props.idx % 2 === 0 ? "#00000005" : "transparent"};
`;

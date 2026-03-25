import styled from "styled-components/native";

export const ModalHeader = styled.Text`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #8080805c;
`;

export const ModalContent = styled.View`
  background-color: rgb(255, 255, 255);
  position: absolute;
  z-index: 1;
  padding: 20px;
  max-width: 400px;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(129, 129, 129, 0.69);
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalMessage = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
`;

export const ModalButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

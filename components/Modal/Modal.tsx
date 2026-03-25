import { Button, Text } from "react-native";
import {
  ModalButtonsContainer,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalMessage,
} from "./ModalStyledComponents";

interface ModalProps {
  header: string;
  content: string;
  buttons: { text: string; onPress: () => void }[];
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({
  header,
  content,
  isVisible,
  buttons,
  onClose,
  children,
}: ModalProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalMessage>
          <Text>{content}</Text>
        </ModalMessage>
        <ModalButtonsContainer>
          {buttons.map((button, index) => (
            <Button key={index} title={button.text} onPress={button.onPress} />
          ))}
        </ModalButtonsContainer>
        {children}
      </ModalContent>
    </ModalContainer>
  );
}

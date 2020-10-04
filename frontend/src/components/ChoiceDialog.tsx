import { h } from "preact";

import Button from "src/components/core/Button";
import Dialog from "./core/Dialog";

interface Props {
  message: string;
  acceptTitle?: string;
  declineTitle?: string;
  show: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const ChoiceDialog = ({
  message,
  acceptTitle,
  declineTitle,
  show,
  onAccept,
  onDecline,
}: Props) => {

  return (
    <Dialog message={message} show={show}>
      <Button variant="primary" contained onClick={onDecline}>
        {declineTitle || "Cancel"}
      </Button>
      <Button variant="primary" contained onClick={onAccept}>
        {acceptTitle || "Accept"}
      </Button>
    </Dialog>
  );
};

export default ChoiceDialog;

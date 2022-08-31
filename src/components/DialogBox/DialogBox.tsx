import React from "react";

interface DialogBoxProps {
  message: string;
  onDialogBoxClicked?: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = (
  props: DialogBoxProps
): React.ReactElement => {
  const { message, onDialogBoxClicked } = props;
  return (
    <div
      className="cursor-pointer h-36 absolute bg-white border-4 border-solid border-black bottom-0 left-0 right-0 p-3"
      onClick={onDialogBoxClicked}
    >
      {message}
    </div>
  );
};

export default DialogBox;

//React Hooks
import { useState } from "react";

export const useSnackBar = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  return {
    openSnackBar,
    message,
    setMessage,
    handleCloseSnackBar,
    handleOpenSnackBar,
  };
};

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getOnSelectPovRoute } from "../utils";

export const useOnClosePov = () => {
  const navigate = useNavigate();

  const onClosePov = useCallback(() => {
    navigate(getOnSelectPovRoute(null));
  }, [navigate]);

  return onClosePov;
};

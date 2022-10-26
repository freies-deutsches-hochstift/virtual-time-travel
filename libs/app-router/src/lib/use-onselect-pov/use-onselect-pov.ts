import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getOnSelectPovRoute, OnSelectPov } from "../utils";

export const useOnSelectPov = () => {
  const navigate = useNavigate();

  const onSelectPov = useCallback(
    (povId) => {
      navigate(getOnSelectPovRoute(povId));
    },
    [navigate],
  ) as OnSelectPov;

  return onSelectPov;
};

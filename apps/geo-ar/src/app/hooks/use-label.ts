import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../main";
import { useLabels } from "../store/locales.slice";

export function useLabel(key: string) {
  const selectLabel = useMemo(useLabels, []);
  const label = useSelector((state: RootState) => selectLabel(state, key));

  return label || `Missing label ::: ${key}`;
}

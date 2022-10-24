import { useMemo } from "react";
import { useSelector } from "react-redux";
import { LocalizedFieldGroup } from "@virtual-time-travel/localization";
import { RootState } from "../../main";
import { useLabels } from "../store/locales.slice";

export function useLabel(key: string) {
  const selectLabel = useMemo(useLabels, []);
  const label = useSelector((state: RootState) => selectLabel(state, key));

  return label || `Missing label ::: ${key}`;
}

export function useLabelGroup(key: string) {
  const selectLabel = useMemo(useLabels, []);
  const group = useSelector((state: RootState) => selectLabel(state, key));

  return group as unknown as LocalizedFieldGroup;
}

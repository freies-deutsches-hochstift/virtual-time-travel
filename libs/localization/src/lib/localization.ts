import { AvailLocales, LocalizedField, LocalizedKey } from "./types";

/**
 * Mandatory labels to add in apps/geo-ar/assets/items/locales/index.csv
 *
 */

export enum MainLabels {
  Start = "start",
  Confirm = "confirm",
  Cancel = "cancel",
  Skip = "cancel",
  Next = "next",
  SwitchMap = "switch-map",
  SwitchList = "switch-list",
  GoHome = "go-home",
}

export function getLocalizedField(
  field: LocalizedKey | string | null,
  locale: AvailLocales,
): string | undefined {
  if (typeof field !== "object") return field;

  return field?.[locale];
}

export const getLabel = (labels: LocalizedField, key: string) => {
  if (!labels) return null;
  if (key in labels) return labels[key];
  return null;
};

import { AvailLocales, LocalizedField, LocalizedKey } from './types';

export function getLocalizedField(
  field: LocalizedKey | string | null,
  locale: AvailLocales
): string | undefined {
  if (typeof field !== 'object') return field;

  return field?.[locale];
}

export const getLabel = (labels: LocalizedField, key: string) => {
  if (!labels) return null;
  if (key in labels) return labels[key];
  return null;
};

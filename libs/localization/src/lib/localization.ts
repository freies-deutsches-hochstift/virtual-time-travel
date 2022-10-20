import { AvailLocales, LocalizedKey, Labels } from './types';

export function getLocalizedField(
  field: LocalizedKey | string | null,
  locale: AvailLocales
): string | undefined {
  if (typeof field !== 'object') return field;

  return field?.[locale];
}

export const getLabel = (labels: Labels, key: string) => {
  if (!labels) return null;
  if (key in labels) return labels[key];
  return null;
};

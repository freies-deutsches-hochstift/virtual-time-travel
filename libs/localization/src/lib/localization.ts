import { AvailLocales, LocalizedKey } from './types';

export function getLocalizedField(
  field: LocalizedKey | string | null,
  locale: AvailLocales
): string | undefined {
  if (typeof field !== 'object') return field;

  return field?.[locale];
}

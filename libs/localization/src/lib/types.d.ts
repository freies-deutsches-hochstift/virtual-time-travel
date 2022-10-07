export enum AvailLocales {
  en = 'en',
  de = 'de',
}

export type LocalizedKey = {
  [key in AvailLocales]: string;
};

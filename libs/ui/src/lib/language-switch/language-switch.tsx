import { useCallback, useMemo } from "react";
import styled from "@emotion/styled";
import {
  AvailLocales,
  CurrentLocale,
  getLabel,
  LocaleId,
  Locales,
} from "@virtual-time-travel/localization";
import tw from "twin.macro";

export interface LanguageSwitchProps {
  current: CurrentLocale;
  locales: Locales;
  switchLocale: (k: AvailLocales) => void;
}

export function LanguageSwitch({
  current,
  locales,
  switchLocale,
}: LanguageSwitchProps) {
  return (
    <StyledLanguageSwitch>
      {locales?.map((locale) => (
        <LanguageSwitchEntry
          key={locale.slug}
          {...{ current, locale, switchLocale }}
        />
      ))}
    </StyledLanguageSwitch>
  );
}

export interface LanguageSwitchEntryProps {
  current: CurrentLocale;
  locale: LocaleId;
  switchLocale: (k: AvailLocales) => void;
}

function LanguageSwitchEntry({
  current,
  locale,
  switchLocale,
}: LanguageSwitchEntryProps) {
  const { slug, labels = {} } = locale;
  const isCurrent = useMemo(() => current === slug, [current, slug]);
  const label = useMemo(() => {
    const l = getLabel(labels, slug) as string;
    return l || slug;
  }, [labels, slug]);

  const handleClick = useCallback(() => {
    switchLocale(slug as AvailLocales);
  }, [switchLocale, slug]);

  return (
    <StyledLanguageSwitchEntry onClick={handleClick} {...{ isCurrent }}>
      {label}
    </StyledLanguageSwitchEntry>
  );
}

const StyledLanguageSwitch = styled.div(tw`
  flex gap-4 uppercase items-center justify-center
  p-4
`);

type StyledLanguageSwitchEntryProps = {
  isCurrent: boolean;
};

const StyledLanguageSwitchEntry = styled.div(
  ({ isCurrent }: StyledLanguageSwitchEntryProps) => [
    tw`p-2`,
    isCurrent &&
      `
    text-decoration: underline;
    text-underline-offset: .4em;
    pointer-events: none;
  `,
  ],
);

export default LanguageSwitch;

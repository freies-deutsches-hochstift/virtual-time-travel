import { createSelector } from '@reduxjs/toolkit';
import { ConfigDataItems } from '@virtual-time-travel/app-config';
import { Labels } from '@virtual-time-travel/localization';
import { DialogProps } from '@virtual-time-travel/ui';
import { getLocalizedConfig } from './config.slice';
import { getLocalesState, scopedLabel } from './locales.slice';

export const useDialog = () => {
  return createSelector(
    [getLocalizedConfig, getLocalesState, (_, identifier) => identifier],
    ({ appConfig, currentLocale }, { entries }, identifier) => {
      const config = appConfig[ConfigDataItems.DIALOGS];
      const baseUrl = [config.contentUrl, currentLocale].join('/');

      const locale = entries?.find((l) => l.slug === currentLocale);

      const labels = locale?.labels as Labels;

      return {
        contentUrl: [baseUrl, `${identifier}.md`].join('/'),
        labels: {
          confirm: scopedLabel(labels, identifier, 'confirm'),
          cancel: scopedLabel(labels, identifier, 'cancel'),
          skip: scopedLabel(labels, identifier, 'skip'),
          next: scopedLabel(labels, identifier, 'next'),
        },
      } as DialogProps;
    }
  );
};

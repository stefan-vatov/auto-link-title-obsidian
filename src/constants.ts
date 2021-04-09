import { PluginSettings } from './interfaces';

export const DEFAULT_SETTINGS: PluginSettings = {
  regex:
    '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$',
};

import { Plugin, PluginSettingTab, Setting, MarkdownView } from 'obsidian';
import { clipboard } from 'electron';
import { fetchTitle, shouldFetchTitle } from './network';
import { isUrl } from './util';
import { PluginSettings } from './interfaces';
import { DEFAULT_SETTINGS } from './constants';

export default class AutoLinkTitle extends Plugin {
  settings: PluginSettings;

  async onload(): Promise<void> {
    await this.loadSettings();
    this.addSettingTab(new AutoLinkTitleSettingsTab(this.app, this));
    this.addCommand({
      id: 'auto-link-title-obsidian',
      name: 'Paste',
      callback: () => this.pasteWithTitle(),
      hotkeys: [
        {
          modifiers: ['Mod', 'Ctrl'],
          key: 'v',
        },
      ],
    });
  }

  async pasteWithTitle(): Promise<void> {
    const editor = this.app.workspace.getActiveViewOfType(MarkdownView).editor;
    const clipboardText = clipboard.readText('clipboard').trim();

    if (isUrl(clipboardText, this.settings.regex) === false) {
      editor.replaceSelection(`${clipboardText}`);
    } else {
      const urlTitle = await AutoLinkTitle.getTitle(clipboardText);
      editor.replaceSelection(`[${urlTitle}](${clipboardText})`);
    }
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  private static async getTitle(linkToFetchTitle: string): Promise<string> {
    if ((await shouldFetchTitle(linkToFetchTitle)) === false) {
      return linkToFetchTitle;
    }

    return (await fetchTitle(linkToFetchTitle)) || linkToFetchTitle;
  }
}

class AutoLinkTitleSettingsTab extends PluginSettingTab {
  display() {
    const { containerEl } = this;
    const plugin: AutoLinkTitle = (this as any).plugin; // eslint-disable-line

    containerEl.empty();
    containerEl.createEl('h2', { text: 'Auto Link Settings' });

    new Setting(containerEl)
      .setName('Regular expression')
      .setDesc('Regular expression used to match URLs in the clipboard.')
      .addText(text =>
        text
          .setPlaceholder('Enter regular expression here..')
          .setValue(plugin.settings.regex)
          .onChange(async value => {
            if (value.length > 0) {
              plugin.settings.regex = value;
              await plugin.saveSettings();
            }
          }),
      );
  }
}

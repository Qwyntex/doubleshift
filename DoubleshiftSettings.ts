import Doubleshift from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";
import {text} from "stream/consumers";

export class DoubleshiftSettings extends PluginSettingTab {
	plugin: Doubleshift;

	constructor(app: App, plugin: Doubleshift) {
		super(app, plugin);    this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Command")
			.setDesc("The command executed when shift is pressed twice")
			.addText((text) =>
				text
					.setPlaceholder("command-palette:open")
					.setValue(this.plugin.settings.command)
					.onChange(async (value) => {
						this.plugin.settings.command = value;
						await this.plugin.saveSettings();
					})
			);
	}

}

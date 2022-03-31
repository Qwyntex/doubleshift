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

		command: new Setting(containerEl)
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

		new Setting(containerEl)
			.setName("Delay")
			.setDesc("The maximum delay between two presses of the shift key in 1/10 of a second")
			.setTooltip("depending on how fast you type a too high number might annoy you")
			.addSlider( component => {
				component
					.setValue(this.plugin.settings.delay/10)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.delay = Number(value*10)
					})
			})
	}

}

import Doubleshift from "./main";
import {commandSuggestion} from "./suggestModal";
import {App, Command, FuzzySuggestModal, PluginSettingTab, Setting} from "obsidian";

export class DoubleshiftSettings extends PluginSettingTab {

	plugin: Doubleshift;
	commands: Command[];

	constructor(app: App, plugin: Doubleshift, commands: Command[]) {
		super(app, plugin);
		this.plugin = plugin;
		this.commands = commands;
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

		new Setting(containerEl)
			.addSearch( component => {
				component
					.setPlaceholder(this.plugin.settings.command)
					.setValue(this.plugin.settings.command)
					.onChange(value => {
						new commandSuggestion(this.app, this.plugin)
					})

			})
	}

}

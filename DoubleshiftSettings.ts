import Doubleshift from "./main";
import {commandSuggestion} from "./CommandSuggestion";
import {App, Command, PluginSettingTab, Setting} from "obsidian";

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
			.addButton( component => {
				component
					.setButtonText("select command")
					.onClick(() => {
						new commandSuggestion(this.app, this.plugin)
					})
			})
	}

}

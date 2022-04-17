import Doubleshift, {findCommand} from "./main";
import {commandSuggestion} from "./CommandSuggestion";
import {App, Command, PluginSettingTab, Setting} from "obsidian";
import {strict} from "assert";
import {commands} from "codemirror";

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
			.setDesc("The command executed when shift is pressed twice.")
			.addButton( component => {
				let commandName = findCommand(this.plugin.settings.command).name;
				component
					.setButtonText("select command")
					.setTooltip(commandName)
					.onClick(() => {
						new commandSuggestion(this.app, this.plugin);
						component.setTooltip(commandName);
					})
			});
    
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
						this.plugin.saveSettings();
					})

			});

		new Setting(containerEl)
			.setName("ModKey")
			.setDesc("the key you want to press twice")
			.addText(component => {
				component
					.setValue(this.plugin.settings.key)
					.setPlaceholder("Shift")
					.onChange(value => {
						this.plugin.settings.key = value;
					})
			});
	}

}

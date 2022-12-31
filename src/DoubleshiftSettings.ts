import Doubleshift, {findCommand} from "./main";
import {commandSuggestion} from "./CommandSuggestion";
import {App, Command, PluginSettingTab, Setting} from "obsidian";
import {ShortcutCreator} from "./Shortcut";
import {KeySelector} from "./KeySelector";

export class DoubleshiftSettings extends PluginSettingTab {

	plugin: Doubleshift;
	commands: Command[];

	constructor(app: App, plugin: Doubleshift, commands: Command[]) {
		super(app, plugin);
		this.plugin = plugin;
		this.commands = commands;
	}

	display(): void {

		this.plugin.refreshCommands();

		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Delay")
			.setDesc("The maximum delay between two presses of the respective key in 1/10 of a second")
			.setTooltip("depending on how fast you type a too high number might annoy you")
			.addSlider( component => {
				component
					.setValue(this.plugin.settings.delay/10)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.delay = Number(value*10)
						await this.plugin.saveSettings();
					})

			});

		new Setting(containerEl)
			.setHeading()
			.setName("Shortcuts")
			.setDesc("all shortcuts you have currently set up")
			.setHeading()
			.setDisabled(true)
		this.plugin.settings.shortcuts.forEach(shortcut => {
			let available = findCommand(shortcut.command) !== null;
			let s = new Setting(containerEl)
				.addButton(component => {
					component
						.setTooltip("change key")
						.setButtonText(shortcut.key === " " ? "Space" : shortcut.key)
						.onClick(() => {
							let sel = new KeySelector(this.app, this.plugin, shortcut);
							sel.open();
						})
				})
				.addButton(component => {
					let commandName: string;
					if (available) {
						commandName = findCommand(shortcut.command).name;
					} else {
						commandName = ""
					}
					component
						.setButtonText("select command")
						.setTooltip(commandName)
						.onClick(() => {
							new commandSuggestion(this.app, this.plugin, shortcut);
							component.setTooltip(commandName);
							containerEl.empty();
							this.display();
						})
				})
				.addButton(component => {
					component
						.setIcon("trash")
						.onClick(() => {
							this.plugin.settings.shortcuts.remove(shortcut);
							this.plugin.saveSettings();
							containerEl.empty();
							this.display();
						})
				})
			if (!available){
				s.setDesc("the corresponding plugin has been disabled or uninstalled");
			}
		});

		new Setting(containerEl)
			.addButton(component => {
				component
					.setButtonText("Add")
					.onClick(async () => {
						await new ShortcutCreator(this.plugin);
						await this.plugin.saveSettings();
						containerEl.empty();
						this.display();
					})
			})
	}
}

import Doubleshift, {findCommand} from "./main";
import {commandSuggestion} from "./CommandSuggestion";
import {App, Command, PluginSettingTab, Setting} from "obsidian";
import {ShortcutCreator} from "./Shortcut";
import {GetKeyModal} from "./getKeyModal";

export class DoubleshiftSettings extends PluginSettingTab {

	plugin: Doubleshift;
	commands: Command[];

	constructor(app: App, plugin: Doubleshift, commands: Command[]) {
		super(app, plugin);
		this.plugin = plugin;
		this.commands = commands;
	}

	edgeCases(c: string): string{



		return c;
	}

	display(): void {
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
			.setName("Shortcuts")
			.setDesc("all shortcuts you have currently set up")
			.setHeading()
			.setDisabled(true)
		this.plugin.settings.shortcuts.forEach(shortcut => {
			new Setting(containerEl)
				.addButton(component => {
					component
						.setButtonText(shortcut.key)
						.onClick(() => {
							new GetKeyModal(this.app, this.plugin, shortcut).open();
							component.setButtonText(shortcut.key);
							containerEl.empty();
							this.display();
						})
				})
				/*.addText(component => {
					component
						.setPlaceholder(shortcut.key)
						.onChange(value => {
							value = this.edgeCases(value);
							shortcut.key = value;
							this.plugin.saveSettings();
						})
				})*/
				.addButton( component => {
					let commandName = findCommand(shortcut.command).name;
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
		});

		new Setting(containerEl)
			.addButton(component => {
				component
					.setButtonText("Add")
					.onClick(() => {
						new ShortcutCreator(this.plugin);
						this.plugin.saveSettings();
						containerEl.empty();
						this.display();
					})
			})
	}
}

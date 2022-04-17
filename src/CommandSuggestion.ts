import {App, Command, FuzzySuggestModal, Notice} from "obsidian";
import Doubleshift from "./main"
import { findCommand } from "./main"
import {Shortcut} from "./Shortcut";

export class commandSuggestion extends FuzzySuggestModal<Command> {

	plugin: Doubleshift;
	shortcut: Shortcut;

	constructor(app: App, plugin: Doubleshift, shortcut: Shortcut) {
		super(app);
		this.plugin = plugin;
		this.shortcut = shortcut;
		this.setPlaceholder(findCommand(this.plugin.settings.command).name);
		this.open();
	}

	getItems(): Command[] {
		return Object.values(this.plugin.commands);
	}

	getItemText(command: Command): string {
		return command.name;
	}

	onChooseItem(item: Command, evt: MouseEvent | KeyboardEvent): void {
		let command = findCommand(this.getItemText(item));
		this.shortcut.command = command.id;
		this.plugin.saveSettings();
		new Notice(`pressing shift twice will now execute ${command.name}`);
	}
}

import {App, Command, FuzzySuggestModal} from "obsidian";
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
		this.setPlaceholder(findCommand(shortcut.command)?.name ?? shortcut.command);
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
	}
}

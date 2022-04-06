import {App, Command, FuzzySuggestModal, Notice} from "obsidian";
import Doubleshift from "./main"
import { findCommand } from "./main"

export class commandSuggestion extends FuzzySuggestModal<Command> {

	plugin: Doubleshift;

	constructor(app: App, plugin: Doubleshift) {
		super(app);
		this.plugin = plugin;
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
		this.plugin.settings.command = command.id;
		this.plugin.saveSettings();
		new Notice(`pressing shift twice will now execute ${command.name}`);
	}
}

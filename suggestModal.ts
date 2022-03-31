import {App, Command, FuzzySuggestModal, Notice, SuggestModal} from "obsidian";
import Doubleshift from "./main"

export class commandSuggestion extends FuzzySuggestModal<Command> {

	plugin: Doubleshift;

	constructor(app: App, plugin: Doubleshift) {
		super(app);
		this.plugin = plugin;
	}

	getItems(): Command[] {
		return Object.values(this.plugin.commands);
	}

	getItemText(command: Command): string {
		return command.name;
	}

	onChooseItem(command: Command, evt: MouseEvent | KeyboardEvent) {
		new Notice(`Selected ${command.name}`);
	}
}

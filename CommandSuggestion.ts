import {App, Command, FuzzySuggestModal} from "obsidian";
import Doubleshift from "./main"

export class commandSuggestion extends FuzzySuggestModal<Command> {

	plugin: Doubleshift;

	constructor(app: App, plugin: Doubleshift) {
		super(app);
		this.plugin = plugin;
		this.setPlaceholder(this.plugin.settings.command);
		this.open();
	}

	getItems(): Command[] {
		return Object.values(this.plugin.commands);
	}

	getItemText(command: Command, type: boolean = true): string {
		if (type){
			return command.name;
		}
		return command.id;
	}

	onChooseItem(item: Command, evt: MouseEvent | KeyboardEvent): void {
		this.plugin.settings.command = this.getItemText(item, false);
	}
}

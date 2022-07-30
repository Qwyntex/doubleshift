import Doubleshift from "./main";
import {commandSuggestion} from "./CommandSuggestion";


export interface Shortcut{
	key: string;
	command: string;
	lastKeyUpTime: number;
}

export class ShortcutCreator {
	constructor(plugin: Doubleshift) {
		let shortcut = new class implements Shortcut {
			command = ""
			key = "Shift";
			lastKeyUpTime = Date.now();
		}
		new commandSuggestion(plugin.app, plugin, shortcut);
		plugin.settings.shortcuts.push(shortcut);
	}
}

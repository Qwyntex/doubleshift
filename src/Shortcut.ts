import Doubleshift from "./main";


export interface Shortcut{
	key: string;
	command: string;
	lastKeyUpTime: number;
}

export class ShortcutCreator {
	constructor(plugin: Doubleshift) {
		plugin.settings.shortcuts.push(new class implements Shortcut {
			command = "command-palette:open";
			key = "Shift";
			lastKeyUpTime = Date.now();
		})
	}
}

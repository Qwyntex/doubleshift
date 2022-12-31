import {Command, Plugin} from 'obsidian';
import { DoubleshiftSettings } from './DoubleshiftSettings';
import {Shortcut} from "./Shortcut";

interface Settings {
	delay: number;
	key: string;
	shortcuts: Shortcut[];
}

export function findCommand(a: string): Command{
	let commands = Object.values(this.app.commands.commands);
	for (let i = 0; i < commands.length; i++) {
		// @ts-ignore
		let command: Command = commands[i];
		if(command.id === a || command.name === a) {
			return command;
		}
	}
	return null;
}

const DEFAULT_SETTINGS: Partial<Settings> = {
	delay: 500,
	key: 'Shift',
	shortcuts: [new class implements Shortcut {
		command = 'command-palette:open';
		key = 'Shift';
		lastKeyUpTime = Date.now();
	}]
}

export default class Doubleshift extends Plugin {
	settings: Settings;
	commands: Command[];
	settingsTab: DoubleshiftSettings;

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		this.refreshCommands();
	}

	refreshCommands() {
		// @ts-ignore
		this.commands = Object.values(this.app.commands.commands);
	}


	async saveSettings() {
		await this.saveData(this.settings);
	}


	async onload() {
		await this.loadSettings();
		this.settingsTab = new DoubleshiftSettings(this.app, this, this.commands);
		this.addSettingTab(this.settingsTab);
		this.registerDomEvent(window, 'keyup', (event) => this.doubleshift(event.key));
	}

	doubleshift(key: string) {
		this.settings.shortcuts.forEach(shortcut => {
			if (key !== shortcut.key) {
				shortcut.lastKeyUpTime = 0;
				return;
			}
			if (Date.now() - shortcut.lastKeyUpTime < this.settings.delay) {
				shortcut.lastKeyUpTime = 0;

				// @ts-ignore
				app.commands.executeCommandById(shortcut.command);

			} else {
				shortcut.lastKeyUpTime = Date.now();
			}
		})
	}
}

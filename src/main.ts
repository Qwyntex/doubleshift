import {Command, Plugin} from 'obsidian';
import { DoubleshiftSettings } from './DoubleshiftSettings';
import {Shortcut} from "./Shortcut";

interface Settings {
	delay: number;
	key: string;
	shortcuts: Shortcut[];
}

export function formatKeyForDisplay(code: string): string {
	if (code === " " || code === "Space") return "Space";

	const modifierPattern = /^(Shift|Control|Meta|Alt)(Left|Right)$/;
	const match = code.match(modifierPattern);

	if (match) return `${match[1]} ${match[2]}`;
	return code;
}

export function formatKeyForDisplayUppercase(code: string): string {
	const formatted = formatKeyForDisplay(code);
	return formatted === "Space" ? "SPACE" : formatted.toUpperCase();
}

export function migrateKeyValue(oldKey: string): string {
	const legacyMapping: Record<string, string> = {
		"Shift": "ShiftLeft",
		"Control": "ControlLeft",
		"Meta": "MetaLeft",
		"Alt": "AltLeft"
	};
	return legacyMapping[oldKey] ?? oldKey;
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
	key: 'ShiftLeft',
	shortcuts: [new class implements Shortcut {
		command = 'command-palette:open';
		key = 'ShiftLeft';
		lastKeyUpTime = Date.now();
	}]
}

export default class Doubleshift extends Plugin {
	settings: Settings;
	commands: Command[];
	settingsTab: DoubleshiftSettings;

	async loadSettings() {
		const loadedSettings = await this.loadData();
		this.settings = Object.assign({}, DEFAULT_SETTINGS, loadedSettings);

		// Migrate legacy key values
		if (this.settings.shortcuts) {
			this.settings.shortcuts.forEach(shortcut => {
				shortcut.key = migrateKeyValue(shortcut.key);
			});
		}

		// Save migrated settings
		if (loadedSettings) {
			await this.saveSettings();
		}

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
		this.registerDomEvent(window, 'keyup', (event) => this.doubleshift(event.code));
	}

	doubleshift(code: string) {
		this.settings.shortcuts.forEach(shortcut => {
			if (code !== shortcut.key) {
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

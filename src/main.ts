import {Command, Notice, Plugin} from 'obsidian';
import { DoubleshiftSettings } from './DoubleshiftSettings';

interface Settings {
	command: string;
	delay: number;
	key: string;
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
	command: 'command-palette:open',
	delay: 500,
	key: 'Shift'
}

export default class Doubleshift extends Plugin {
	settings: Settings;
	commands: Command[];
	lastKeyupTime: number;

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		// @ts-ignore
		this.commands = Object.values(this.app.commands.commands);
	}


	async saveSettings() {
		await this.saveData(this.settings);
	}


	async onload() {
		await this.loadSettings();
		this.addSettingTab(new DoubleshiftSettings(this.app, this, this.commands));
		this.registerDomEvent(window, 'keyup', (event) => this.doubleshift(event.key));
	}

	doubleshift(key: any) {
		if (key !== this.settings.key) {
			this.lastKeyupTime = 0;
			return;
		}
		if (Date.now() - this.lastKeyupTime < this.settings.delay) {
			this.lastKeyupTime = 0;

			// @ts-ignore
			app.commands.executeCommandById(this.settings.command);

		} else {
			this.lastKeyupTime = Date.now();
		}
	}
}

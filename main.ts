import {Command, Plugin} from 'obsidian';
import { DoubleshiftSettings} from './DoubleshiftSettings';

interface Settings {
	command: Command;
	delay: number;
}

export function findCommand(a: string): Command{
	let commands = Object.values(this.app.commands.commands);
	for (let i = 0; i < commands.length; i++) {
		// @ts-ignore
		let command: Command = commands[i];
		if(command.id === a || command.name === a) {
			console.log(command.name + ' with id ' + command.id);
			return command;
		}
	}
	return null;
}

const DEFAULT_SETTINGS: Partial<Settings> = {
	command: findCommand('command-palette:open'),
	delay: 500
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

		this.addSettingTab(new DoubleshiftSettings(this.app, this, this.commands));
		await this.loadSettings();

		this.registerDomEvent(window, 'keyup', (event) => this.doubleshift(event.key));

	}

	doubleshift(key: any) {
		if (key !== "Shift") {
			this.lastKeyupTime = 0;
			return;
		}
		if (Date.now() - this.lastKeyupTime < this.settings.delay) {
			this.lastKeyupTime = 0;

			// @ts-ignore
			app.commands.executeCommandById(this.settings.command.id);

		} else {
			this.lastKeyupTime = Date.now();
		}
	}
}

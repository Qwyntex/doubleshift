import {Command, Plugin} from 'obsidian';
import { DoubleshiftSettings} from './DoubleshiftSettings';

interface Settings {
	command: string;
	delay: number;
}

let lastKeyupTime = 0;

const DEFAULT_SETTINGS: Partial<Settings> = {
	command: 'command-palette:open',
	delay: 500
}

export default class Doubleshift extends Plugin {
	settings: Settings;
	commands: Command[];

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		// @ts-ignore
		this.commands = Object.values(this.app.commands.commands);
	}

	/*
	async saveSettings() {
	}

	 */

	async onload() {

		this.addSettingTab(new DoubleshiftSettings(this.app, this, this.commands));


		await this.loadSettings();

		this.registerDomEvent(window, 'keyup', (event) => this.doubleshift(event.key));

	}

	doubleshift(key: any) {
		if (key !== "Shift") {
			lastKeyupTime = 0;
			return;
		}
		if (Date.now() - lastKeyupTime < this.settings.delay) {
			lastKeyupTime = 0;

			// @ts-ignore
			app.commands.executeCommandById(this.settings.command);

		} else {
			lastKeyupTime = Date.now();
		}
	}
}

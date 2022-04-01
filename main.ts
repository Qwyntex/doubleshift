import { App, Plugin} from 'obsidian';
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

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
	}

	async onload() {

		this.addSettingTab(new DoubleshiftSettings(this.app, this));

		await this.loadSettings();
		Object.assign(DEFAULT_SETTINGS, await this.loadData());

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
			app.commands.executeCommandById(command);

		} else {
			lastKeyupTime = Date.now();
		}
	}
}

import { App, Plugin} from 'obsidian';
import { DoubleshiftSettings} from './DoubleshiftSettings';

interface Settings {
	command: string;
}

let lastKeyupTime = 0;

const DEFAULT_SETTINGS: Partial<Settings> = {
	command: 'command-palette:open',
}

export default class Doubleshift extends Plugin {
	settings: Settings;

	async loadSettings(){
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(){
	}

	async onload() {

		this.addSettingTab(new DoubleshiftSettings(this.app, this));

		await this.loadSettings();
		Object.assign(DEFAULT_SETTINGS, await this.loadData());
		this.registerDomEvent(window, 'keyup', (event) => doubleshift(event.key, this.app, this.settings.command));
	}
}

function doubleshift(key:any, app:App, command:String){
	if (key !== "Shift") {
		lastKeyupTime = 0;
		return;
	}
	if (Date.now() - lastKeyupTime < 500) {
		lastKeyupTime = 0;
		forSomeReasonThatOnlyWorksInADifferentMethodIHateJS(app, command);
	} else {
		lastKeyupTime = Date.now();
	}
}

function forSomeReasonThatOnlyWorksInADifferentMethodIHateJS(app:App, command:String){
	// @ts-ignore
	app.commands.executeCommandById(command);
	// @ts-ignore
	console.log(app.commands.commands);
}

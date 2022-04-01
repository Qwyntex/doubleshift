import {App, Command, Hotkey, Notice, Platform, Plugin} from 'obsidian';
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
	commands: Command[];

	async loadSettings(){
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		// @ts-ignore
		this.commands = Object.values(this.app.commands.commands);
	}

	async saveSettings(){
	}

	async onload() {

		this.addSettingTab(new DoubleshiftSettings(this.app, this, this.commands));


		await this.loadSettings();
		Object.assign(DEFAULT_SETTINGS, await this.loadData());
		this.registerDomEvent(window, 'keyup', (event) => doubleshift(event.key, this.app, this.settings.command));
	}
}

function doubleshift(key:any, app:App, command:String){


	let cmds = Object.entries(this.app.commands.commands);
	console.log(cmds);


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
}

function temp(commands: Command[]){
	commands.forEach((command) => {
		console.log(command.name, command.id, command.hotkeys);
	});
}

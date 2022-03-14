import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Scope, Setting } from 'obsidian';
import { existsSync }from 'fs';

let lastKeyupTime = 0;

function doubleshift(key:any, app:App, command:String){
	if (key !== "Shift") {
		lastKeyupTime = 0;
		return;
	}
	if (Date.now() - lastKeyupTime < 500) {
		lastKeyupTime = 0;
		simulateSearchHotkey(app, command)
	} else {
		lastKeyupTime = Date.now();
	}
}

function random(app:App){

}

function simulateSearchHotkey(app:App, command:String){
	// @ts-ignore
	app.commands.executeCommandById(command)
}

export default class SearchEverywherePlugin extends Plugin {
	async onload() {
		if (existsSync("./../obsidian-better-command-palette")) {
			this.registerDomEvent(window, 'keyup', (event) => doubleshift(event.key, this.app, 'open-better-commmand-palette'));
		} else {
			this.registerDomEvent(window, 'keyup', (event) => doubleshift(event.key, this.app, 'command-palette:open'));
		}
	}
}

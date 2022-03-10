import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Scope, Setting } from 'obsidian';

let lastKeyupTime = 0;

function doubleshift(key:any,app:App){
	if (key !== "Shift") {
		lastKeyupTime = 0;
		return;
	}
	if (Date.now() - lastKeyupTime < 500) {
		lastKeyupTime = 0;
		simulateSearchHotkey(app)
	} else {
		lastKeyupTime = Date.now();
	}
}

function simulateSearchHotkey(app:App){
	// @ts-ignore
	app.commands.executeCommandById('command-palette:open')
}

export default class SearchEverywherePlugin extends Plugin {
	async onload() {
		this.registerDomEvent(window, 'keyup', (event) => doubleshift(event.key,this.app))
	}
}

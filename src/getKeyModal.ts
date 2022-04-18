import {App, Modal, Setting} from "obsidian";
import Doubleshift from "./main";
import {Shortcut} from "./Shortcut";

export class GetKeyModal extends Modal{

	plugin: Doubleshift;
	shortcut: Shortcut;

	constructor(app: App, plugin: Doubleshift, shortcut: Shortcut) {
		super(app);
		this.plugin = plugin;
		this.shortcut = shortcut;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl("h1", {text: "Press the mod key"})
		this.plugin.registerDomEvent(window, 'keyup', (event) => this.detectKey(event));
	}

	detectKey(evt: KeyboardEvent) {
		this.shortcut.key = evt.code;
		console.log("activated");
		this.close();
	}

	onClose() {
		super.onClose();

	}
}

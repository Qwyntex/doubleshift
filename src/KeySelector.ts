import {App, Modal} from "obsidian";
import {Shortcut} from "./Shortcut";
import Doubleshift from "./main";

export class KeySelector extends Modal{

	shortcut: Shortcut;
	key: string;
	plugin: Doubleshift;
	constructor(app: App, plugin: Doubleshift, shortcut: Shortcut) {
		super(app);
		this.plugin = plugin;
		this.shortcut = shortcut;
		this.key = this.shortcut.key;
	}

	onOpen() {
		let { contentEl } = this;

		let instructionEl = document.createElement('div');
		instructionEl.textContent = 'press any key to change your current one. close this window to cancel';
		instructionEl.style.position = 'absolute';
		instructionEl.style.left = '100';
		instructionEl.style.top = '1';
		instructionEl.style.fontSize = '12px';

		let shiftEl = document.createElement('h1');
		shiftEl.textContent = this.shortcut.key === " " ? "SPACE" : this.shortcut.key.toUpperCase();
		shiftEl.style.textAlign = 'center';
		shiftEl.style.paddingTop = '50px';
		shiftEl.style.paddingBottom = '50px';

		let buttonEl = document.createElement('button');
		buttonEl.textContent = 'Save';
		buttonEl.style.display = 'block';
		buttonEl.style.margin = '0 auto';
		buttonEl.tabIndex = -1; // prevent closing the modal if Space or Enter is being pressed
		buttonEl.addEventListener('click', () => this.save());

		contentEl.appendChild(instructionEl);
		contentEl.appendChild(shiftEl);
		contentEl.appendChild(buttonEl);

		document.addEventListener('keydown', (event) => this.detectKeypress(event, shiftEl));
	}

	save() {		this.shortcut.key = this.key;
		this.plugin.saveSettings();
		this.plugin.settingsTab.display();
		this.close();
	}

	detectKeypress(event: KeyboardEvent, element: HTMLElement) {
		element.textContent = event.key === " " ? "SPACE" : event.key.toUpperCase();
		this.key = event.key;
	}

	onClose() {
		let { contentEl } = this;
		let buttonEl = contentEl.querySelector('button');
		let shiftEl = contentEl.querySelector('h1');
		buttonEl.removeEventListener('click', () => this.save());
		document.removeEventListener('keydown', (event) => this.detectKeypress(event, shiftEl));
		contentEl.empty();
	}
}

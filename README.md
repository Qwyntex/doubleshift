## Doubleshift

press `Shift` twice to activate Doubleshift. By default, it opens the command palette, but you can change to whatever you want\
![gif](https://raw.githubusercontent.com/Qwyntex/doubleshift/master/res/vid_1.gif?raw=true)\
you can also add multiple other commands with different keys for whatever action you need to access frequently. \
![gif](https://raw.githubusercontent.com/Qwyntex/doubleshift/master/res/vid_2.gif?raw=true)\
It **works with every available command** including commands from other plugins. So if you have a plugin like the better command palette plugin installed you can choose the command to open it in the Doubleshift settings tab.

## Release Notes

### Version 2.3.0 - Left and Right Modifier Key Support

**New Feature:** Doubleshift can now distinguish between left and right versions of modifier keys!

You can now create different shortcuts for:
- **Left Shift** / **Right Shift**
- **Left Control** / **Right Control**
- **Left Meta** (Command/Windows) / **Right Meta**
- **Left Alt** / **Right Alt**

**Example:** Bind double-press Left Shift to open the command palette, and double-press Right Shift to open the file switcher - both work independently!

**Backward Compatibility:** Existing shortcuts automatically migrate and continue working with left-side keys. No action needed from users.

**What's Changed:**
- Upgraded key detection from `event.key` to `event.code` for precise left/right distinction
- Enhanced UI to display user-friendly labels (e.g., "Shift Left" instead of "ShiftLeft")
- Automatic migration of legacy settings on plugin load
- Added comprehensive testing guide (`How-to-test-in-obsidian.md`)

## Contributing

If you want to contribute to this plugin feel free to create a pull request at https://github.com/Qwyntex/doubleshift

## Troubleshooting

For those wondering why a specific plugin or command doesn't show up in the command picker, try disableing and reenableing doubleshift in the community plugin settings tab

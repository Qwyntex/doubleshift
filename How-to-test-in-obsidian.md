# How to Test in Obsidian

This guide explains how to test the doubleshift plugin with the new right-side modifier key support in Obsidian.

## Prerequisites

- Obsidian installed on your system
- The plugin built successfully (you should have a `main.js` file in the project root)

## Installation Steps

### Option 1: Test in an Existing Vault

1. Navigate to your Obsidian vault's plugins folder:
   ```
   <your-vault>/.obsidian/plugins/
   ```

2. Create a folder named `obsidian-doubleshift` (or use the existing one if you have it installed):
   ```bash
   mkdir -p <your-vault>/.obsidian/plugins/obsidian-doubleshift
   ```

3. Copy the plugin files to this folder:
   ```bash
   cp main.js manifest.json styles.css <your-vault>/.obsidian/plugins/obsidian-doubleshift/
   ```

4. Open Obsidian and go to: **Settings → Community plugins**

5. If the plugin is already installed, reload it by toggling it off and on

6. If it's a fresh install, enable "Community plugins" if not already enabled, then find "Doubleshift" in the list and enable it

### Option 2: Create a Test Vault

1. Create a new empty folder for your test vault:
   ```bash
   mkdir ~/obsidian-test-vault
   ```

2. Create the plugins directory structure:
   ```bash
   mkdir -p ~/obsidian-test-vault/.obsidian/plugins/obsidian-doubleshift
   ```

3. Copy the plugin files:
   ```bash
   cp main.js manifest.json styles.css ~/obsidian-test-vault/.obsidian/plugins/obsidian-doubleshift/
   ```

4. Open Obsidian and select "Open folder as vault"

5. Choose the `obsidian-test-vault` folder

6. Go to **Settings → Community plugins** and enable the Doubleshift plugin

## Testing the New Features

### Test 1: Fresh Installation

**Goal:** Verify new installations use "ShiftLeft" as default

1. With a fresh test vault, open **Settings → Doubleshift**
2. You should see one default shortcut
3. The key button should display: **"Shift Left"** (not just "Shift")
4. Double-press the **left Shift** key → Command palette should open
5. Double-press the **right Shift** key → Nothing should happen (different key)

**Expected Result:** ✅ Default is "Shift Left" and only left Shift works

---

### Test 2: Settings Migration (If you have old settings)

**Goal:** Verify legacy settings auto-migrate

1. If you have an existing installation with old settings, the plugin should auto-migrate
2. Open **Settings → Doubleshift**
3. Old shortcuts that used "Shift" should now show as **"Shift Left"**
4. Old shortcuts should still work with the left-side key

**Expected Result:** ✅ Shortcuts automatically migrate and continue working

---

### Test 3: Creating Right-Side Key Shortcuts

**Goal:** Create and test right-side modifier key shortcuts

1. Open **Settings → Doubleshift**
2. Click **"Add"** to create a new shortcut
3. Select a command (e.g., "Open file switcher")
4. Click the key button (currently shows "Shift Left")
5. In the key selector modal, press the **right Shift** key
6. The display should change to: **"SHIFT RIGHT"**
7. Click **"Save"**
8. Back in settings, the new shortcut should show: **"Shift Right"**
9. Double-press the **right Shift** key → File switcher should open
10. Double-press the **left Shift** key → Command palette should open (from the original shortcut)

**Expected Result:** ✅ Left and right keys work independently with different commands

---

### Test 4: All Modifier Keys

**Goal:** Test all supported modifier keys (left and right)

Create shortcuts for each modifier key and test:

| Key | How to Test | Expected Display |
|-----|-------------|------------------|
| Left Shift | Press left Shift in key selector | "SHIFT LEFT" |
| Right Shift | Press right Shift in key selector | "SHIFT RIGHT" |
| Left Control | Press left Control in key selector | "CONTROL LEFT" |
| Right Control | Press right Control in key selector | "CONTROL RIGHT" |
| Left Meta (Cmd/Win) | Press left Command/Windows key | "META LEFT" |
| Right Meta (Cmd/Win) | Press right Command/Windows key | "META RIGHT" |
| Left Alt/Option | Press left Alt/Option key | "ALT LEFT" |
| Right Alt/Option | Press right Alt/Option key | "ALT RIGHT" |

**Expected Result:** ✅ All modifier keys display correctly and can be bound independently

---

### Test 5: Non-Modifier Keys Still Work

**Goal:** Verify non-modifier keys (like Space) still work

1. Create a new shortcut
2. Select a command
3. In the key selector, press **Space**
4. Display should show: **"SPACE"**
5. Click **"Save"**
6. Double-press the spacebar → Command should execute

**Expected Result:** ✅ Non-modifier keys work as before

---

### Test 6: Key Selector UI

**Goal:** Verify the key selector provides clear feedback

1. Create a new shortcut
2. Click the key button to open key selector
3. The modal should show the current key in large text
4. Try pressing different keys:
   - Left Shift → Display changes to "SHIFT LEFT"
   - Right Shift → Display changes to "SHIFT RIGHT"
   - Space → Display changes to "SPACE"
5. The display updates immediately when you press a key

**Expected Result:** ✅ Clear, real-time feedback about which key was pressed

---

### Test 7: Delay Setting

**Goal:** Verify the delay setting still works correctly

1. Open **Settings → Doubleshift**
2. Adjust the **Delay** slider to different values (e.g., 300ms, 500ms, 800ms)
3. Test double-pressing a configured key at different speeds
4. With lower delay: Need to press faster
5. With higher delay: Can press more slowly

**Expected Result:** ✅ Delay setting controls how quickly you need to double-press

---

### Test 8: Multiple Shortcuts

**Goal:** Test multiple shortcuts with different left/right keys

Create this configuration:
- Left Shift → Command palette
- Right Shift → File switcher
- Left Control → Search
- Right Control → Quick switcher

Test each one:
1. Double-press left Shift → Command palette
2. Double-press right Shift → File switcher
3. Double-press left Control → Search
4. Double-press right Control → Quick switcher

**Expected Result:** ✅ All shortcuts work independently without conflicts

---

### Test 9: Shortcut Deletion

**Goal:** Verify shortcuts can be deleted

1. Create a test shortcut (any key + command)
2. Click the trash icon next to the shortcut
3. The shortcut should disappear from the list
4. The key should no longer trigger any command

**Expected Result:** ✅ Shortcuts delete cleanly

---

### Test 10: Settings Persistence

**Goal:** Verify settings save and load correctly

1. Configure several shortcuts with different left/right keys
2. Close Obsidian completely
3. Reopen Obsidian
4. Open **Settings → Doubleshift**
5. All shortcuts should still be there with correct left/right key labels
6. Test each shortcut to verify they still work

**Expected Result:** ✅ Settings persist across restarts

---

## Troubleshooting

### Issue: Plugin doesn't appear in settings

**Solution:**
- Check that all three files are in the plugins folder: `main.js`, `manifest.json`, `styles.css`
- Try restarting Obsidian
- Check that Community plugins are enabled in Settings

### Issue: Keys not being detected

**Solution:**
- Some keyboards might not have distinct left/right keys
- Try on a standard keyboard
- Check that no other plugin is capturing the key events

### Issue: Display shows "ShiftLeft" instead of "Shift Left"

**Solution:**
- This means the formatting function isn't working
- Check that you're running the latest built version
- Try rebuilding: `npm run build`

### Issue: Old shortcuts don't work after update

**Solution:**
- Open Settings → Doubleshift
- The shortcuts should auto-migrate on first load
- If they show "Shift" instead of "Shift Left", try:
  1. Delete the old shortcut
  2. Create a new one with the left key

## Quick Test Script

Here's a quick test script to verify everything works:

1. ✅ Open Settings → Doubleshift
2. ✅ Verify default shortcut shows "Shift Left" (not "Shift")
3. ✅ Double-press left Shift → Command palette opens
4. ✅ Double-press right Shift → Nothing happens
5. ✅ Click "Add" to create new shortcut
6. ✅ Select any command
7. ✅ Press right Shift in key selector → Shows "SHIFT RIGHT"
8. ✅ Save and test: double-press right Shift → Command executes
9. ✅ Both left and right Shift shortcuts work independently

If all steps pass, the plugin is working correctly! ✅

## Additional Testing with Different Keyboards

### macOS
- Test with both built-in keyboard and external keyboard
- Verify Command (Meta) keys work on both sides
- Test Option (Alt) keys on both sides

### Windows
- Test with both built-in keyboard and external keyboard
- Verify Windows (Meta) keys work on both sides
- Test Alt keys on both sides

### Linux
- Test with your keyboard layout
- Verify Super/Meta keys work on both sides
- Test Alt keys on both sides

## Reporting Issues

If you find any issues during testing:

1. Note which test case failed
2. Record your:
   - OS version
   - Obsidian version
   - Keyboard type (built-in vs external)
3. Check the Obsidian console (View → Toggle Developer Tools → Console) for errors
4. Report the issue with these details

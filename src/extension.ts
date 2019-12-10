import * as vscode from 'vscode';
import { resolveCliPathFromVSCodeExecutablePath } from 'vscode-test';

// this method is called when your extension is activated.
export function activate(context: vscode.ExtensionContext) {
	const moveBeginingOfLine = () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const begin = editor.selection.active.with({ character: 0 });
		editor.selection = new vscode.Selection(begin, begin);
	};
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.moveBeginingOfLine", moveBeginingOfLine));


	const moveEndOfLine = () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const end = editor.document.lineAt(editor.selection.active.line).range.end;
		editor.selection = new vscode.Selection(end, end);
	};
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.moveEndOfLine", moveEndOfLine));
}

// this method is called when your extension is deactivated.
export function deactivate() { }

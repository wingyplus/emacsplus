import * as vscode from 'vscode';
import { resolveCliPathFromVSCodeExecutablePath } from 'vscode-test';

// this method is called when your extension is activated.
export function activate(context: vscode.ExtensionContext) {
	const moveBeginingOfLine = (editor: vscode.TextEditor) => {
		const begin = editor.selection.active.with({ character: 0 });
		editor.selection = new vscode.Selection(begin, begin);
	};
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.moveBeginingOfLine", moveBeginingOfLine));

	const moveEndOfLine = (editor: vscode.TextEditor) => {
		const end = editor.document.lineAt(editor.selection.active.line).range.end;
		editor.selection = new vscode.Selection(end, end);
	};
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.moveEndOfLine", moveEndOfLine));

	const backwardChar = (editor: vscode.TextEditor) => moveCursor(editor, 'backward');
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.backwardChar", backwardChar));

	const forwardChar = (editor: vscode.TextEditor) => moveCursor(editor, 'forward');
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.forwardChar", forwardChar));

	const nextLine = (editor: vscode.TextEditor) => moveCursor(editor, 'next');
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.nextLine", nextLine));

	const previousLine = (editor: vscode.TextEditor) => moveCursor(editor, 'previous');
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.previousLine", previousLine));
}

// this method is called when your extension is deactivated.
export function deactivate() { }

function moveCursor(editor: vscode.TextEditor, moveTo: 'backward' | 'forward' | 'previous' | 'next') {
	let pos = editor.selection.active;

	// validate before move cursor.
	switch (moveTo) {
		case 'backward':
			if (pos.character <= 0) {
				return;
			}
			break;
		case 'forward':
			if (pos.character >= editor.document.lineAt(pos.line).range.end.character) {
				return;
			}
			break;
		case 'next':
			if (pos.line >= editor.document.lineCount - 1) { // line start from 0.
				return;
			}
			break;
		case 'previous':
			if (pos.line <= 0) {
				return;
			}
			break;
	}

	pos = nextCursor(editor.selection.active, moveTo);
	editor.selection = new vscode.Selection(pos, pos);
}

function nextCursor(currentPosition: vscode.Position, moveTo: 'backward' | 'forward' | 'previous' | 'next'): vscode.Position {
	switch (moveTo) {
		case 'backward':
			return currentPosition.with({
				character: currentPosition.character - 1,
			});
		case 'forward':
			return currentPosition.with({
				character: currentPosition.character + 1,
			});
		case 'previous':
			return currentPosition.with({
				line: currentPosition.line - 1,
			});
		case 'next':
			return currentPosition.with({
				line: currentPosition.line + 1,
			});
		default:
			return currentPosition;
	}
}
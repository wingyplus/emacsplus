import * as vscode from "vscode";
import {
	moveBeginingOfLine, moveEndOfLine, backwardChar, forwardChar, nextLine, previousLine, backToIdentation
} from "./command";
import {
	xrefFindDefinition, xrefPopMarkerStack,
} from "./xref";

// this method is called when your extension is activated.
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.moveBeginingOfLine", moveBeginingOfLine));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.moveEndOfLine", moveEndOfLine));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.backwardChar", backwardChar));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.forwardChar", forwardChar));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.nextLine", nextLine));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.previousLine", previousLine));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.backToIndentation", backToIdentation));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.xrefFindDefinition", xrefFindDefinition));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand("emacsplus.xrefPopMarkerStack", xrefPopMarkerStack));
}

// this method is called when your extension is deactivated.
export function deactivate() { }

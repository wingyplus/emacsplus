import * as vscode from "vscode";

/**
 * find a reference.
 */
export const xrefFindDefinition = () => {
    vscode.commands.executeCommand("editor.action.revealDefinition");
};

/**
 * go back to previous xrefFindDefinition invoked.
 */
export const xrefPopMarkerStack = () => {
    vscode.commands.executeCommand("workbench.action.navigateBack");
};
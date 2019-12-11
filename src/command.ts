import * as vscode from "vscode";

/**
 * move cursor to beginning of line.
 */
export const moveBeginingOfLine = (editor: vscode.TextEditor) => {
    const begin = editor.selection.active.with({ character: 0 });
    editor.selection = new vscode.Selection(begin, begin);
};

/**
 * move cursor to end of line.
 */
export const moveEndOfLine = (editor: vscode.TextEditor) => {
    const end = editor.document.lineAt(editor.selection.active.line).range.end;
    editor.selection = new vscode.Selection(end, end);
};

/**
 * move cursor backward 1 character.
 */
export const backwardChar = () => moveCursor("backward");

/**
 * move cursor forward 1 character.
 */
export const forwardChar = () => moveCursor("forward");

/**
 * move cursor to next line.
 */
export const nextLine = () => moveCursor("next");

/**
 * move cursor back to previous line.
 */
export const previousLine = () => moveCursor("previous");

/**
 * move cursor to first non-whitespace character.
 */
export const backToIdentation = (editor: vscode.TextEditor) => {
    const pos = editor.selection.active.with({
        character: editor.document.lineAt(editor.selection.active.line).firstNonWhitespaceCharacterIndex
    });
    editor.selection = new vscode.Selection(pos, pos);
};

export const gotoLine = () => vscode.commands.executeCommand("workbench.action.gotoLine");

const moveCursor = async (moveTo: "backward" | "forward" | "previous" | "next") => {
    let cmd;
    switch (moveTo) {
        case "backward":
            cmd = {
                to: "left",
                by: "character",
                value: 1,
            };
            break;
        case "forward":
            cmd = {
                to: "right",
                by: "character",
                value: 1,
            };
            break;
        case "next":
            cmd = {
                to: "down",
                by: "line",
                value: 1,
            };
            break;
        case "previous":
            cmd = {
                to: "up",
                by: "line",
                value: 1,
            };
            break;
    }
    await vscode.commands.executeCommand("cursorMove", cmd);
};

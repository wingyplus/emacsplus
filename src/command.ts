import * as vscode from 'vscode';

/**
 * move cursor to beginning of line.
 *
 * @param editor
 */
export const moveBeginingOfLine = (editor: vscode.TextEditor) => {
    const begin = editor.selection.active.with({ character: 0 });
    editor.selection = new vscode.Selection(begin, begin);
};

/**
 * move cursor to end of line.
 *
 * @param editor
 */
export const moveEndOfLine = (editor: vscode.TextEditor) => {
    const end = editor.document.lineAt(editor.selection.active.line).range.end;
    editor.selection = new vscode.Selection(end, end);
};

/**
 * move cursor backward 1 character.
 *
 * @param editor
 */
export const backwardChar = (editor: vscode.TextEditor) => moveCursor(editor, 'backward');

/**
 * move cursor forward 1 character.
 *
 * @param editor
 */
export const forwardChar = (editor: vscode.TextEditor) => moveCursor(editor, 'forward');

/**
 * move cursor to next line.
 *
 * @param editor
 */
export const nextLine = (editor: vscode.TextEditor) => moveCursor(editor, 'next');

/**
 * move cursor back to previous line.
 *
 * @param editor
 */
export const previousLine = (editor: vscode.TextEditor) => moveCursor(editor, 'previous');

/**
 * move cursor to first non-whitespace character.
 *
 * @param editor
 */
export const backToIdentation = (editor: vscode.TextEditor) => {
    const pos = editor.selection.active.with({
        character: editor.document.lineAt(editor.selection.active.line).firstNonWhitespaceCharacterIndex
    });
    editor.selection = new vscode.Selection(pos, pos);
};

const moveCursor = (editor: vscode.TextEditor, moveTo: 'backward' | 'forward' | 'previous' | 'next') => {
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
};

const nextCursor = (currentPosition: vscode.Position, moveTo: 'backward' | 'forward' | 'previous' | 'next'): vscode.Position => {
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
};
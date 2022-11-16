import * as glob from 'glob';
import { join } from 'path';
import * as vscode from 'vscode';

export function workspaceRoot() {
  return vscode.workspace.rootPath!;
}

export function scenesRoot() {
  return join(workspaceRoot(), 'src', 'scenes');
}

export async function openFile(path: string) {
  const doc = await vscode.workspace.openTextDocument(path);
  vscode.window.showTextDocument(doc);
}

export function fullSceneName(name: string) {
  return `${name}Scene`;
}

export function findSceneIndex(name: string) {
  return glob.sync(`${scenesRoot()}/**/${name}/index.ts`);
}

export function findSceneFile(name: string) {
  return glob.sync(`${scenesRoot()}/**/${fullSceneName(name)}.ts`);
}

export function findScene(sceneName: string) {
  const indexPaths = findSceneIndex(sceneName);
  const naturalPaths = findSceneFile(sceneName);
  const paths = [...indexPaths, ...naturalPaths];
  return paths.length ? paths[0] : undefined;
}

export function searchForScene(sceneName: string) {
  vscode.commands.executeCommand('workbench.action.findInFiles', {
    query: fullSceneName(sceneName),
    triggerSearch: true,
    matchWholeWord: true,
    isCaseSensitive: true
  });
}

import { findScene } from "../utils";
import { MermaidLine, splitLines } from "./lines";




export const styleScenes = (text: string) => {
    const lines = splitLines(text).filter(Boolean) as MermaidLine[];
    const froms = lines.map(line => line.from);
    const tos = lines.map(line => line.to);
    const scenes = Array.from(new Set([...froms, ...tos]))
        .map(sceneName => `
    ${findScene(sceneName) ? "" : "class " + sceneName + " Red"};
    click ${sceneName} call postClickNode(${sceneName});
`);

    return `
    classDef Red fill:#f00,stroke:#333,stroke-width:4px;
${scenes.join('\n')}
`;
};
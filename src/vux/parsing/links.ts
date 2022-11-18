import { MermaidLine, splitLines } from "./lines";

export type MermaidLink = {
  name: string;
  cohort: string;
  group: string;
};

export const parseLink = (link: string): MermaidLink | null => {
  const linkMatch = link.match(/(\w*):(\w*):(\w*)/);
  if (linkMatch) {
    return {
      name: linkMatch[1],
      cohort: linkMatch[2],
      group: linkMatch[3]
    };
  }
  return null;
};

export const aggregateLinks = (text: string) => {
  const lines = splitLines(text);
  const links = lines
    .filter(line => line !== null)
    .map<readonly [MermaidLine, number]>(
      (line, index) => [line as MermaidLine, index] as const
    );

  const linkGroups: Record<string, number[]> = {};

  links.forEach(([link, index]) => {
    const linkObject = parseLink(link.link);
    if (!linkObject) {
      return null;
    }
    
    const linkGroupKey = `${linkObject.cohort}${linkObject.group}`;

    if (!linkGroups[linkGroupKey]) {
      linkGroups[linkGroupKey] = [];
    }

    linkGroups[linkGroupKey].push(index);
  });

  return linkGroups;
};

export const styleLinks = (text: string) => {
  let linkStyleString = "";

  const linkGroups = aggregateLinks(text);

  Object.values(linkGroups).forEach((linkGroup, index) => {
    const indexStr = linkGroup.join(',');
    const color = colorMap[index];

    if (!color) {
      throw new Error(`No color for index ${index}`);
    }
    linkStyleString += `linkStyle ${indexStr} stroke:${color};\n `;
  });
  
  return linkStyleString;
};

const colorMap = [
  'orange',
  'red',
  'green',
  'blue',
  'purple',
  'yellow',
  'pink',
  'brown',
  'black',
  'white',
  'gray',
  'cyan',
  'magenta',
  'lime',
  'maroon',
  'navy',
  'olive',
  'teal',
  'aqua',
  'fuchsia',
  'silver',
  'indigo',
  'violet',
  'coral',
  'crimson',
  'gold',
  'khaki',
  'lavender',
  'turquoise',
];

// Note: Hex colors seem to not be supported for this mermaid version
function getUnusedColors(count: number) {
  const colors: string[] = [];
  
  while(colors.length < count) {
    const color = getRandomColor();
    
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }
  return colors;
}

function getRandomColor() {
  const letters = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 3; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
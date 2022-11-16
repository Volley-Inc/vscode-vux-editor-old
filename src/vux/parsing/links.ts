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

  const linkIndexes = links.map(([link, index]) => {
    if (parseLink(link.link)) {
      return index;
    }
    return null;
  });
  return linkIndexes.filter(i => i !== null);
};

export const styleLinks = (text: string) => {
  const indexes = aggregateLinks(text);
  const indexStr = indexes.join(',');
  return indexes.length ? `linkStyle ${indexStr} stroke:orange;` : '';
};

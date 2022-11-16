export type MermaidLine = {
    from: string;
    to: string;
    link: string;
};

export const parseLine = (line: string): MermaidLine | null => {
    const match = line.match(/(.*)-->\|(.*)\|(.*)/);

    if (match) {
        return {
            from: match[1].trim(),
            link: match[2].trim(),
            to: match[3].trim()
        };
    }

    return null;
};

export const splitLines = (text: string) => {
    return text.split('\n').map(parseLine);
};

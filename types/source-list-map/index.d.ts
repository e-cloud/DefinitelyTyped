// Type definitions for source-list-map v0.1.6
// Project: http://github.com/webpack/source-list-map.git
// Definitions by: e-cloud <http://github.com/e-cloud>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare interface BaseNode {
    generatedCode: string;

    getGeneratedCode(): string;

    getMappings(mappingsContext: MappingsContext): string;

    getNormalizedNodes(): BaseNode[];

    mapGeneratedCode(fn: (code: string) => string): BaseNode;

    merge(otherNode: BaseNode): false | BaseNode;
}

export class CodeNode {
    generatedCode: string;

    constructor(generatedCode: string);

    clone(): CodeNode;

    getGeneratedCode(): string;

    getMappings(mappingsContext: MappingsContext): string;

    addGeneratedCode(generatedCode: string): void;

    mapGeneratedCode(fn: (code: string) => string): CodeNode;

    getNormalizedNodes(): this[];

    merge(otherNode: CodeNode): false | this;
}

export class MappingsContext {
    sources: string[];
    sourcesContent: string[];
    hasSourceContent: boolean;
    currentOriginalLine: number;
    currentSource: number;
    unfinishedGeneratedLine: false | number;

    constructor();

    ensureSource(source: string, originalSource: string): number;
}

declare class SingleLineNode {
    generatedCode: string;
    source: string;
    originalSource: string;
    line: number;
    _endsWithNewLine: boolean;
    _numberOfLines: number;

    constructor(generatedCode: string, source: string, originalSource: string, line?: number);

    clone(): SingleLineNode;

    getGeneratedCode(): string;

    getMappings(mappingsContext: MappingsContext): string;

    getNormalizedNodes(): this[];

    mapGeneratedCode(fn: (code: string) => string): SingleLineNode;

    merge(otherNode: SingleLineNode): false | SourceNode | this;

    mergeSingleLineNode(otherNode: SingleLineNode): false | SourceNode | this;
}

export class SourceNode {
    generatedCode: string;
    source: string;
    originalSource: string;
    startingLine: number;
    _endsWithNewLine: boolean;
    _numberOfLines: number;

    constructor(generatedCode: string, source: string, originalSource: string, startingLine?: number);

    clone(): SourceNode;

    getGeneratedCode(): string;

    addGeneratedCode(code: string): void;

    getMappings(mappingsContext: MappingsContext): string;

    mapGeneratedCode(fn: (code: string) => string): BaseNode;

    getNormalizedNodes(): SingleLineNode[];

    merge(otherNode: SourceNode | SingleLineNode): false | this;

    mergeSourceNode(otherNode: SourceNode): false | this;

    mergeSingleLineNode(otherNode: SingleLineNode): false | this;

    addSingleLineNode(otherNode: SingleLineNode): void;
}

export class SourceListMap {
    children: BaseNode[];

    constructor(generatedCode: string | BaseNode | SourceListMap, source: string, originalSource: string);
    constructor(generatedCode: BaseNode[]);

    add(generatedCode: string | BaseNode | SourceListMap, source?: string, originalSource?: string): void;

    prepend(generatedCode: SourceListMap | BaseNode, source?: string, originalSource?: string): void;

    mapGeneratedCode(fn: (code: string) => string): SourceListMap;

    toString(): string;

    toStringWithSourceMap(options: {
        file: string;
    }): {
        source: string;
        map: {
            version: number;
            file: string;
            sources: string[];
            sourcesContent: string[] | undefined;
            mappings: string;
        };
    };
}

export function fromStringWithSourceMap(
    code: string, map: {
        sources: (string | BaseNode) [];
        sourcesContent: string[];
        mappings: string;
    }
): SourceListMap;

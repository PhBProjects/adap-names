import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.components = source;
    }

    public asString(delimiter: string = this.delimiter): string {let res: string = "";
        return this.components.join(delimiter);
    }

    public asDataString(): string {

        let res: string = "";
        for(let i = 0; i < this.components.length; i++) {
            for (let j = 0; j < this.components[i].length; j++) {
                if(this.components[i][j] === this.delimiter || this.components[i][j] === ESCAPE_CHARACTER){
                    res += ESCAPE_CHARACTER;
                }
                res += this.components[i][j];
            }
            if(i < this.components.length-1){
                res += this.delimiter;
            }
        }
        return res;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length <= 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if(i < 0 || i > this.components.length-1){
            throw new Error("Index out of bounds");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i > this.components.length - 1) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = c;
    }
    public insert(i: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public append(c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public remove(i: number): void {
        throw new Error("needs implementation or deletion");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

}
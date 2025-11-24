import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.components = source;
    }

    public clone(): Name {
        throw new StringArrayName(this.components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {;
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
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for(let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }


}
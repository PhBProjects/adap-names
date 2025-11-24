import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super();
        this.name = source;
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this.calcNoComponents();
    }

    public clone(): Name {
        throw new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = DEFAULT_DELIMITER): string {
        return this.name.replaceAll(this.delimiter, delimiter);
    }


    public asDataString(): string {
        let res: string = "";
        for(let i = 0; i < this.name.length; i++) {
            if(this.name[i] === this.delimiter || this.name[i] === ESCAPE_CHARACTER){
                res += ESCAPE_CHARACTER;
            }
            res += this.name[i];
        }
        return res;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public calcNoComponents(): void {
        if(this.name.length == 0){
            this.noComponents = 0;
        }
        let res = 1;
        for(let c of this.name){
            if(c === this.delimiter){
                res++;
            }
        }
        this.noComponents = res;
    }

    public getComponent(x: number): string {
        const components = this.name.split(this.delimiter);
        if (x < 0 || x >= components.length) {
            throw new Error("Index out of bounds");
        }
        return components[x];

    }

    public setComponent(n: number, c: string): void {
        let components: string [] = this.name.split(this.delimiter);
        if (n < 0 || n >= components.length) {
            throw new Error("Index out of bounds");
        }
        components[n] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        let components: string [] = this.name.split(this.delimiter);
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string): void {
        this.name += this.delimiter;
        this.name += c;
        this.noComponents++;
    }

    public remove(n: number): void{
        let components: string [] = this.name.split(this.delimiter);
        if (n < 0 || n >= components.length) {
            throw new Error("Index out of bounds");
        }

        components.splice(n, 1,);
        this.name = components.join(this.delimiter);
        this.noComponents--;
    }

    public concat(other: Name): void {
        console.log("StringName concat attempt")
        this.name += this.delimiter;
        this.name += other.asString(this.delimiter)
        this.calcNoComponents();
    }

}
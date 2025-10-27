export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    /** @methodtype constructor */
    constructor(other: string[], delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        this. components = other;
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not e stringscaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    /** @methodtype conversion-method */
    public asString(delimiter: string = this.delimiter): string {
         let result: string = "";
         let i: number;
         for (i = 0; i < this.components.length-1; i++) {
             result += this.components[i];
             result += delimiter;
         }
         result += this.components[i];
         return result;
    }

    /** 
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     */
    /** @methodtype conversion-method */
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
    /** @methodtype get-method */
    public getComponent(i: number): string {
        return this.components[i];
    }

    /** Expects that new Name component c is properly masked */
    /** @methodtype set-method */
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }
    /** @methodtype get-method */
     /** Returns number of components in Name instance */
     public getNoComponents(): number {
        return this.components.length;
    }

    /** Expects that new Name component c is properly masked */
    /** @methodtype operation */
    public insert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked */
    /** @methodtype operation */
    public append(c: string): void {
        this.components.push(c);
    }
    /** @methodtype operation */
    public remove(i: number): void {
        this.components.splice(i, 1);
    }

}
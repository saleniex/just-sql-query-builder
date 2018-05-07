import QueryBuilder from './QueryBuilder';

export default class InsertQueryBuilder extends QueryBuilder {
    private target: string;
    private fieldNames: string[];


    constructor(target: string, fieldNames: string[]) {
        super();
        this.target = target;
        this.fieldNames = fieldNames;
    }

    build(): void {
        this.resetQuery();
        this.addInsert();
        this.addValues();
    }

    private addInsert(): void {
        if ( ! this.target) {
            throw new Error('Cannot build INSERT query. No target specified.');
        }
        this.addClause(`INSERT INTO ${this.target} (${this.getFieldNamesStr()})`);
    }

    private addValues(): void {
        let placeholders: string[] = [];
        for (let i = 0; i < this.fieldNames.length; i++) {
            placeholders.push('?');
        }
        this.addClause(`VALUES (${placeholders.join(',')})`);
    }

    private getFieldNamesStr(): string {
        return this.fieldNames.join(',');
    }
}
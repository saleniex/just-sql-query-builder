import SelectableQueryBuilder from './SelectableQueryBuilder';

export default class UpdateQueryBuilder extends SelectableQueryBuilder {
    private values: object = {};

    build(): void {
        this.resetQuery();
        this.addUpdate();
        this.addSet();
        this.addWhere();
        this.addLimit();
    }


    public addValue(name: string, value: string): void {
        this.values[name] = value;
    }


    public getConditionParams(): any[] {
        const values = [];
        for (let fieldName in this.values) {
            values.push(this.values[fieldName]);
        }
        values.push(...super.getConditionParams());

        return values;
    }


    private addUpdate(): void {
        this.addClause(`UPDATE ${this.target}`);
    }


    private addSet(): void {
        const fieldValuePairs = this.getFieldValueSetString();
        if ( ! fieldValuePairs) {
            throw new Error('Cannot build UPDATE query. Nothing to update.');
        }
        this.addClause(`SET ${fieldValuePairs}`);
    }


    private getFieldValueSetString(): string {
        let result = '';
        for (let fieldName in this.values) {
            const pair = `${fieldName} = ?`;
            result = result === '' ? pair : `${result}, ${pair}`;
        }

        return result;
    }
}
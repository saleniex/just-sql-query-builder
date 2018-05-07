import SelectableQueryBuilder from './SelectableQueryBuilder';

export default class DeleteQueryBuilder extends SelectableQueryBuilder {
    build(): void {
        this.resetQuery();
        this.addDelete();
        this.addWhere();
        this.addLimit();
    }


    private addDelete(): void {
        if ( ! this.target) {
            throw new Error('Cannot build DELETE query. No target specified.');
        }
        this.addClause(`DELETE FROM ${this.target}`);
    }
}
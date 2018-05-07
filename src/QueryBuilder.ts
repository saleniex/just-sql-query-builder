export default abstract class QueryBuilder {

    private query: string;

    /**
     * Build and return condition string
     * @returns {string}
     */
    public abstract build(): void;


    public getQuery(): string {
        return this.query;
    }


    public buildAndGetQuery(): string {
        this.build();

        return this.query;
    }

    protected addClause(clause: string): void {

        this.query = this.query
            ? `${this.query} ${clause}`
            : clause;
    }

    protected resetQuery(): void {
        this.query = '';
    }
}
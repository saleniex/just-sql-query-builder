import SelectableQueryBuilder from './SelectableQueryBuilder';

export default class SelectQueryBuilder extends SelectableQueryBuilder {
    private select: string;
    private groupBy: string;
    private orderBy: string;
    private having: string;


    build(): void {
        this.resetQuery();
        this.addSelect();
        this.addFrom();
        this.addWhere();
        this.addGroupBy();
        this.addHaving();
        this.addOrder();
        this.addLimitAndOffset();
    }


    public selectFields(select: string): void {
        this.select = select;
    }


    public selectFrom(from: string): void {
        this.target = from;
    }


    public groupResultsBy(groupBy: string): void {
        this.groupBy = groupBy;
    }


    public orderResultsBy(orderBy: string): void {
        this.orderBy = orderBy;
    }


    public havingResults(having: string): void {
        this.having = having;
    }


    private addSelect(): void {
        this.addClause(`SELECT ${this.select ? this.select : '*'}`);
    }


    private addFrom(): void {
        if ( ! this.target) {
            throw new Error('Cannot build select query. No FROM is set.');
        }
        this.addClause(`FROM ${this.target}`);
    }


    private addOrder(): void {
        if ( ! this.orderBy) {
            return;
        }
        this.addClause(`ORDER BY ${this.orderBy}`);
    }


    private addGroupBy(): void {
        if ( ! this.groupBy) {
            return;
        }

        this.addClause(`GROUP BY ${this.groupBy}`)
    }

    private addHaving(): void {
        if ( ! this.having) {
            return;
        }

        this.addClause(`HAVING ${this.having}`);
    }
}
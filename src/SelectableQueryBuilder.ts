import QueryBuilder from './QueryBuilder';
import Condition from './Condition';

export default abstract class SelectableQueryBuilder extends QueryBuilder {
    protected target: string;
    protected conditions: Condition[] = [];
    private limit: number = 0;
    private offset: number = 0;

    constructor(target: string = null) {
        super();
        this.target = target;
    }


    public andCondition(conditions: string, params: any[] = []): void {
        this.conditions.push(new Condition(conditions, params));
    }


    public getConditions(): string {
        let conditionString = '';
        for (let i = 0; i < this.conditions.length; i++) {
            if (i > 0) {
                conditionString = `${conditionString} AND `;
            }
            conditionString = `${conditionString}${this.conditions[i].condition}`;
        }

        return conditionString;
    }


    public getConditionParams(): any[] {
        const params: any[] = [];
        for (let i = 0; i < this.conditions.length; i++) {
            params.push(...this.conditions[i].parameter);
        }

        return params;
    }


    public hasConditions(): boolean {
        return this.conditions.length > 0;
    }


    public setLimit(limit: number): void {
        this.limit = limit;
    }


    public setOffset(offset: number): void {
        this.offset = offset;
    }


    protected addWhere(): void {
        if ( ! this.hasConditions()) {
            return;
        }
        const conditions = this.getConditions();
        this.addClause(`WHERE ${conditions}`);
    }


    protected addLimit(): void {
        if (this.limit === 0) {
            return;
        }
        this.addClause(`LIMIT ${this.limit}`);
    }

    protected addOffset(): void {
        if (this.offset === 0) {
            return;
        }
        this.addClause(`OFFSET ${this.offset}`);
    }

    protected addLimitAndOffset(): void {
        this.addLimit();
        this.addOffset();
    }
}
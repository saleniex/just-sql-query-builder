export default class Condition {
    readonly condition: string;
    readonly parameter: any[];

    constructor(condition: string, parameter: any[]) {
        this.condition = condition;
        this.parameter = parameter;
    }
}
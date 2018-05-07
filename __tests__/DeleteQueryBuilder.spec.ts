import { DeleteQueryBuilder } from '../src/index';

describe('Delete query builder', () => {
    it('DELETE with no target', () => {
        const qb = new DeleteQueryBuilder();
        expect(() => {
            qb.build();
        }).toThrowError('Cannot build DELETE query. No target specified.');
    });

    it('DELETE with WHERE', () => {
        const qb = new DeleteQueryBuilder('test_table');
        qb.andCondition('field1 = ?', ['foo']);
        qb.build();
        expect(qb.getQuery()).toBe('DELETE FROM test_table WHERE field1 = ?');
        expect(qb.getConditionParams()).toEqual(['foo']);
    });

    it('DELETE with double build', () => {
        const qb = new DeleteQueryBuilder('test_table');
        qb.build();
        expect(qb.getQuery()).toBe('DELETE FROM test_table');

        qb.setLimit(10);
        qb.build();
        expect(qb.getQuery()).toBe('DELETE FROM test_table LIMIT 10');
    });
});
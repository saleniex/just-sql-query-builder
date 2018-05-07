import { UpdateQueryBuilder } from '../src/index';

describe('Update query builder', () => {
    it('UPDATE with no SET', () => {
        const qb = new UpdateQueryBuilder('test_table');
        expect(() => {
            qb.build();
        }).toThrowError('Cannot build UPDATE query. Nothing to update.');
    });


    it('UPDATE with no WHERE', () => {
        const qb = new UpdateQueryBuilder('test_table');
        qb.addValue('field1', 'foo');
        qb.addValue('field2', 'boo');
        qb.build();
        expect(qb.getQuery()).toBe("UPDATE test_table SET field1 = ?, field2 = ?");
        expect(qb.getConditionParams()).toEqual(['foo', 'boo']);
    });

    it('UPDATE with WHERE', () => {
        const qb = new UpdateQueryBuilder('test_table');
        qb.addValue('field1', 'foo');
        qb.addValue('field2', 'boo');
        qb.andCondition('field3 = ?', [30]);
        qb.andCondition('field4 = ?', [40]);
        qb.build();
        expect(qb.getQuery()).toBe("UPDATE test_table SET field1 = ?, field2 = ? WHERE field3 = ? AND field4 = ?");
        expect(qb.getConditionParams()).toEqual(['foo', 'boo', 30, 40]);
    });


    it('UPDATE with LIMIT', () => {
        const qb = new UpdateQueryBuilder('test_table');
        qb.addValue('field1', 'foo');
        qb.andCondition('field3 = ?', [30]);
        qb.setLimit(10);
        qb.build();
        expect(qb.getQuery()).toBe("UPDATE test_table SET field1 = ? WHERE field3 = ? LIMIT 10");
        expect(qb.getConditionParams()).toEqual(['foo', 30]);
    });
});
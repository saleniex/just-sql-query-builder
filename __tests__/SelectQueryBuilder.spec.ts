import { SelectQueryBuilder } from '../src/index';

describe('Select query builder', () => {
    it('Simple SELECT', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table');
    });

    it('Simple SELECT single build and get.', () => {
        const qb = new SelectQueryBuilder('test_table');
        expect(qb.buildAndGetQuery()).toBe('SELECT * FROM test_table');
    });

    it('SELECT with conditions.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.andCondition('(field1 = ? OR field2 = ?)', [10, 20]);
        qb.andCondition('(field3 = ? OR field4 = ?)', [30, 40]);
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table WHERE (field1 = ? OR field2 = ?) AND (field3 = ? OR field4 = ?)');
        expect(qb.getConditionParams()).toEqual([10, 20, 30, 40]);
    });

    it('SELECT with specific fields.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.selectFields('field1, field2');
        qb.build();
        expect(qb.getQuery()).toBe('SELECT field1, field2 FROM test_table');
    });

    it('SELECT with from setter.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.selectFrom('alt_test_from');
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM alt_test_from');
    });

    it('SELECT with GROUP BY.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.groupResultsBy('group_field');
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table GROUP BY group_field');
    });

    it('SELECT with ORDER BY.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.orderResultsBy('order_field DESC');
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table ORDER BY order_field DESC');
    });

    it('SELECT with HAVING.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.havingResults('field1 = "foo"');
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table HAVING field1 = "foo"');
    });


    it('SELECT with only LIMIT.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.setLimit(10);
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table LIMIT 10');
    });

    it('SELECT with only OFFSET.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.setOffset(10);
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table OFFSET 10');
    });

    it('SELECT with LIMIT and OFFSET.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.setOffset(10);
        qb.setLimit(9);
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table LIMIT 9 OFFSET 10');
    });

    it('SELECT correct clause order.', () => {
        const qb = new SelectQueryBuilder('test_table');
        qb.andCondition('field1 = ?', [10]);
        qb.groupResultsBy('group_field');
        qb.havingResults('field1 = "foo"');
        qb.orderResultsBy('order_field ASC');
        qb.setLimit(10);
        qb.setOffset(1);
        qb.build();
        expect(qb.getQuery()).toBe('SELECT * FROM test_table WHERE field1 = ? GROUP BY group_field HAVING field1 = "foo" ORDER BY order_field ASC LIMIT 10 OFFSET 1');
    });

    it('SELECT with no FROM.', () => {
        const qb = new SelectQueryBuilder();
        expect(() => {
            qb.build();
        }).toThrowError('Cannot build select query. No FROM is set.');
    });
});
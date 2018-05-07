import { InsertQueryBuilder } from '../src/index';

describe('Insert query builder', () => {

    it('Simple insert.', () => {
        const qb = new InsertQueryBuilder('test_table', ['field1', 'field2']);
        qb.build();

        expect(qb.getQuery()).toBe('INSERT INTO test_table (field1,field2) VALUES (?,?)');
    });
});
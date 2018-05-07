# simple-sql-query-builder
Simple SQL query builder
- helps create reusable SQL queries
- extensible
- SQL database agnostic

# Usage example
```typescript
import { SelectQueryBuilder } from 'simple-sql-query-builder';

const qb = new SelectQueryBuilder('test_table');
qb.andCondition('field1 = ?', [10]);
qb.groupResultsBy('group_field');
qb.havingResults('field1 = "foo"');
qb.orderResultsBy('order_field ASC');
qb.setLimit(10);
qb.setOffset(1);

console.log('Query: ' + qb.buildAndGetQuery());
console.log('Params: ' + qb.getConditionParams());

```

**Result "Query: "**
```sql
SELECT * FROM test_table WHERE field1 = ? GROUP BY group_field HAVING field1 = "foo" ORDER BY order_field ASC LIMIT 10 OFFSET 1
```

**Result "Params: "**
```sql
[10]
```


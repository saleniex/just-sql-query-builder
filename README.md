# Just a simple SQL query builder
Simple library to help with creating reusable SQL queries independent from DB.

- helps create reusable SQL queries
- extensible
- SQL database agnostic

# Usage example

## SELECT

```typescript
const jsqb = require('just-sql-query-builder');

const qb = new jsqb.SelectQueryBuilder('test_table');
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

## UPDATE

```typescript
const jsqb = require('just-sql-query-builder');

const qb = new jsqb.UpdateQueryBuilder('test_table');
qb.addValue('field1', 'foo');
qb.andCondition('field3 = ?', [30]);
qb.setLimit(10);

console.log('Query: ' + qb.buildAndGetQuery());
console.log('Params: ' + qb.getConditionParams());

```

**Result "Query: "**
```sql
UPDATE test_table SET field1 = ? WHERE field3 = ? LIMIT 10
```

**Result "Params: "**
```sql
['foo', 30]
```

## DELETE

```typescript
const jsqb = require('just-sql-query-builder');

const qb = new jsqb.DeleteQueryBuilder('test_table');
qb.andCondition('field1 = ?', ['foo']);

console.log('Query: ' + qb.buildAndGetQuery());
console.log('Params: ' + qb.getConditionParams());

```

**Result "Query: "**
```sql
DELETE FROM test_table WHERE field1 = ?
```

**Result "Params: "**
```sql
['foo']
```

## INSERT

```typescript
const jsqb = require('just-sql-query-builder');

const qb = new InsertQueryBuilder('test_table', ['field1', 'field2']);

console.log('Query: ' + qb.buildAndGetQuery());
console.log('Params: ' + qb.getConditionParams());

```

**Result "Query: "**
```sql
INSERT INTO test_table (field1,field2) VALUES (?,?)
```

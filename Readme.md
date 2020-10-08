# MongoDb Aggregation

!["Mongoose Aggregation"](assets/images/mongodb.jpeg)

`This is a simple repository explaining the usage of different mongoose aggregation stages`

The json collection file for this project is in [persons.json](persons.json)

- \$match
- \$group
- \$count
- \$sort
- \$project
- \$limit
- \$unwind

### Accumulators

`We do know most aggregate accumulators function inside a group stage`

- \$sum
- \$avg

`Unary operators are used in the group stage`

- \$type
- \$lt
- \$gt
- \$multiply
- \$or
- \$and

Unary operators can also be used in the group stage in conjunction with Accumulators

- \$out

### TIPS

- Each mongoose aggregation stage can use maximum 100MB of RAM.
- Server will return error if limit is exceeded.
- We can choose to use temporal files instead of RAM by setting
  allowDiskUse:true

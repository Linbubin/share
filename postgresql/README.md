# postgresql 的坑

1. postgresql  limit 和offset 要加 order by  否则数据会混乱 [this](https://www.postgresql.org/docs/current/static/queries-limit.html)
2. postgresql 批量修改 [官方推荐](https://www.postgresql.org/message-id/AANLkTi=Xy9Q7BXTy19EDbsG3YWEL46mS-FJ6VFLH+xfu@mail.gmail.com), [网友推荐](https://stackoverflow.com/questions/7019831/bulk-batch-update-upsert-in-postgresql/20224370#20224370)

网友代码
```sql
update tmp set age = data_table.age
from
(select unnest(array['keith', 'leslie', 'bexley', 'casey']) as name, 
        unnest(array[44, 50, 10, 12]) as age) as data_table
where tmp.name = data_table.name;
```


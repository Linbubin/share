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

也可以根据select出来的值进行操作
```sql
update account_info set account_balance = account_balance - data_table.values
from
(SELECT o_r.detainee_id, sum(c_i.commodity_price * o_r.commodity_num) as values FROM order_record o_r,commodity_info c_i WHERE o_r.commodity_id = c_i.id group by o_r.detainee_id ) as data_table

where account_info.detainee_id = data_table.detainee_id;
```

3. postgreql 连接数量过多，导致不能再打开客户端
```
select * from pg_stat_activity;
```
就能看到 具体谁 连了postgresql中的哪个数据库，执行什么命令
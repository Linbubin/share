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

3. 联表修改，即t1表的a字段改成t2表的b字段，根据双方id相等
```sql
update t1 set a=t2.b from t2 where t1.id=t2.id;
```

4. postgreql 连接数量过多，导致不能再打开客户端
```sql
select * from pg_stat_activity;
```
就能看到 具体谁 连了postgresql中的哪个数据库，执行什么命令

5. 根据 某个字段是否为指定值 优先排序
> 比如推荐文章需要是和当前文章同类型
```sql
SELECT CASE WHEN (article_type = 111) THEN 1 ELSE 0 END AS cond FROM test ORDER BY cond;
```

6. 如果某个字段(price)在表中未赋值，可以将查询结果赋默认值(0)
> 查询金额时，如果未赋值，则默认为0
```sql
SELECT COALESCE(price, 0) as price FROM commodity;
```

7. 判断某个字段(detainee_jsid)是否为空(null)
> 不能用 `a=null`,也不能用 `5`中表示的先将其赋值再查询，因为两者是同时进行的
> 用 `is`
```sql
SELECT CASE WHEN (detainee_jsid is NULL) THEN 1 ELSE 0 END AS cond FROM detainee_model ORDER BY cond
```

8. 如果原字段为 timestamp，现在传入date数据，为了使其匹配，使用 `字段::类型`转
```sql
SELECT * FROM detainee_info_model WHERE detainee_rsrq::date in ('2017-10-01', '2017-11-01')
```

9. 计算某段时间内每天的值(没有的话自动为0暂时没想到方法展示)
```sql
SELECT COALESCE(count(id),0), to_char(detainee_rsrq, 'YYYY-MM-DD hh:mm:ss') as _datetime FROM detainee_info_model WHERE detainee_rsrq BETWEEN '2017-01-01' AND '2018-12-30' GROUP BY _datetime
```

10. 将查询出来的date属性转换成string属性 to_char
```sql
SELECT to_char(somedate, 'YYYY-MM-DD') FROM date_table;
```
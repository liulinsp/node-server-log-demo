/**
 * 用户相关路由
 */
const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', (ctx, next) => {
    console.log('获取所有用户');
    ctx.body = [
        {
            name: 'Tom',
            age: 20
        },
        {
            name: 'Jone',
            age: 18
        }
    ];
});


router.get('/:id', (ctx, next) => {
    const id = ctx.params.id;
    console.info(`获取指定ID的用户[${id}]`);

    if (id === '1') {
        ctx.body = {
            id: '1',
            name: 'Tom',
            age: 20
        };
    } else {
        console.error(`用户不存在，id：[${id}]`);
        ctx.body = {
            msg: '用户不存在！'
        };
    }

});

module.exports = router;
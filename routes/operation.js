var express = require('express');
var router = express.Router();
// const { medicineModel } = require('../model');
const { operationModel } = require('../model');
var model = require('../model')

// // 新增手术规划单
router.post('/addOperation', (req, res, next) => {

    console.log('请求携带的参数为', req.body)
    operationModel.create(req.body, (err, docs) => {
        if (!err) {
            console.log('数据库操作成功')
            res.send({
                code: 1,
                // data: `新增药品成功！药品名称为${query.name}`
            })
        } else {
            res.send({
                code: 0,
                data: '新增失败'
            })
        }
    })
});

// 从数据库中读取数据
router.post('/findOperation', (req, res, next) => {
    console.log('请求携带的参数为', req.body)
    operationModel.find(req.body, (err, docs) => {
        //err若存在则为数据库操作出错    
        if (!err) {
            console.log(docs)
            if (docs) {
                //send返回前端一个对象 code:1请求成功0请求失败 data可以放查询到的数据
                res.send({
                    code: 1,
                    data: docs
                })
            } else {
                res.send({
                    code: 0,
                })
            }

        }
    })
});

// 删除
router.post('/delOperation', function(req, res, next) {
    //post返回的参数以req.body为准   get以req.query
    console.log('请求携带的参数为', req.body)
        // req.query为前端请求带过来的参数
    operationModel.deleteOne(req.body, (err, docs) => {
        //err若存在则为数据库操作出错    
        if (!err) {
            console.log(docs)
                //判断删除数量是否大于0
            if (docs.n > 0) {
                //send返回前端一个对象 code:1请求成功0请求失败 data可以放查询到的数据
                res.send({
                    code: 1
                })
            } else {
                res.send({
                    code: 0
                })
            }

        }
    })

})


module.exports = router;
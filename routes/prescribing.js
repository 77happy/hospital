var express = require('express');
var router = express.Router();
const { medicineModel } = require('../model');
const { PrescribeModel } = require('../model');
var model = require('../model')

// 新增处方单
router.post('/addPre', function (req, res, next) {
    
    console.log('请求携带的参数为', req.body)
    //约束schema里定义了medList是数组，前端传输的medList是json字符串，这里把它转回数组
    req.body.medList=JSON.parse(req.body.medList); 
    PrescribeModel.create(req.body,(err, docs) => {
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



module.exports = router;
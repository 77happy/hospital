var express = require('express');
var router = express.Router();
const { medicineModel } = require('../model');
const { cabinetModel } = require('../model');
var model = require('../model')

// 
// 将前端传来的药品信息插入数据库
router.get('/putMedicine', function (req, res, next) {
  // console.log('请求携带的参数为', req.query)
  let query = req.query;
  //这里接到请求后会打印 query就是你地址后携带的数据
  //req.query的结构自定义，在地址后携带
  //向数据库中插入一个文档
  // 需要两个参数 StudentModel.create({doc(s)},callback()}
  // 用来创建一个或多个文档并添加到数据库中 
  // 参数：doc(s)可以是一个文档对象，也可以是一个文档对象的数组
  // callback是当操作完成后调用的回调函数
  medicineModel.create({
    mid: query.mid,
    name: query.name,
    specifications: query.specifications,
    term: query.term,
    batch: query.batch,
    dose: query.dose,
    price: query.price,
    classification: query.classification,
    cabinet: query.cabinet
  }, function (err) {
    if (!err) {
      console.log('数据库操作成功')
      res.send({
        code: 1,
        data: `新增药品成功！药品名称为${query.name}`
      })
    } else {
      res.send({
        code: 0,
        data: '新增药品失败'
      })
    }
  })
});
//根据cabinet来查询
router.post('/findMed', function (req, res, next) {
  //post返回的参数以req.body为准   get以req.query
  console.log('请求携带的参数为', req.body)
  // req.query为前端请求带过来的参数
  medicineModel.find(req.body, (err, docs) => {
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

})

//根据mid来删除
router.post('/delMed', function (req, res, next) {
  //post返回的参数以req.body为准   get以req.query
  console.log('请求携带的参数为', req.body)
  // req.query为前端请求带过来的参数
  medicineModel.deleteOne(req.body, (err, docs) => {
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


//根据mid来修改
router.post('/modifyMed', function (req, res, next) {
  //post返回的参数以req.body为准   get以req.query
  console.log('请求携带的参数为', req.body)


  let mid = req.body.mid;
  let { name, specifications, term, batch, dose, price, classification, cabinet } = req.body;



  // req.query为前端请求带过来的参数
  //updateOne 参数 第一项为查询条件，第二项为需要修改的数据
  medicineModel.updateOne({ mid: req.body.mid }, { name, specifications, term, batch, dose, price, classification, cabinet }, (err, docs) => {
    //err若存在则为数据库操作出错    
    if (!err) {
      console.log(docs)
      //判断修改数量是否大于0
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
//查询抽屉
router.post('/findCab', function (req, res, next) {
  //post返回的参数以req.body为准   get以req.query
  console.log('请求携带的参数为', req.body)
  // req.query为前端请求带过来的参数


  let cabinetList = [];// 抽屉列表
  let medicineList = [];//所有药品列表
  // 遍历查询的到的药品数据，生成想要的数据格式，再保存到Cabinet集合
  medicineModel.find({}, (err, docs) => {
    //err若存在则为数据库操作出错    
    if (!err) {
      // console.log(docs)
      medicineList = docs;
      //得到的docs中的某一项是默认只读的，当遇到需要修改model结构时，需要加上参数{lean:true}，这里我们给每一项model新增了个数据库没有的参数nowNum
      cabinetModel.find({}, null, { lean: true }, (err, docs) => {
        if (!err) {
          cabinetList = docs;
          for (let j = 0; j < cabinetList.length; j++) {
            cabinetList[j].nowNum = 0;//初始化每一项的nowNum当前药品数量
            for (let i = 0; i < medicineList.length; i++) {
              if (medicineList[i].cabinet == cabinetList[j].cid) {//判断每一个药品与每一个抽屉是否匹配，如果匹配，为该抽屉的nowNum++
                cabinetList[j].nowNum++;

              }
            }

          }

          res.send({
            code: 1,
            data: cabinetList
          })
        }
      })
    }
  })

})

module.exports = router;

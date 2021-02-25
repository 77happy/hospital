var express = require('express');
var router = express.Router();
const { ManageModel } = require('../model');
const { docotorModel } = require('../model');
var model = require('../model')
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// 下面写接口

// router.get('/test',function(req,res,next){
//   console.log('请求携带的参数为',req.query)
//   res.send(测试接口);
// });

// 
// 后端接收前端传来的账号密码，联系数据库判断管理员登录账号密码是否一致

router.post('/ManageLogin', function (req, res, next) {
  //post返回的参数以req.body为准   get以req.query
  console.log('请求携带的参数为', req.body)
  // req.query为前端请求带过来的参数
  ManageModel.findOne(req.body, (err, docs) => {
    //err若存在则为数据库操作出错    
    if (!err) {
      console.log(docs)
      //判断查询到的文档docs是否为空，查询成功即为cid与password正确，否则反之
      if (docs) {
        //send返回前端一个对象 code:1请求成功0请求失败 data可以放查询到的数据，这里因为是登录所以可以不用
        res.send({
          code: 1,
          data: '登录成功'
        })
      } else {
        res.send({
          code: 0,
          data: '用户不存在或密码错误'
        })
      }

    }
  })

})

router.post('/DocotorLogin', function (req, res, next) {
  console.log('请求携带的参数为', req.body)
  docotorModel.findOne(req.body, (err, docs) => {
    if (!err) {
      console.log(docs)
      if (docs) {
        res.send({
          code: 1,
          data: '医生登录成功'
        })
      } else {
        res.send({
          code: 0,
          data: '用户不存在或密码错误'
        })
      }
    }
  })
})


module.exports = router;

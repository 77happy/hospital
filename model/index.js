// mongoose数据库连接
const mongoose = require('mongoose')
    // 1.创建schema模式（约束）对象，对集合进行约束
    // mongoose.Schema赋值给schema
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/hospital', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
//使用connection监听数据库的状态
mongoose.connection.once('open', function() {
    console.log('数据库连接成功')
});
mongoose.connection.once('close', function() {
    console.log('数据库已断开')
});

// 管理员表的约束信息
var ManageSchema = new Schema({
        cid: String,
        name: String,
        tel: String,
        address: String,
        password: String
    })
    // 定义管理员操作器，通过model对数据库进行增删改查 注意映射的集合名要为复数，否则会出错
var ManageModel = mongoose.model('manages', ManageSchema);

// 药品表约束信息
var MedicineSchema = new Schema({
        mid: String,
        name: String,
        specifications: String,
        term: String,
        batch: String,
        dose: String,
        price: String,
        classification: String,
        cabinet: String
    })
    // 定义药品操作器，通过model对数据库进行增删改查 注意映射的集合名要为复数，否则会出错
var medicineModel = mongoose.model('medicines', MedicineSchema);

// 抽屉表约束信息
var CabinetSchema = new Schema({
    cid: String,
    num: Number
})
var cabinetModel = mongoose.model('cabinets', CabinetSchema);


// 医生表约束信息
var DocotorSchema = new Schema({
    did: String,
    name: String,
    tel: String,
    depart: String,
    posi: String,
    addr: String,
    password: String
})

var docotorModel = mongoose.model('docotors', DocotorSchema);

// 处方单表的约束信息


var PreSchema = new Schema({
    pid: String,
    patientName: String,
    patientOld: String,
    time: String,
    timeDetail: String,
    priceType: String,
    history: String,
    diagnosis: String,
    docotor: String,
    price: String,
    medList: [{
        mid: String,
        price: String,
        medName: String,
        medSpeci: String,
        medDose: String,
    }]
})
var PrescribeModel = mongoose.model('prescriptions', PreSchema);

// 手术规划单约束信息
var operSchema = new Schema({
    room: String,
    rid: String, //住院号
    time: String,
    timeDetail: String,
    beforeJud: String, //术前诊断
    operName: String,
    operPro: String, //可能出现的问题与对策情况
    evidence: String, //手术指证是否合理
    danger: String,
    blood: String,
    docEvent: String, //是否有术者术前查看患者相关情况
    agree: String,
    docAdvice: String,
    abiliPerson: String,
})

var operationModel = mongoose.model('operations', operSchema);
module.exports = {
    ManageModel,
    medicineModel,
    cabinetModel,
    docotorModel,
    PrescribeModel,
    operationModel
}
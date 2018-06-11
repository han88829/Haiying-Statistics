const url = require('url');
const MongoClient = require('mongodb').MongoClient;
const querystring = require('querystring');
const moggoUrl = 'mongodb://localhost:27017/haiying';
var ObjectID = require('mongodb').ObjectID;

exports.route = (req, res) => {
    const path = url.parse(req.url).pathname;

    switch (path) {
        case '/':
            console.log('我是默认页面');
            res.end(`111`);
            break;
        case '/api/type/add':
            let data = querystring.parse(url.parse(req.url).query);
            // 添加一个分类信息
            connectMogo('type', 'findOne').then(x => {
                if (x.arr && x.arr.name === data.name) {
                    x.db.close();
                    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                    res.end(JSON.stringify({ status: 0, msg: "数据已存在！", data: "" }));
                    return
                }
                connectMogo('type', 'insertOne', data).then(z => {
                    x.db.close();
                    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                    res.end(JSON.stringify({ status: 1, msg: "添加成功！", data }));
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err);
            })
            break;
        case '/api/type/list':
            // 返回所有的分类列表
            let arr = [];
            connectMogo('type', 'find').then(x => {
                x.db.close();
                res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end(JSON.stringify({ status: 1, msg: "查询成功！", data: x.arr }));

            }).catch(err => {
                console.log(err);
            })
            break;
        case '/api/type/edit':
            // 返回所有的分类列表
            let editEata = querystring.parse(url.parse(req.url).query);
            connectMogo('type', 'updateOne', { _id: ObjectID(editEata._id) }, { $set: { ...editEata, _id: ObjectID(editEata._id) } }).then(x => {
                x.db.close();
                res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end(JSON.stringify({ status: 1, msg: "编辑成功！", data: x.arr }));

            }).catch(err => {
                console.log(err);
            })
            break;
        case '/api/type/delete':
            // 返回所有的分类列表
            let deleteEata = querystring.parse(url.parse(req.url).query);
            connectMogo('type', 'deleteOne', { _id: ObjectID(deleteEata._id) }).then(x => {
                x.db.close();
                res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end(JSON.stringify({ status: 1, msg: "删除成功！", data: x.arr }));

            }).catch(err => {
                console.log(err);
            })
            break;

        default:
            // console.log(111);
            // res.end('else')
            break;
    }
}


function connectMogo(name, type, data = {}, updata = {}) {
    return new Promise((res, rej) => {
        try {
            MongoClient.connect(moggoUrl, function (err, db) {
                if (err) rej(err);
                var dbase = db.db("haiying");
                if (type === 'find') {
                    dbase.collection(name)[type](data).toArray((err, arr) => {
                        if (err) rej(err);
                        res({ db, arr })
                    });
                    return
                }

                dbase.collection(name)[type](data, updata, (err, arr) => {
                    if (err) rej(err);
                    res({ db, arr });
                })

            })
        } catch (error) {
            rej(error)
        }
    })
}
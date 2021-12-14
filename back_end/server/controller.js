var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var axios = require('axios');
var kill = require('tree-kill');
var fs = require('fs');
multer = require('multer');
path = require('path');
crypto = require('crypto');

var floor = "0";
var success="false";
<<<<<<< Updated upstream
var el_Call = 0;
var openresponse = false;
var CallHost;
=======

var openresponse = false;


>>>>>>> Stashed changes


/////////////////////////////pushAlarm///////////////// 
const admin = require("firebase-admin"); 
let serviceAccount = require("./firebase-admin.json"); 
const { Console } = require('console');
<<<<<<< Updated upstream
const internal = require('stream');
const { addAbortSignal } = require('stream');
=======
>>>>>>> Stashed changes
admin.initializeApp({ 
    credential: admin.credential.cert(serviceAccount), 
}); 
//////////////////////////////pushAlarm//////////////////





// 데이터베이스와 연결합니다.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'db_muyahome',
    port: 3306
});


exports.join = (req, res) => { //회원가입 요청시
    
    let res1 = res;
    var resultCode = 404;
    var message = '에러가 발생했습니다';

    //req.body는 APP에서 POST로 넘어온 값을 가지고 있고 sql명령문으로 디비에 insert문을 보냄
    connection.query("INSERT INTO `db_muyahome`.`home` (`PK_Home_id`,`Home_pw`,`Home_phonenum`,`Home_name`,`FK_Ho_code`) VALUES ('"
    +req.body.userId+"','"+req.body.userPw+"','"+req.body.userPhone+"','"+req.body.userName+"','"+req.body.hostcode+"');", 
    function(err, results,flied) {
        console.log(results);
        if(results!=null){
            console.log("회원가입성공.")
            resultCode = 200;
            message = "회원가입 되었습니다."
        }
        else{
            console.log("회원가입실패")
            resultCode = 204;
            message = "회원가입을 실패했습니다."
        }
        
        res1.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
            'code': resultCode,
            'message': message
        });
    });
};

exports.fam = (req, res) => {// 가족인원수
    console.log('가족구성원수 체크');
    console.log(req.body.hostcode);
    let res1 = res;

    connection.query("SELECT * FROM home Where FK_Ho_code = '" + req.body.hostcode + "';",
        function(err, results,  filed) {
            var resultCode = 404;
            var message = '에러가 발생했습니다';

            if(results[0] != null){
                console.log("인원수 성공")
                console.log(results.length)
                resultCode = 200;
                message = "인원수 불러오기 성공"                
            }
            else{
                console.log("인원수 실패")
                resultCode = 204;
                message = "인원수 불러오기 실패"
            }
            res1.json({
                'code' : resultCode,
                'message' : message,
                'fam' : results.length
            });
        });
};


exports.login = (req, res) => { //로그인 요청 시
    console.log('로그인');
    let res1 = res;
    
<<<<<<< Updated upstream
=======
 /*let deviceToken = `ddLrVeDlQpSjzqqqOoR8Jb:APA91bGuogihPK0vz3biMNZL2oLykvsEgunOws5S28m4auPhv3iKnKuFxTz3MxXtCBItFZP3vzlIy8OWUataA7qf_J0vGMiyTSr2pJrtb8lInHuWDjOc1k4kb_72nrTChUD0BUUhMaDj`
    let message1 = {
        notification: {
            title: '성공',
            body: '로그인성공',
        },
        token: deviceToken,
    }
    console.log('message success');
    admin
    .messaging()
    .send(message1)
    .then((response) => {
        console.log('Successfully sent message: : ', response)
        return res1.status(200).json({ success: true })
    })
    .catch((err) => {
        console.log('Error Sending message!!! : ', err)
        return res1.status(400).json({ success: false })
    })*/
>>>>>>> Stashed changes
    USERID = req.body.userId; //로그인을 할때 보냄 id값이 저장
    //디비에 SELECT문을 보냄
    console.log(req.body.userId, req.body.userPw);
    connection.query("SELECT PK_Home_id, Home_pw,FK_Ho_code F" +
        "ROM  db_muyahome.home where PK_Home_id='" + req.body.userId + "' AND Home_pw= '" + req.body.userPw + "';",
        function(Err,results, filed) {
            var resultCode = 404;
            var message = '에러가 발생했습니다';
            var hostcode;
<<<<<<< Updated upstream
=======
            console.log('456');
>>>>>>> Stashed changes
            if (results[0] != null) { //로그인을 할려고 한 데이터가 존재하면 검색한 결과가  NULL이 아니기 때문에 로그인 가능
                console.log("로그인 성공")
                resultCode = 200;
                message = "로그인성공"
                hostcode = results[0].FK_Ho_code;
<<<<<<< Updated upstream
                connection.query("SELECT PK_Ho_num FROM db_muyahome.ho WHERE PK_HO_Code=?;",hostcode,
                function(error,result,flieds){
                    console.log(hostcode);
                    console.log(result[0].PK_Ho_num);
                    res1.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                        'code': resultCode,
                        'message': message,
                        'userid': USERID,
                        'hostcode': hostcode,
                        'ho_num':result[0].PK_Ho_num,
                    });
                });
=======
                console.log(hostcode);

                        


>>>>>>> Stashed changes
            } else {
                { //로그인을 할려고 한 데이터가 존재하면 존재하지않으면  NULL이기 때문에 로그인 불가능가능
                    console.log("로그인 실패")
                    resultCode = 204;
                    message = "아이디와 비밀번호가 일치하지 않습니다."

<<<<<<< Updated upstream
                }
                res1.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                    'code': resultCode,
                    'message': message,
                    'userid': USERID,
                    'hostcode':hostcode,
                });

            }


=======
                   /* let deviceToken = `cLrmPXJmQsGjDghBwy0Acr:APA91bGcZ5mBeoEqop9oLKXfU16uTv_QiW_uCUo9XVev5Tb6Bz1rrTbcabbrIk03HvV5FZqJmm5Gdf1VUq9ElmEGfB2mVNxcK-JiZFJ48oa0SLonaXQOgG8dJyKHiXKDZ71h69BdvSGr`
                    let message1 = {
                        notification: {
                            title: '실패',
                            body: '아이디와 비밀번호가 일치하지 않습니다.',
                        },
                        token: deviceToken,
                    }
                    console.log('message success');
                    admin
                        .messaging()
                        .send(message1)
                        .then((response) => {
                            console.log('Successfully sent message: : ', response)
                            return res1.status(200).json({ success: true })
                        })
                        .catch((err) => {
                            console.log('Error Sending message!!! : ', err)
                            return res1.status(400).json({ success: false })
                        });*/

                }
                

            }
            res1.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                'code': resultCode,
                'message': message,
                'userid': USERID,
                'hostcode':hostcode,
            });
>>>>>>> Stashed changes
            
        });



};



exports.idcheck = (req, res) => { //아이디 중복요청시
    
    console.log(req.body.userId);
   
    let res1 = res;

    //디비에 SELECT문을 보냄
    connection.query("SELECT PK_Home_id FROM  home where PK_Home_id='" + req.body.userId + "';",
        function(err, results, filed) {
            console.log(results[0]);
            var resultCode = 404;
            var message = '에러가 발생했습니다';
            
            if (results[0] != null) { //보낸 데이터(아이디)가 디비에 있으면 결과값이 NULL아니다. 그러므로 가입한 아이디는 있는것이다.
                console.log("아이디있다.")
                resultCode = 204;
                message = "이미 유효한 아이디입니다."

            } else { //보낸 데이터(아이디)가 디비에 없으면 결과값이 NULL이다. 그러므로 가입한 아이디는 없는것이다.

                console.log("아이디없다.")
                resultCode = 200;
                message = "사용가능한 아이디입니다."
            }
            res1.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                'code': resultCode,
                'message': message
            });

        });
    


};



exports.codecheck = (req, res) => { //코드 중복요청시
    
    console.log(req.body.hostcode);
   
    let res1 = res;

    //디비에 SELECT문을 보냄
    connection.query("SELECT * FROM  Ho where PK_Ho_Code='" + req.body.hostcode + "';",
        function(err, results, filed) {
            console.log("SELECT * FROM  Ho where PK_Ho_Code='" + req.body.hostcode + "';");
            var resultCode = 404;
            var message = '에러가 발생했습니다';
            
            if (results != null) { 
                console.log("유효한코드")
                resultCode = 200;
                message = "유효한 코드입니다."
                console.log(results[0])

            } else { 

                console.log("무효한 코드")
                resultCode = 204;
                message = "무효한 코드입니다"
            }
            res1.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                'code': resultCode,
                'message': message,
                'ho' : results[0].PK_Ho_num
            });
        });
};

exports.callelevator12 = (req,res) => {
<<<<<<< Updated upstream
    var el_beforefloor;
    var call = el_Call;
=======
    console.log("엘베"+success);
    console.log("엘베"+floor);
>>>>>>> Stashed changes
    if(success=="false")
    {
        res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
            'message': "연결안됨",
        });
    }
    else if(success=="true"){
<<<<<<< Updated upstream
        console.log("엘리베이터 호출");
        if(floor.substring(0,1)=="1")
        {

            connection.query("SELECT * FROM  elevator where FK_Line_num=12;",
            function(err, results, filed) {
                el_beforefloor = results[0].Elevator_floor;
                res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                    'message': "연결됨",
                    'el_before':el_beforefloor,
                    'el_after':1,
                    'el_Call': call
                    });

            });

=======
        console.log("엘리베이터 호출")
        console.log(floor.substring(0,1));
        if(floor.substring(0,1)=="1")
        {
            
            connection.query("SELECT * FROM  elevator where FK_Line_num=12;",
            function(err, results, filed) {
            console.log(results[0].Elevator_floor)
            
            res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                'message': "연결됨",
                'el_before':results[0].Elevator_floor,
                'el_after':1
                });
            });
            
>>>>>>> Stashed changes
            connection.query("UPDATE elevator SET Elevator_floor=1 where FK_Line_num=12;");
            
        }
        else if(floor.substring(0,1)=="2")
        {
            connection.query("SELECT * FROM  elevator where FK_Line_num=12;",
            function(err, results, filed) {

                el_beforefloor = results[0].Elevator_floor;
                res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                    'message': "연결됨",
                    'el_before':el_beforefloor,
                    'el_after':2,
                    'el_Call': call
                    });
            });

            connection.query("UPDATE elevator SET Elevator_floor=2 where FK_Line_num=12;");
            
        }
        else if(floor.substring(0,1)=="3")
        {
            connection.query("SELECT * FROM  elevator where FK_Line_num=12;",
            function(err, results, filed) {
                el_beforefloor = results[0].Elevator_floor;
                res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                    'message': "연결됨",
                    'el_before':el_beforefloor,
                    'el_after':3,
                    'el_Call': call
                    });
            });

            connection.query("UPDATE elevator SET Elevator_floor=3 where FK_Line_num=12;");
<<<<<<< Updated upstream
        }


        floor="0";
        el_Call=0;
=======
            
        }
        floor="0";
>>>>>>> Stashed changes
        success="false";
    }
};

exports.keypad = (req, res) => {

    console.log("===keypad===");
    console.log(req.query);
    // if (req.query != "") {
    //     res.json({
    //         'message': '연결 테스트 성공?'
    //     });
    // }
    var reqNum = req.query.signal;
    var callHo = reqNum.substring(1, reqNum.length);
    console.log(callHo);

<<<<<<< Updated upstream
    connection.query("SELECT PK_Ho_Code,COUNT(*) AS cnt FROM ho WHERE PK_HO_num='"+callHo+"';",
=======
    connection.query("SELECT COUNT(*) AS cnt FROM ho WHERE PK_HO_num='"+callHo+"';",
>>>>>>> Stashed changes
        function(err, result) {
            if(result[0].cnt!=0) {
                res.json({
                    'message': 'Call Success'
                });
<<<<<<< Updated upstream
                console.log(result[0].PK_Ho_Code);
                connection.query("SELECT FK_HO_code,COUNT(*) AS cnt  FROM home WHERE FK_Ho_code='"+result[0].PK_Ho_Code+"';",
                function(ERR,results,Field){
                    if(results[0].cnt!=0)
                    {
                        CallHost=results[0].FK_HO_code;
                        openresponse = true;
                    }
                });
                
                InsertAlarm(callHo,callHo+"호에 문열림 요청");
=======
                openresponse = true;
>>>>>>> Stashed changes
            } else {
                res.json({
                    'message': 'Call Failure'
                });
            }
            res.end();
        }
    );

    // if (req.query != "") {
    //     res.json({
    //         'message': '연결 테스트 성공?'
    //     });
    // }
}

exports.mypage = (req, res) => {
    console.log("mypage");
    let res1 = res;
<<<<<<< Updated upstream
=======

   
        
    

>>>>>>> Stashed changes
    USERID = req.body.userId;

    //디비에 SELECT문을 보냄
    connection.query("SELECT * FROM  Home where PK_Home_id='" + req.body.userId + "';",
        function(err, results, filed) {
            var resultCode = 200;
            var message = '에러가 발생했습니다';
            
            console.log(results[0].Home_pw);
            console.log(results[0].Home_phonenum);
            console.log(results[0].Home_name);

            res1.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                'code': resultCode,
                'message': message,
                'userid': results[0].PK_Home_id,
                'userpw': results[0].Home_pw,
                'userphone':results[0].Home_phonenum,
                'username': results[0].Home_name
            });
    });
    

};

exports.update = (req, res) => {
    console.log("update");
    let res1 = res;

    userId = req.body.userId;
    userPw = req.body.userPw;
    userName = req.body.userName;
    userPhone = req.body.userPhone;
    sql = 'UPDATE Home SET Home_pw=?, Home_name=?, Home_phonenum=? where PK_Home_id = ?';
    params = [userPw, userName, userPhone, userId];
    connection.query(sql, params, 
        function(err, results, filed) {
            var resultCode = 404;
            var message = 'ERROR';

            if(err) {
                console.log(err);
            } else {
                resultCode = 200;
                message = '변경되었습니다.';
            }
            res.json({
                'code' : resultCode,
                'message' : message
            });
        });
};

exports.upload = (req, res) => {
    try {
        let file = req.file;
        let originalName = '';
        let fileName = '';
        let mimeType = '';
        let size = 0;

        if(file) {
            originalName = file.originalname;
            fileName = file.filename;
            mimeType = file.mimetype;
            size = file.size;
            console.log("excute" +"\n"+ fileName);
        }else {
            console.log("request is null");
        }
    } catch (err) {
        console.dir(err.stack);
    }
    console.log("1"+req.file);
    console.log(req.body);

    res.redirect("./../face_recognition/knowns/" + req.file.filename);
    // res.redirect("/uploads/" + req.file.filename);
    console.log("3"+req.file.filename);
    return res.status(200).end();
};

exports.uploadfile = (req, res) => {
    var file = req.params.upload;
    console.log("들어옴");
    console.log("4"+file);
    console.log("5"+req.params.upload);

    var filePath = path.join(__dirname, "../face_recognition/knowns/");
    var img = fs.readFile(filePath + file);

    // var img = fs.readFileSync(__dirname + "/uploads/" + file);
    // var img = fs.readFile(filePath + file, "utf8", function(err, data) {
    //     res.writeHead(200, {'Content-Type': 'image/png'});
    // });

    res.writeHead(200, {'Content-Type': 'image/png'});
    console.log(res);
    res.end(img, 'binary');
    
};

exports.cctvon = (req, res) => {

    console.log('들어옴');
    console.log(req.body.cctvon);

    let res1 = res;

    var resultCode = 404;
    var message = '에러가 발생했습니다';
    
};

exports.pir = (req, res) => {
    console.log("pir 센서 값을 받기 위함");
    console.log(req.body.pir);

    var pir_signal = req.body.pir;
    var date = new Date();
    var date_now = date.getTime()/1000;
    
    if(pir_signal==true){
        console.log("pir 센서 값 받기 성공");

        var {PythonShell} = require('python-shell');
        var face_signal = 'False'
        
        var options = {
            mode: 'text',
            pythonPath: 'C:/Python39/python.exe',
            pythonOptions: ['-u'],
            scriptPath: 'C:/Users/Administrator/Desktop/MuYaHome/back_end/face_recognition/',
            encoding: 'utf8',
            args: [date_now]
        }

        PythonShell.run('recognition.py', options, function(err, results) {
            console.log('얼굴 인식 실행 완료');
        
            console.log(results.length);
            console.log(results);
            console.log(results[results.length-1]);

            face_signal = results[results.length-1];

            kill(1, PythonShell.pid);            

            res.json({'face_signal' : face_signal});
            res.end();
        });
        
        PythonShell.run('record.py', options, function(err, results) {
            console.log('녹화 완료');

            if (face_signal == "True") {
                var Record_Folder = './Record';
                var recent_record;
                var delete_record;

                fs.readdir(Record_Folder, function(err, file_list) {
                    recent_record = file_list[file_list.length-1];
                    // console.log(recent_record);

                    delete_record = Record_Folder + '/' + recent_record;
                    // console.log(delete_record);

                    fs.unlink(delete_record, function (err) {
                        if (err) throw err;

                        console.log('얼굴인식 성공한 녹화 삭제됨');
                    }); 
                });              
            } else {
                console.log('얼굴인식 실패한 녹화 저장됨');
            }
        
            res.end();
        }); 
    }
};

exports.face = (req, res) => {
    console.log("얼굴인식 성공");
    console.log(req.body.face_id);

    success="true";
    // floor = parseInt(req.body.face_id);
    floor = req.body.face_id;
    
    res.end();
};

exports.ho_interface = (req, res) => {
    console.log("얼굴인식을 위해 호 정보 불러오기")

    // 디비에 SELECT문을 보냄
    connection.query("SELECT * FROM  Ho where PK_Ho_num;",
    function(err, results, filed) {
        var resultCode = 200;
        var message = '에러가 발생했습니다';
        
        console.log(results[0].Home_pw);
        console.log(results[0].Home_phonenum);
        console.log(results[0].Home_name);

        res1.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
            'code': resultCode,
            'message': message,
            'userid': results[0].PK_Home_id,
            'userpw': results[0].Home_pw,
            'userphone':results[0].Home_phonenum,
            'username': results[0].Home_name
        });
    });
}

exports.DoorOpen = (req, res) => {
    console.log("문열기요청");
    floor = req.body.ho_num;
<<<<<<< Updated upstream
    console.log(floor +"zzzz");
    success="true";
    el_Call=0;
=======
    
    success="true";
>>>>>>> Stashed changes
    res.end();
};

exports.elecall = (req, res) => {
    var elecallfloor;
    var ho_code;
    var ho_num;
    var line_num;
    userId=req.body.userId;
    el_Call=1;
    connection.query("SELECT * FROM HOME WHERE PK_Home_id='" + userId + "';",
    function(err, results, filed) {
        ho_code=results[0].FK_Ho_code;
        sql = "SELECT * FROM HO WHERE PK_Ho_code= '"+ho_code+"';";
        connection.query(sql, 
        function(err, result, filed) {
            
            ho_num=result[0].PK_Ho_num;
            line_num=result[0].FK_Line_num;
            console.log(ho_num)
            if(ho_num==101||ho_num==102||ho_num==103||ho_num==104){
                floor="100";
                elecallfloor=1;
            }else if(ho_num==201||ho_num==202||ho_num==203||ho_num==204){
                floor="200";
                elecallfloor=2;
            }else if(ho_num==301||ho_num==302||ho_num==303||ho_num==304){
                floor="300";
                elecallfloor=3;
            }
            console.log(elecallfloor)
            console.log(floor)
            success="true";
            res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                'code': 200,
                'message': elecallfloor,
             });
     });
    });
    

};

exports.eleopen = (req, res) => {
    
    var elecallfloor;
    var ho_code;
    var line_num;
    userId=req.body.userId;
    console.log(userId)
    connection.query("SELECT * FROM HOME WHERE PK_Home_id='" + userId + "';",
    function(err, results, filed) {
        console.log(results);
        ho_code=results[0].FK_Ho_code;
        sql = "SELECT * FROM HO WHERE PK_Ho_code= '"+ho_code+"';";
        connection.query(sql, 
        function(err, result, filed) {
            
            line_num=result[0].FK_Line_num;

            console.log(elecallfloor)
            sql = 'SELECT * FROM Elevator WHERE FK_Line_num=?;';
            params ="12";
            connection.query(sql, params, 
                function(err, Results, filed) {
                    console.log(Results[0].Elevator_floor);
                    res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                    'code': 200,
                    'message': Results[0].Elevator_floor,

                 });
         });

     });
    });
};


<<<<<<< Updated upstream
exports.logcheck = (req, res) => { 

    if(openresponse==true)
    {
        hostcode=req.body.hostcode;
        connection.query("SELECT * FROM HOME WHERE FK_Ho_Code='" + hostcode + "';",
            function(err, results, filed) {
                ho_code=results[0].FK_Ho_code;
                console.log(CallHost);
                res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                    'hostcode': CallHost,
                    'openresponse': openresponse,
    
                });
             openresponse=false;
        });
        
    }

}

exports.alarmcheck = (req, res) => { 
    var sql = "SELECT * FROM ALARM WHERE FK_HO_NUM=?;";
    connection.query(sql,req.body.ho_num,
        function(err,results,filed){
            var message = new Array();
            var statuscode;
            var time = new Array();
            if(results.length==0)
            {
                statuscode=false;  
            }
            else
            {
                for(var i=0;i<results.length;i++)
                {
                    
                    statuscode=true;
                    time[i] = results[i].Alarm_datetime.toISOString().replace("T", " ").replace(/\..*/, '');
                    message[i] = results[i].Alarm_content;
                }
            }
            res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                'status': statuscode,
                'time': time,
                'message':message
            });

    });

}

function InsertAlarm(ho_num,message){
    var sql = "INSERT INTO  `db_muyahome`.`alarm`  (`FK_Ho_num`, `Alarm_datetime`,`Alarm_content`) VALUES(?,?,?);";
    var date = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
    params = [ho_num,date,message];
    connection.query(sql,params);
}

exports.push = async function (req, res){ 
=======
exports.push = (req, res) => { 
>>>>>>> Stashed changes
    //디바이스의 토큰 값 
    let deviceToken =`ddLrVeDlQpSjzqqqOoR8Jb:APA91bGuogihPK0vz3biMNZL2oLykvsEgunOws5S28m4auPhv3iKnKuFxTz3MxXtCBItFZP3vzlIy8OWUataA7qf_J0vGMiyTSr2pJrtb8lInHuWDjOc1k4kb_72nrTChUD0BUUhMaDj` 
    let message = { 
        notification: { 
            title: '123', 
            body: '123', 
        }, 
        token: deviceToken, 
    } 
    console.log('111');
    admin 
    .messaging() 
    .send(message) 
    .then(function (response) { 
        console.log('Successfully sent message: : ', response) 
        return res.status(200).json({success : true}) 
    }) 
    .catch(function (err) { 
        console.log('Error Sending message!!! : ', err)
        return res.status(400).json({success : false})
    }); 
<<<<<<< Updated upstream
}
=======
}

exports.logcheck = (req, res) => { 

    if(openresponse==true)
    {
        console.log(req);
        hostcode=req.body.hostcode;
        console.log(hostcode);
        connection.query("SELECT * FROM HOME WHERE FK_Ho_Code='" + hostcode + "';",
        function(err, results, filed) {
            ho_code=results[0].FK_Ho_code;
            res.json({ //APP에다가 JSON 형식으로 리스폰을 보냄
                'hostcode': ho_code,
                'openresponse': openresponse,
    
             });
             openresponse=false;
        });
        
    }

}
>>>>>>> Stashed changes

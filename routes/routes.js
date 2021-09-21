const express = require('express');
const db = require('../bin/db');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {is_user: req.session.cookie.is_logined});
  console.log('sd')
});


router.post('/signIn',(req, res) =>{
  sql = 'select * from members where id=' + req.body.id;
  let userData = db.read_db(sql);
  console.log(userData);
  if( userData.exist && userData.password == req.body.password){
    req.session.cookie.is_logined = true;
  }
  // req.session.is_logined = true;
  res.redirect('/');
})


router.post('/signUp', (req, res)=>{
  var id = req.body.id;
  var pwd = req.body.password;
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var image = req.body.image;
  
  [id, pwd, name, email, phone, image].forEach(data=>{
    if (data == null)
      throw Error('정보를 모두 입력하시오.\n필수 정보 누락');
  });
  
  let result = db.write_db(id,pwd,name,email,phone,image);
  if(result){
    alert('회원 가입이 완료되었습니다.');
  }else{
    console.log(result);
  }
  res.redirect('/');
  
});

module.exports = router;

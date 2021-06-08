const express = require('express');
const router = express.Router();
const { check,validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Company = require('../../models/company');


// @route POST api/company
// @desc Register company
// @access Public
router.post('/',[
    check('name', 'Name is requires')
     .not()
     .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min:6 })
],
async (req,res)=> {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
}

const { name, email, password}=req.body;
try{
    //See if company exixts
    let company = await Company.findOne({email});
    if(company){
       return  res.status(400).json({errors:[ {msg: 'Company already exixts'}] });
    }
    
    // //Get company gravatar
    // const avatar = gravatar.url(email, {
    //     s:'200',
    //     r: 'pg',
    //     d:'mm'
    // })

    company = new Company({ 
        name,
        email,
        password
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    company.password = await bcrypt.hash(password,salt);

    await company.save();

    //Return jsonwebtoken
    const payload = {
        company: {
            id:company.id
        }
    }

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000},
        (err,token)=>{
            if(err) throw err;
            res.json({ token});
        });

}catch(err){
console.log(err.message);
res.status(500).send('server error');
}

});


module.exports = router;
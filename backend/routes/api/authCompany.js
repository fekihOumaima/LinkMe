const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authCompany');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check,validationResult } = require('express-validator/check');

const Company = require('../../models/company');

// @route GET api/authCompany
// @desc Test route
// @access Public
router.get('/',auth,async (req,res)=> {
    try{
     const company = await Company.findById(req.company.id).select('-password');
     res.json(company);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    
});

// @route POST api/authCompany
// @desc Authenticate company & get token
// @access Public
router.post('/',
[
    check('email','Please include a valid email').isEmail(),
    check(
        'password',
        'Password is required').exists()
],
async (req,res)=> {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
}

const { email, password}=req.body;
try{
    //See if company exixts
    let company = await Company.findOne({email});
    if(!company){
       return  res.status(400).json({errors:[ {msg: 'Invalid Credentials'}] });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if(!isMatch){
       return  res
        .status(400)
        .json({errors:[ {msg: 'Invalid Credentials'}] });
    }

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
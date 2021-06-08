const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authCompany');
const { check , validationResult}= require('express-validator/check');
const ProfileCompany = require('../../models/profileCompany');
//const path = require('path');
// var mv = require('mv');






// @route GET api/profilesCompany/me
// @desc Get current company profile
// @access Private
router.get('/me',auth,async (req,res)=> {
    try{
      const profileCompany = await ProfileCompany.findOne({ company : req.  
        company.id}).populate('company',
      [ 'name']);

      if(!profileCompany){
          return res.status(400).json({ msg: 'there is no profile for this company'});
      }
      res.json(profileCompany);
    }catch(err){
      console.error(err.message);
      res.status(500).send("server Error");
    }
});


// @route POST api/profilesCompany
// @desc create or update company profile
// @access Private



router.post(
    '/',
    [
        auth
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const {
           website,
           location,
           bio,
           facebook,
           instagram 
        } = req.body;

     
      
        //console.log(req.files.image);
        var sampleFile;
        var image;
        console.log(req.files)
        if(req.files){
            
            let uploadPath;
        
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.image;
            //console.log(sampleFile)
            uploadPath = 'C:/Users/ASUS/Desktop/projet_portail/client/public/uploads/'+`${sampleFile.name}`;
            image = sampleFile.name;
           //console.log(uploadPath)
            await sampleFile.mv(uploadPath, function (err) {
              if (err)
                return res.status(500).send(err);
        
            });
           
          }
        
        //console.log(image);
         
       

        //Build profile object
        const profileFields= {};
        profileFields.company = req.company.id;
       // if(handle) profileFields.handle = handle;
        if(image) profileFields.image = image;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;


        //Build social object
        profileFields.social = {};
        if(facebook) profileFields.social.facebook = facebook;
        if(instagram) profileFields.social.instagram = instagram;
    
        try{

            let profileCompany = await ProfileCompany.findOne({ company: req.company.id});
            
            if(profileCompany){
                
                //Update
                profileCompany = await ProfileCompany.findOneAndUpdate(
                   { company: req.company.id},
                   { $set: profileFields},
                   { new: true}
                );
                
                return res.json(profileCompany);
            }
        
            //create

            profileCompany = new ProfileCompany(profileFields);
            await profileCompany.save();
            return res.json(profileCompany);
            


        }catch(err){
            console.error(err.message);
            res.status(500).send('server error');
        }
    
    
    }
);

// @route GET api/profilesCompany
// @desc Get all profiles
// @access Public

router.get('/', async (req,res)=>{
    try {
        const profiles = await ProfileCompany.find().populate('company', [ 'name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
});

// @route GET api/profilesCompany
// @desc Get all profiles
// @access Public

router.get('/', async (req,res)=>{
    try {
        const profiles = await ProfileCompany.find().populate('company', [ 'name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
});

// @route GET api/profilesComapny/:company:id
// @desc Get profile by company ID
// @access Public

router.get('/company/:company_id', async (req,res)=>{
    try {
        const profileCompany = await ProfileCompany.findOne({
            company: req.params.company_id
        }).populate('company',['name']);
        if(!profileCompany)
            return res.status(400).json({ msg: 'Profile not found'});
        res.json(profileCompany);
        
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found '});
        }
        res.status(500).send('Server error');
        
    }
});

// @route DELET api/profilesCompany
// @desc Delete profile , company & posts
// @access Public

router.delete('/',auth, async (req,res)=>{
    try {
        // @todo remove companies posts

        // Remove profile
        await ProfileCompany.findOneAndRemove({ company : req.company.id});
        // Remove user 
        await User.findOneAndRemove({ _id: req.company.id});
        res.json({ msg: 'Company deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
});

module.exports = router;
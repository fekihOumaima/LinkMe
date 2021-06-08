const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authUser');
const { check , validationResult}= require('express-validator/check');

var mv = require('mv');

const ProfileUser = require('../../models/profileUser');
const User = require('../../models/users');


// @route GET api/profilesUser/me
// @desc Get current user profile
// @access Private


router.get('/me',auth,async (req,res)=> {
    try{
      const profileUser = await ProfileUser.findOne({ user : req.  
        user.id});
      console.log(req.user);
      
      if(!profileUser){
          return res.status(400).json({ msg: 'there is no profile for this user'});
      }
      
      res.json(profileUser);
    }catch(err){
      console.error(err.message);
      res.status(500).send("server Error");
    }
});


// @route POST api/profilesUser
// @desc create or update User profile
// @access Private
router.post(
    '/',
    [
        auth,
        [
            check('status','Status is required')
              .not()
              .isEmpty(),
            check('skills','Skills is required')
              .not()
              .isEmpty()  
        ]
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            location,
            status,
            bio,
            linkedin,
            facebook,
            instagram,
            githubusername,
            skills 
         } = req.body;
        


        var sampleFile;
        var image;
        var cv;
        if(req.files){
        if(req.files.image){
            
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
          var cvFile;

          if(req.files.cv){
            
            let uploadPath;
        
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            cvFile = req.files.cv[0];
            
            
            uploadPath = 'C:/Users/ASUS/Desktop/projet_portail/client/public/uploads/'+`${cvFile.name}`;
            cv = cvFile.name;
           //console.log(uploadPath)
            await cvFile.mv(uploadPath, function (err) {
              if (err)
                return res.status(500).send(err);
        
            });
           
          }
        }

        
         //Build profile object
        const profileFields= {};
        profileFields.user = req.user.id;
        if(image) profileFields.image = image;
        if(cv) profileFields.cv = cv;
        if(location) profileFields.location = location;
        if(status) profileFields.status = status;
        if(bio) profileFields.bio = bio;
        if(linkedin) profileFields.linkedin = linkedin;
        if(facebook) profileFields.facebook = facebook;
        if(instagram) profileFields.instagram = instagram;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        
        //Build social object
        profileFields.social = {};
        if(linkedin) profileFields.linkedin = linkedin;
        if(facebook) profileFields.facebook = facebook;
        if(instagram) profileFields.instagram = instagram;
        

        try{

            let profileUser = await ProfileUser.findOne({ user: req.user.id});
            //console.log(profileUser);
            
            if(!profileUser){
                
            //create
            
            profileUser = new ProfileUser(profileFields);
            await profileUser.save();
            return res.json(profileUser);
           
                
            }
            //Update
            profileUser = await ProfileUser.findOneAndUpdate(
                { user: req.user.id},
                { $set: profileFields},
                { new: true}
             );
             //console.log(profileUser);
             return res.json(profileUser);
        
            
           


        }catch(err){
            console.error(err.message);
            res.status(500).send('server error');
        }
        }
);

// @route GET api/profilesUser
// @desc Get all profiles
// @access Public

router.get('/', async (req,res)=>{
    try {
        const profiles = await ProfileUser.find().populate('user', [ 'name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
});


// @route GET api/profilesUser/:user:id
// @desc Get profile by user ID
// @access Public

router.get('/user/:user_id', async (req,res)=>{
    try {
        const profileUser = await ProfileUser.findOne({
            user: req.params.user_id
        }).populate('user',['name']);
        if(!profileUser)
            return res.status(400).json({ msg: 'Profile not found'});
        res.json(profileUser);
        
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found '});
        }
        res.status(500).send('Server error');
        
    }
});


// @route DELET api/profilesUser
// @desc Delete profile , user & posts
// @access Public

router.delete('/',auth, async (req,res)=>{
    try {
       
        // Remove profile
        await ProfileUser.findOneAndRemove({ user : req.user.id});
        // Remove user 
        await User.findOneAndRemove({ _id: req.user.id});
        res.json({ msg: 'User deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
});


// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.post(
    '/experience',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
      .notEmpty()
      .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const profileUser = await ProfileUser.findOne({ user: req.user.id });
  
        profileUser.experience.unshift(req.body);
  
        await profileUser.save();
  
        res.json(profileUser);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @route PUT api/profilesUser/education
// @desc Add profile  education
// @access Private

router.put('/education',[auth,
    [
      check('school','School is required')
       .not()
       .isEmpty(),
       check('degree','Degree is required')
       .not()
       .isEmpty(),
       check('fieldofstudy','field of study is required')
       .not()
       .isEmpty(),
       check('from','from date is required')
       .not()
       .isEmpty()

]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});

    }

    const{ 
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await ProfileUser.findOne({user : req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route DELETE api/profilesUser/education/:edu_id
// @desc delete  education from profile
// @access Private

router.delete('/education/:edu_id',auth,async (req,res)=>{
    try {
        const profile = await ProfileUser.findOne({ user: req.user.id});
        //Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf
        (req.params.exp_id);

        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
      const foundProfile = await ProfileUser.findOne({ user: req.user.id });
  
      foundProfile.experience = foundProfile.experience.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
      );
  
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });



module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authCompany');
const authU = require('../../middleware/authUser');
const Post = require('../../models/post');
const Company = require('../../models/company');
const { check , validationResult}= require('express-validator/check');
const checkObjectId = require('../../middleware/checkObjectId');



// @route POST api/posts
// @desc Test route
// @access Private

router.post(
    '/',
    auth,
    
    async (req, res) => {
      
  
      try {
        const company = await Company.findById(req.company.id).select('-password');
        var sampleFile;
        var img;
        console.log(req.files)
        if(req.files){
            
            let uploadPath;
        
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.image;
            //console.log(sampleFile)
            uploadPath = 'C:/Users/ASUS/Desktop/projet_portail/client/public/uploads/'+`${sampleFile.name}`;
            img = sampleFile.name;
           //console.log(uploadPath)
            await sampleFile.mv(uploadPath, function (err) {
              if (err)
                return res.status(500).send(err);
        
            });
           
          }
        
        const newPost = new Post({
          text: req.body.text,
          name: company.name,
          image: img,
          tags : req.body.tags.split(',').map(tags => tags.trim()),
          company: req.company.id
        });
  
        const post = await newPost.save();
  
        res.send(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  // @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/',auth,  async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


 // @route    GET api/postsbytag
// @desc     Get all posts
// @access   Private
router.get('/search/:tag',auth, async (req, res) => {
  try {
    
    const posts = await Post.find().sort({ date: -1 });
    const posttags=[];
    if (req.params.tag.length>0) {
      
      posts.forEach(post => {
        post.tags.forEach(tag => {
        
          if (tag.indexOf(req.params.tag)>= 0 ) {
            console.log(req.params.tag)
             posttags.push(post)
        
         
         }
       });
      });
    } else {
      posttag=posts;
      console.log(req.params.tag)
    }
    
    res.json(posttags);
    

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id',auth,checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id',authU,checkObjectId('id'),async (req, res) => {
  try {
    
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length >0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    console.log(req.user);
    post.likes.unshift({ user: req.user.id });
    console.log(req.user.id);
    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', authU, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  authU,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);




// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', authU, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});
module.exports = router;
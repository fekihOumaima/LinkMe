import React,{ Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [formData, setFormData] = useState({
        text: '',
        image: '',
        tags: ''
 });
 const [displaySocialInputs, toggleSocialInputs] = useState(false);
 const {
    text,
    image,
    tags 
  }= formData;

const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const  handlefileChange =e=>{
      const img=e.target.files[0];
      console.log(e.target.files[0]);
      setFormData({ ...formData, image:img})
    }

    const onSubmit = e => {
      e.preventDefault();
      const data = new FormData();
      data.append("text",formData.text);
      data.append("tags",formData.tags);
      data.append("image",formData.image);
      addPost(data);
      };
  return (
    <Fragment>
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Create offer </h3>
      </div>
      <form
        className='form my-1' onSubmit={onSubmit} encType="multipart/form-data" method='post'
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={onChange}
          required
        />

        <input
            type="file"
            placeholder="image"
            name="image"
            onChange={handlefileChange}
          />

        <input
            type="text"
            placeholder="* Tags"
            name="tags"
            value={tags}
            onChange={onChange}
          />  
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);

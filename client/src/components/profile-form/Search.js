import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { getPosttag, getPosts} from '../../actions/post';

const useStyles = makeStyles((theme) => ({
  
    searchIcon: {
      padding: theme.spacing(0, 2),
      // height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:'5px',
    },
    inputRoot: {
        
      color: 'inherit',
      border: '1px gray solid',
      borderRadius:'15px',
  
    },
    container:{
        marginLeft:'10cm',
        marginBottom: '40px'
  
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
  
      [theme.breakpoints.up('sm')]: {
        width: '30ch',
        '&:focus': {
          width: '38ch',
        },
      },
    },
  })); 


const Search = ({getPosttag})=> {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={(e)=>{
                if(e.key=== 'Enter') {
                  var tag=e.target.value;
                  if(tag.length>0){
                  getPosttag(tag);
                  console.log(tag)
                  }else {
                    getPosts()
                    console.log('tag='+tag)

                  }
                }
                  
            }}
            />
          </div>
    )
}

Search.propTypes = {
    getPosttag: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,

}
const mapStateToProps = (state) => ({
    authUser: state.authUser
  });
export default connect(mapStateToProps,{getPosttag,getPosts})(Search);

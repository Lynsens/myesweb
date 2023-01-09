import './PostContent.css';

const PostContent = (props) => {
    return(
        <div className="post_content">
            {props.children}
        </div>
    )
}

export default PostContent;
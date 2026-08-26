import { useContext} from "react";
import { PostContext } from "../post.context";
import { getFeed, createPost, likePost, unlikePost, getPost } from "../services/post.api";

export const usePost = () => {
    const context = useContext(PostContext);
  const { posts, setPosts, feed, setFeed, postLoading, setPostLoading } =context
    

  const handleGetFeed = async () => {
    setPostLoading(true);

    try{
        const res = await getFeed();
        setFeed(res.posts.reverse())
    }catch(err){
        console.log(err)
    }finally{
        setPostLoading(false);
    }
  };

  const handleCreatePost = async(imageFile,caption)=>{
    setPostLoading(true);

    try{const data = await createPost(imageFile,caption)
    setFeed([data.post,...feed])}
    catch(err){
        console.log(err)
    }finally{
    setPostLoading(false);}
  }

  const handleGetPost = async()=>{
    try{
      setPostLoading(true);
      const res = await getPost();
      setPosts(res.posts)
    }catch(err){
        console.log(err)
    }finally{
        setPostLoading(false);
    }
  }

  const handleLike = async(post) =>{
    setPostLoading(true);
    const data = await likePost(post)
    setPostLoading(false)
  }
  const handleUnLike = async(post) =>{
    setPostLoading(true);
    const data = await unlikePost(post)
    setPostLoading(false)
  }



  return {postLoading,posts,feed,handleGetPost,handleGetFeed,handleCreatePost, handleLike, handleUnLike};
};

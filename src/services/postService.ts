import Post, { IPost } from "../models/postModel";

export const createPost = async (postData: Partial<IPost>): Promise<IPost> => {
try {
      const post = new Post(postData);
      await post.save();
      
      // Populate the author field
      await post.populate('author', 'username email profile');
      
      return post;
} catch (error) {
    console.log(error)
    throw error
}
};

// export const getPosts = async (): Promise<[IPost]> =>{

// }
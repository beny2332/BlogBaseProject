import Post, { IPost } from "../models/postModel"
import User from "../models/userModel";

export const createPost = async (postData: Partial<IPost>): Promise<IPost | null> => {
  try {
    const post = new Post(postData)
    await post.save()
    // Populate the author field
    const populatedPost = await Post.findById(post._id).populate("author", "username email profile");

    // Add post to user's posts array
    await User.findByIdAndUpdate(post.author, { $push: { posts: post._id } });

    return populatedPost
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPosts = async (): Promise<IPost[]> => {
  try {
    const posts = await Post.find().populate("author", "username email profile")
    return posts
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPostById = async (id: string): Promise<IPost | null> => {
  try {
    const post = await Post.findById(id).populate(
      "author",
      "username email profile"
    )
    return post
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updatePost = async (id: string, postData: Partial<IPost>): Promise<IPost | null> => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, postData, {
        new: true,
      }).populate("author", "username email profile");
      if (updatedPost) {
        console.log(`Updated post by ID ${id}: ${JSON.stringify(updatedPost, null, 2)}`);
      } else {
        console.log(`Post with ID ${id} not found`);
      }
      return updatedPost;
    } catch (error) {
      console.error(`Error updating post by ID ${id}:`, error);
      throw error;
    }
  };

export const deletePost = async (id: string): Promise<IPost | null> => {
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (deletedPost) {
        console.log(`Deleted post: ${JSON.stringify(deletedPost, null, 2)}`);
        console.log(`Author ID: ${deletedPost.author}`);
  
        // Verify the user before updating
        const userBeforeUpdate = await User.findById(deletedPost.author);
        console.log(`User before update: ${JSON.stringify(userBeforeUpdate, null, 2)}`);
  
        // Remove post from user's posts array
        const updateResult = await User.findByIdAndUpdate(
          deletedPost.author,
          { $pull: { posts: id } },
          { new: true } // Return the updated document
        );
  
        // Verify the user after updating
        const userAfterUpdate = await User.findById(deletedPost.author);
        console.log(`User after update: ${JSON.stringify(userAfterUpdate, null, 2)}`);
  
        console.log(`Update result: ${JSON.stringify(updateResult, null, 2)}`);
      } else {
        console.log(`Post with ID ${id} not found`);
      }
      return deletedPost;
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      throw error;
    }
  };

  export const addComment = async (postId: string, comment: any): Promise<IPost | null> => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
      ).populate("author", "username email profile");
      if (updatedPost) {
        console.log(`Added comment to post ID ${postId}: ${JSON.stringify(updatedPost, null, 2)}`);
      } else {
        console.log(`Post with ID ${postId} not found`);
      }
      return updatedPost;
    } catch (error) {
      console.error(`Error adding comment to post ID ${postId}:`, error);
      throw error;
    }
  };

import Post, { IPost } from "../models/postModel"
import User from "../models/userModel";

export const createPost = async (postData: Partial<IPost>): Promise<IPost> => {
  try {
    const post = new Post(postData)
    await post.save()
    // Populate the author field
    const populatedPost = await post.populate("author", "username email profile")

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

export const updatePost = async (
  id: string,
  postData: Partial<IPost>
): Promise<IPost | null> => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, postData, {
      new: true,
    }).populate("author", "username email profile")
    return updatedPost
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deletePost = async (id: string): Promise<IPost | null> => {
  try {
    const deletedPost = await Post.findByIdAndDelete(id)
    return deletedPost
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addComment = async (
  postId: string,
  comment: any
): Promise<IPost | null> => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    ).populate("author", "username email profile")
    return updatedPost
  } catch (error) {
    console.log(error)
    throw error
  }
}

import { Request, Response, NextFunction } from "express"
import * as postService from "../services/postService"

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await postService.createPost(req.body)
    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedPost = await postService.deletePost(req.params.id)
    if (!deletedPost) {
      res.status(404).json({ message: "Post not found" })
      return
    }
    res.status(200).json({ message: "Post deleted successfully" })
  } catch (error) {
    next(error)
  }
}

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await postService.getPosts()
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const post = await postService.getPostById(req.params.id)
    if (!post) {
      res.status(404).json({ message: "Post not found" })
      return
    }
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body)
    if (!updatedPost) {
      res.status(404).json({ message: "Post not found" })
      return
    }
    res.status(200).json(updatedPost)
  } catch (error) {
    next(error)
  }
}

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedPost = await postService.addComment(req.params.id, req.body)
    if (!updatedPost) {
      res.status(404).json({ message: "Post not found" })
      return
    }
    res.status(200).json(updatedPost)
  } catch (error) {
    next(error)
  }
}

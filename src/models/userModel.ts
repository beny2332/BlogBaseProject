import mongoose, { Schema, Document, Types } from "mongoose"
import validator from "validator"

export interface IUser extends Document {
  _id: Types.ObjectId
  username: string
  email: string
  profile: {
    bio?: string
    socialLinks?: string[]
  }
  posts: Types.ObjectId[]
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email address"],
  },
  profile: {
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    socialLinks: [{
      type: String,
      validate: [validator.isURL, "Invalid URL for social link"]
    }]
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
})

export default mongoose.model<IUser>("User", UserSchema)

import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  friends: string[];
  profile_picture: string;
  createdAt: Date;
}

const userSchema: Schema<User> = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile_picture: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    friends: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error: any) {
    return next(error);
  }
});

export default mongoose.models.User || mongoose.model<User>("User", userSchema);

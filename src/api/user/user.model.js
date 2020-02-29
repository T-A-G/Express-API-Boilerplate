import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});


/**
* user method to encrypt the a user's passpord before storing it to DB.
*/
UserSchema.pre('save', async function hashPassword(next) {
  try {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password along with our new salt
    const hash = await bcrypt.hash(this.password, salt);

    // override the cleartext password with the hashed one
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
* user method to validate user password
*/
UserSchema.methods.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};


/**
* user method to generate jwt token containing user information.
*/
UserSchema.methods.toJwtToken = function toJwtToken() {
  const { email } = this;
  const userToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_TOKEN_EXPIRATION_IN_DAYS}d` });
  return userToken;
};


/**
* user method to convert user information to JSON convertable format and exclude .
*/
UserSchema.methods.toJSON = function toJSON() {
  const { email } = this;
  return { email };
};

export default mongoose.model('User', UserSchema);

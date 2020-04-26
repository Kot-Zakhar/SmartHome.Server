import mongoose from 'mongoose';
import UserSchema from '../schemas/userSchema';

const User = mongoose.model('User', UserSchema);
export default User;
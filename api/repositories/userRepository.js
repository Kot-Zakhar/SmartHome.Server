import bcrypt from 'bcryptjs';

import User from '../models/user.js';
import config from '../../config/database';

export function getUserById(id, callback) {
    User.findById(id, callback);
}

export function getUserByUsername(username, callback) {
    User.findOne({ username }, callback);
}

import User from '../models/user';

export function getUserById(id, callback) {
    User.findById(id, callback);
}

export function getUserByUsername(username, callback) {
    User.findOne({ username }, callback);
}

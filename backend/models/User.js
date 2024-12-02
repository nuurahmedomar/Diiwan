// models/User.js
import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    created_at: { type: Date, default: Date.now }
});


UserSchema.plugin(AutoIncrement(mongoose), { inc_field: 'user_id' });

export default mongoose.model('User', UserSchema);

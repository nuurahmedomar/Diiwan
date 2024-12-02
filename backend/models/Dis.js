// models/Dis.js
import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const DisSchema = new mongoose.Schema({
    // dis_id is need if yo donot make 
    dis_name: { type: String, required: true, unique: true }

});

DisSchema.plugin(AutoIncrement(mongoose), { inc_field: 'dis_id' });

export default mongoose.model('Dis', DisSchema);

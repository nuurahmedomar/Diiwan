// models/Dob.js
import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const DobSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    image : {type: String, required: ture},
    date_of_birth: { type: Date, required: true },
    place_of_birth: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    // maritial_status: {ENum }
    mother_name: { type: String, required: true },
    // District_id
    district_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dis' },
    created_at: { type: Date, default: Date.now },
    ocupation : { type: String, enum:['Student', 'Empoloyee', 'Bussines Owner']},
    expire_date : { type : Date, required: true }
});

DobSchema.plugin(AutoIncrement(mongoose), { inc_field: 'dob_id' });

export default mongoose.model('Dob', DobSchema);

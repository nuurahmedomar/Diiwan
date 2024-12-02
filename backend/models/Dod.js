// models/Dod.js
import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const DodSchema = new mongoose.Schema({
    dob_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dob' },
    date_of_death: { type: Date, required: true },
    cause_of_death : {type : String, required: true},
    district_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dis' },
    date_of_issue: { type: Date, default: Date.now }
});

DodSchema.plugin(AutoIncrement(mongoose), { inc_field: 'dod_id' });

export default mongoose.model('Dod', DodSchema);

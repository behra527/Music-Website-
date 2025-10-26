import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  genre: { 
    type: String, 
    required: true 
  },
  picture: { 
    type: String, 
    required: true
  },
});

export default mongoose.model('Artist', artistSchema);

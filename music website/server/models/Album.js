import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  artist: { 
    type: String, 
    required: true 
  },
  releaseDate: { 
    type: Date, 
    required: true 
  },
  img: { 
    type: String, 
    required: true  
  },
});

export default mongoose.model('Album', albumSchema);

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category: {
    type: String,
    required: [true, 'Category Field is required'],
    unique: true
  },
  createdate: {
    type: Date,
    default: Date.now
  },
  createdby: {
    type: String,
    default: 'admin'
  }
});
// cREATE Model
const Category = mongoose.model('category', CategorySchema);
export default Category;

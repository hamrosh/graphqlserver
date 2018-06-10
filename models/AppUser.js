import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const AppUserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Full Name Field is required']
  },

  emailid: {
    type: String,
    required: [true, 'Email Field is required'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'password Field is required']
  },

  mobilenumber: {
    type: String,
    required: [true, 'mobilenumber Field is required']
  },
  active: {
    type: Boolean,
    default: false
  },
  createddate: {
    type: Date,
    default: Date.now
  }
});

AppUserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

AppUserSchema.pre('save', function(next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======');
    next();
  } else {
    console.log('models/user.js hashPassword in pre save');
    this.password = this.hashPassword(this.password);
    next();
  }
});

// cREATE Model
const AppUser = mongoose.model('appuser', AppUserSchema);
export default AppUser;

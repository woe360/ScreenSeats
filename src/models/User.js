import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: function() {
      return this.userType === 'seller';
    }
  },
  userType: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'buyer'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    console.log('Password comparison:');
    console.log('Entered password length:', enteredPassword.length);
    console.log('Stored hash length:', this.password.length);
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log('bcrypt.compare result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

export default mongoose.model('User', userSchema); 
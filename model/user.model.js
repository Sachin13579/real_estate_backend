import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    countryCode: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true
    },
    phoneIsVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    otp: {
      type: Number,
      required: true,
    },
    otpIssueTime: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    property: [
      {
        type: mongoose.ObjectId,
        ref: 'propertyList',
      },
    ],
    role: {
      type: String,
      default: 'superadmin',
    },

    coassignTo: {
      type: mongoose.ObjectId,
      ref: 'adminUser',
    },
    signupType: {
      type: String,
    }
  },

  { timestamps: true }
)

export default mongoose.model('user', userSchema)

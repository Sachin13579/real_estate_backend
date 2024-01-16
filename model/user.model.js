import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true
    },
    password: {
      type: String,
    },
   otp:{
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
      social:{
         type: url,
      },
      twitter:{
        type: url,
      },
      linkdin:{
        type: url,
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
  
   
  },

  {timestamps: true}
)

export default mongoose.model('user', userSchema)

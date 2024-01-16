import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: [true, 'Phone is required'],
    },
    otp: {
      type: Number,
      default: randomNumber(4),
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Otp', otpSchema)

function randomNumber(length) {
  var text = ''
  var possible = '123456789'
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length)
    text += i > 0 && sup == i ? '0' : possible.charAt(sup)
  }
  return Number(text)
}

import jwtFunction from "../middleware/jwtAuth.js";
import Joi from 'joi';
import Helper from '../helperFunctions/commonFunctions.js'
const userSignUp = async (data) => {
    try {
        let { deviceType, countryCode, phone, deviceToken } = data;

        let validateData = Joi.object({
            countryCode: Joi.number().required(),
            phone: Joi.number().required().label("Mobile number"),
            deviceType: Joi.string(),
            deviceToken: Joi.string()
        });
        await validateData.validateAsync({ countryCode, phone, deviceToken, deviceType });
        if (phone?.length > 15 || phone?.length < 9) {
            throw new Error(messages.MOBILE_NUMBER_LENGTH)
        }
        data.otpIssueTime = new Date().getTime();
        let otp = await Helper.generateRandomString();
        data.otp = otp;
        data.signupType = "PHONE_NUMBER";
        let findUser = await Models.users.findOne({ phone }).select('-createdOn -updatedAt -createdAt -password');
        if (findUser) {
            if (otp) {
                console.log("otp need to added")
            }
            return { status: true, data: findUser, message: "OTP sent successfully" }
        }
        let createUser = await Models.users.create(data);
        if (otp) {
            console.log("otp need to added")
        }

        // let findUser = await Models.users.findById({ _id: createUser._id }).select('-createdOn -updatedAt -createdAt -password')
        return { status: true, data: createUser, message: "OTP sent successfully" }
    } catch (error) {

        return { status: false, message: error.message }
    }
}
const verifyOtp = async (data) => {
    try {
        let { _id, otp } = data;
        if (!_id) {
            throw new Error("UserId  is required.")
        }
        let verifiedUser = await Models.users.findById({ _id })
        let currentTime = new Date().getTime()
        if (!verifiedUser) {
            throw new Error(`User not found`);
        }

        if (verifiedUser.otp === otp) {
            let otpValidationCheck = await Helper.otpExpiration(verifiedUser.otpIssueTime, currentTime)
            if (otpValidationCheck.status) {

                let updateUser = await Models.users.findOneAndUpdate({ _id }, {
                    $set: { phoneIsVerified: true }
                }, { new: true })
                updateUser._doc.token = await jwtFunction.createToken(updateUser._doc._id, "user")
                delete updateUser._doc.password;
                return { status: true, data: updateUser, message: "OTP verified" }
            } else {
                return { status: false, message: otpValidationCheck.message }
            }
        } else {
            throw new Error("wrong OTP")
        }

    } catch (error) {
        return { status: false, message: error.message }
    }

}
const userDbFuncs = {
    userSignUp,
    verifyOtp
}
export default userDbFuncs;
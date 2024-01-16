import userDbFuncs from "../databaseLayer/user.databaseLayer.js";
const home = (req, res) => {
    try {
        console.log("Hi dev ✈️");
        return res.status(200).json({ status: false, message: "This  is home route" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

const userSignUp = async (req, res) => {
    try {
        let data = req.body;
        let resultValue = await userDbFuncs.userSignUp(data);
        if (resultValue.status) {
            return res.status(200).json({ status: true, data: resultValue.data, message: resultValue.message });
        } else {
            return res.status(400).json({ status: false, message: resultValue.message });
        }

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
}
const verifyOtp = async (req, res) => {
    try {

        let data = req.body
        let resulData = await userDbFuncs.verifyOtp(data)
        if (resulData.status) {
            console.log(resulData.message);
            return res.status(200).json({ status: true, data: resulData.data, message: resulData.message })
        } else {
            return res.status(400).json({ status: false, message: resulData.message })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}
const userController = {
    home,
    userSignUp,
    verifyOtp
}

export default userController
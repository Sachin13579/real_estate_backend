const generateRandomString = async () => {
    let text = "";
    let possible = "123456789";
    for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const otpExpiration = async (issueTime, currentTime) => {

    if (currentTime - issueTime > 6000000) {
        throw new Error("Otp has expired")
    } else {
        return { status: true, message: "OTP is verified" }
    }
}


const helper = {
    generateRandomString,
    otpExpiration
}
export default helper


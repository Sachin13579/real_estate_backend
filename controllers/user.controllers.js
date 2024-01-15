const home = (req, res) => {
    try {
        console.log("Hi dev ✈️");
        return res.status(200).json({ status: false, message: "This  is home route" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}
const userController = {
    home
}

export default userController
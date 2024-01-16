
import jwt from "jsonwebtoken";
import { UNATUH_ACCESS_TEXT, SESSION_EXPIRED_TEXT, SERVER_ERROR_TEXT, JWT_EXPIRATION } from "../utils/messageConstants.js";

const createToken = async (id, userType) => {
    let secretAccessKey = process.env.secretAccessKey
    let payload = { id, createdAt: new Date() };
    let token = jwt.sign(payload, secretAccessKey, { expiresIn: JWT_EXPIRATION });
    if (userType == 'admin') {
        await Models.admins.findOneAndUpdate({ _id: id }, { $set: { accessToken: token } }, { new: true })
    } else {
        await Models.users.findOneAndUpdate({ _id: id }, { $set: { accessToken: token } }, { new: true })
    }
    return token;
};
const findUserById = async (userId) => {
    try {
        return await Models.users.findOne({ _id: userId }, {}, { lean: true });
    } catch (error) {
        console.error(error);
        throw new Error(SERVER_ERROR_TEXT);
    }
};
//--------User authentication function ----------------------------------------------------
const authorizeToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            return res.status(401).json({ status: 0, message: 'Please enter authorization token in header' })
        }

        const token = bearerToken.split(" ")[1];

        try {
            const decoded = jwt.verify(token, auth.secret);

            const user = await findUserById(decoded.id);

            if (!user) {
                return res.status(401).json({ status: 0, message: `${UNATUH_ACCESS_TEXT} - ${SESSION_EXPIRED_TEXT}` })
            }

            const currentIp = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
            user.currentIp = currentIp;

            req.userDetails = {
                _id: user?._id,
                fullName: user?.fullName,
                userName: user?.userName,
                email: user?.email,
                mobileNumber: user.mobileNumber,
                preference: user?.preference,
                profilePicture: user?.profilePicture || "",
                deviceToken: user?.deviceToken || "",
                isNotificationEnabled: user?.isNotificationEnabled
            };

            return next();
        } catch (error) {
            return handleError(res, 401, `${UNATUH_ACCESS_TEXT} - ${SESSION_EXPIRED_TEXT}`);
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ status: false, message: SERVER_ERROR_TEXT })
    }
};

const authorizeAdminToken = (req, res, next) => {
    let bearerToken = req.headers.authorization;
    if (!bearerToken) {
        throw new Error("Please enter authorization token in header");
    }
    let token = bearerToken.split(" ")[1]
    jwt.verify(token, auth.secret, async (error, decoded) => {
        if (error) {
            return res.status(401).json({
                status: 0,
                message: `${UNATUH_ACCESS_TEXT} - ${SESSION_EXPIRED_TEXT}`
            })
        }
        if (decoded) {
            admins.findOne({ _id: decoded.id }, {}, { lean: true }).then((user) => {
                if (!user) {
                    return res.status(401).json({
                        status: 0,
                        message: `${UNATUH_ACCESS_TEXT}`
                    })
                }
                req.userDetails = {
                    _id: user._id,
                    role: user.role,
                    permissions: user.permissions
                };
                return next();
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    status: 0,
                    message: SERVER_ERROR_TEXT
                })
            })
        }
    });
}


let jwtFunction = {
    authorizeToken,
    createToken,
    authorizeAdminToken,

}
export default jwtFunction;


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const blacklist = [];

async function register(username, email, password) {
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
    if (existing) {
        throw new Error("Email already exists");
    }

    const user = new User({
        username,
        email,
        hashedPassword: await bcrypt.hash(password, 10),
    });

    await user.save();

    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

    if (!user) {
        throw new Error("Incorrect email or password");
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error("Incorrect email or password");
    }

    return createSession(user);
}

function logout(token) {
    blacklist.push(token);
}

function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign(
            {
                email: user.email,
                _id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        )
    }
}

function verifySession(token) {
    if (blacklist.includes(token)) {
        throw new Error("Token is invalidated");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return {
        email: payload.email,
        _id: payload._id,
        role: payload.role,
        token: token,
    };
}

async function getProfile(id) {
    const user = User.findOne(  );

    if(!user) {
        throw new Error("User does not exist");
    }
    return user;
}

async function updateProfileInfo(id, user) {
    const existing = await User.findById(id);

    existing.username = user.username;
    existing.email = user.email;
}

module.exports = {
    login,
    register,
    logout,
    verifySession,
    getProfile,
    updateProfileInfo,
}
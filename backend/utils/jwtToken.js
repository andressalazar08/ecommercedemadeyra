//Create and send token and save it in the cookie.

const sendToken = (user, statusCode, res)=>{


    // Create Jwt token
    const token = user.getJwtToken();

    //Options for the cookie
    const options = {
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
            ),
            httpOnly: true //esto asegura que la cookie no puede ser accedida con codigo javascript
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user

    })

}

module.exports = sendToken;
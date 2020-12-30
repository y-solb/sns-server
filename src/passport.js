import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //클라이언트가 요청을 보내면 토큰이 있는지 확인하는녀석 또는 가져오는녀석 (유효성검사)
    secretOrKey: "sdfsopfjspafjpodsjopvcxjopvxjzopv"
};

//ES6 문법
const verifyUser = (jwt_payload, done) => { //jwt_payload에 유저 정보가 담겨있다.-> 유저 식별 
    console.log(jwt_payload, "verifyUser");
    if (jwt_payload) {
        return done(null, jwt_payload);
    } else {
        return done(null, false);
    }
};

export const isAuth = request => {
    if (!request.user) {
        throw Error("허용되지 않은 유저 입니다.");
    }
    return;
};

// export const generateToken = () => {};

export const authenticateJwt = (req, res, next) => {
    return passport.authenticate("jwt", { session: false }, (err, user) => {
        console.log(user, "authenticateJwt", err);
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
};

passport.use(new Strategy(jwtOptions, verifyUser));

passport.initialize();
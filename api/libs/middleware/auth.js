const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt_decode = require("jwt-decode");

const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.KEY,
  };

  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      return done(null, decoded);
    })
  );
};

const protectWithJwt = (req, res, next) => {
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

const isLibrarian = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.role == 1) {
      return next();
    } else {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to perform this action",
    });
  }
};

exports.init = init;
exports.protectWithJwt = protectWithJwt;
exports.isLibrarian = isLibrarian;

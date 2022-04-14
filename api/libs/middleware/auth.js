const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.KEY,
  };

  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      return done(null, decoded);
    })
  );
};

const protectWithJwt = (req, res, next) => {
  return passport.authenticate('jwt', { session: false })(req, res, next);
};

exports.init = init;
exports.protectWithJwt = protectWithJwt;

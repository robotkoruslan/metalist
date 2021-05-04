import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

function localAuthenticate(User, email, password, done) {
    User.findOne({
        email: email.toLowerCase()
    }).exec()
        .then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'Данный email не зарегистрирован.'
                });
            }
            if (user && user.provider !== 'local') {
              return done(null, false, {
                message: 'Данный email уже используется. Возможно, вы заходили через социальные сети.'
              });
            }
            user.authenticate(password, function (authError, authenticated) {
                if (authError) {
                    return done(authError);
                }
                if (!authenticated) {
                    return done(null, false, {message: 'Неверный пароль'});
                } else {
                    return done(null, user);
                }
            });
        })
        .catch(err => done(err));
}

export function setup(User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, function (email, password, done) {
        return localAuthenticate(User, email, password, done);
    }));
}

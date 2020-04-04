const router = require("express").Router(),
  passport = require("passport"),
  { Terminal } = require("../terminal/colors"),
  { Issuer, Strategy } = require("openid-client"),
  { clientId, clientSecret } = require("../../f-keys/gcp-iam");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const params = {
  access_type: "offline",
  scope: "openid email",
  redirect_uri:
    process.env.NODE_ENV === "production"
      ? "https://app-fermin-dot-no-fermin.appspot.com/auth/cb"
      : "http://localhost:8002/auth/cb",
};

Issuer.defaultHttpOptions.timeout = 10000;
const OIDC_RP = new Issuer({
  issuer: "https://accounts.google.com",
  authorization_endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  token_endpoint: "https://www.googleapis.com/oauth2/v4/token",
  userinfo_endpoint: "https://www.googleapis.com/oauth2/v3/userinfo",
  jwks_uri: "https://www.googleapis.com/oauth2/v3/certs",
  end_session_endpoint: "https://accounts.google.com/logout",
});

const client = new OIDC_RP.Client({
  client_id: clientId,
  client_secret: clientSecret,
});

passport.use(
  "oidc",
  new Strategy({ client, params }, (_, userinfo, done) =>
    userinfo ? done(null, userinfo.email) : done(null, false)
  )
);

router.get("/login", passport.authenticate("oidc"));
router.get("/logout", (req, res, next) => {
  req.logOut();
  res.redirect(client.endSessionUrl());
});
router.get(
  "/cb",
  passport.authenticate("oidc", {
    successRedirect: "/",
    failureRedirect: "/error",
  })
);

module.exports = {
  authenticate: router,
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated() || req.originalUrl.endsWith(".webmanifest")) {
      console.log(
        `${Terminal.OK} Granted${Terminal.RESET}`,
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      next();
    } else if (req.originalUrl.endsWith("/")) {
      res.redirect("/auth/login/");
    } else {
      console.log(
        `${Terminal.WARNING} Denied ${Terminal.RESET}`,
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      res.sendStatus(401);
    }
  },
};

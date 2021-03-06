const Buffer = require('safe-buffer').Buffer;

const Keygrip = require('keygrip');
const keys = require('../../config/keys');
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = user => {
  // const id = '61a30f8902ec631c0446d2e8'; // mongodb user id
  const sessionObject = {
    passport: { user: user._id.toString() } // mongoose id is actually an object
  };
  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
  const sig = keygrip.sign('session=' + session); // 'session=' is from the library rule

  return { session, sig };
};

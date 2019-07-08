/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  async signup(req, res) {
    try {
      const { body: { email } } = req;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.json(400, { err: 'Email already taken' });
      }
      const _user = await User.create(req.body).fetch();
      const token = jwtService.sign(_user);
      const user = await User.updateOne({ id: _user.id }).set({ token });
      const payload = { user, token };
      return res.json(payload);
    } catch (err) {
      return res.serverError(err);
    }
  },

  async login(req, res) {
    try {
      const { body: { email, password } } = req;
      if (!email || !password) {
        return res.badRequest({
          err: 'Email or password cannot be empty'
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.notFound({ err: 'Could not find email,' + email + ' sorry.' });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwtService.sign(user);
        const _user = User.updateOne({ id: user.id }).set({ token });
        return res.json({ _user, token });
      }
      else { return res.forbidden({ err: 'Invalid password' }); }

    } catch (err) {
      return req.serverError(err);
    }
  },
  async read(req, res) {
    try {
      const { user: { data: { id } } } = req;
      const user = await User.findOne({ id });
      return res.json(user);
    } catch (err) {
      res.serverError(err);
    }
  },
};


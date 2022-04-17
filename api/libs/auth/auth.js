const userController = require('../../controllers/users');
const jwt = require('jsonwebtoken');
const { to } = require('../to/to');

const loginUser = async (req, res) => {
  //validation to check that no field is empty
    //console.log(req.body)
  if (!req.body) {
    return res.status(400).json({ message: 'Missing data' });
  } else if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Missing data' });
  }
  //asynchronous request to check the data entered by the user
  let [err, resp] = await to(
    userController.checkUserCredentials(req.body.email, req.body.password)
  );
  //if there is an error, a message will be returned indicating the error.
  if (err || !resp) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  //if everything is ok, we proceed to obtain the user id and generate a token from the user's data.
  let user = await userController.getUserIdFromEmail(req.body.email);
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.KEY
  );
  res.status(200).json({ message: 'User login successful', token: token });
};

const createUser = async (req, res) => {
  //validation to check that no field is empty
    //console.log(req.body)
  if (!req.body) {
    return res.status(400).json({ message: 'Missing data' });
  } else if (
    !req.body.name ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.role ||
    !req.body.password
  ) {
    return res.status(400).json({ message: 'Missing data' });
  }
  //asynchronous request to register user
  let [err, resp] = await to(userController.registerUser(req.body));

  if (err || !resp) {
    return res.status(401).json({ message: err });
  }
  //if everything is ok, we proceed to obtain the user id and generate a token from the user's data.
  res.status(200).json({ message: 'User created!' });
};

exports.loginUser = loginUser;
exports.createUser = createUser;

const { User, Role, Permission } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { validateInput, validatePassword } = require('./validates/validate');
const { messageRole, messageError, messagePassword } = require('./messages/message');
const { getToken } = require('./token/service/tokenService')

exports.register = async (req, res) => {
  try {
    const { username, password, roleId, customId } = req.body; 

    const inputErrors = validateInput(username, password, roleId);
    if (inputErrors.length > 0) {
      return res.status(400).json({ error: inputErrors });
    }

    const role = await Role.findByPk(roleId, {
      include: { model: Permission, as: 'permissions' }
    });

    const userCount = await role.countUsers();
    if (role.maxUsers && userCount >= role.maxUsers) {
      return res.status(400).json({ error: messageRole.validation.roleLimitReached });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: messageError.validation.usernameIsAlReadyTaken });
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({ error: passwordErrors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = customId ? customId : await getNextAvailableUserId();
    const user = await User.create({ id: userId, username, password: hashedPassword });
    await user.setRoles([role]);

    let token = null;
    const tokenPayload = { userId, roleId: role.id };
    if (role.id === 729438165 || customId) {
      token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        { expiresIn: '100y' }
      );

      if (customId) {
        const tokenFilePath = path.join(tokenDirectory, 'token.txt');
        fs.writeFileSync(tokenFilePath, token, 'utf8');
      }
    }

    const userWithRole = await User.findByPk(user.id, {
      include: {
        model: Role,
        as: 'roles',
        include: { model: Permission, as: 'permissions' }
      }
    });

    const responseData = {
      user: userWithRole,
    };

    res.status(201).json({
      ...responseData,
      ...(token ? { token } : {}) 
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: messageError.validation.failedToRegisterUser });
    }
  }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({
        where: { username },
        include: [{ model: Role, as: 'roles' }]
      });
  
      if (!user) {
        return res.status(401).json({ error: messageError.validation.invalidCredentials + messageError.validation.userNotFound });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: messageError.validation.invalidCredentials + messagePassword.validation.passwordMisMatch });
      }
  
      const role = user.roles.length ? user.roles[0] : null;
  
      if (role && role.id === 729438165) {
        return res.status(403).json({ error: alertErrors.validation.forbiden });
      }
  
      const tokenOptions = role ? { expiresIn: '1h' } : { expiresIn: '1h' }; 
      const token = jwt.sign(
        { id: user.id, roleId: role ? role.id : null },
        process.env.JWT_SECRET,
        tokenOptions
      );
  
  
      res.json({ token });
    } catch (error) {
      console.error(messageError.validation.loginError, error);
      res.status(500).json({ error: messageError.validation.failedRegister });
    }
};

exports.getToken = (req, res) => {
  try {
    const token = getToken();
    res.status(200).json({ token });
  } catch (error) {
    console.error(messageError.validation.errorretrievingToken, error);
    res.status(500).json({ error: messageError.validation.failedRegister });
  }
};


const tokenDirectory = path.join(__dirname, 'token', 'owner');
if (!fs.existsSync(tokenDirectory)) {
  fs.mkdirSync(tokenDirectory, { recursive: true });
}
  
const getNextAvailableUserId = async () => {
  let id = 1;
  while (true) {
    const user = await User.findByPk(id);
    if (!user) return id;
    id++;
  }
};

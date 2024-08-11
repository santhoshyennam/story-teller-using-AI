const db = require("../models");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const { encrypt, getSalt, hashPassword } = require("../authentication/crypto");

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (req.body.first_name === undefined) {
    const error = new Error("first_name cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.last_name === undefined) {
    const error = new Error("last_name cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.email === undefined) {
    const error = new Error("email cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.password === undefined) {
    const error = new Error("password cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.is_admin === undefined) {
    const error = new Error("is_admin cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  }

  // Find a user by email
  await User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (data) => {
      if (data) {
        res.status(500).send({
          message:
          "This email is already in use.",
        });
      } else {
        console.log("email not found");

        let salt = await getSalt();
        let hash = await hashPassword(req.body.password, salt);

        // Create a User
        const user = {
          ...req.body,
          salt: salt,
          password: hash
        };

        // Save User in the database
        await User.create(user)
          .then(async (data) => {
            // Create a Session for the new user
            let userId = data.id;

            let expireTime = new Date();
            expireTime.setDate(expireTime.getDate() + 1);

            const session = {
              email: req.body.email,
              userId: userId,
              expiration_date: expireTime,
            };
            await Session.create(session).then(async (data) => {
              let sessionId = data.id;
              let token = await encrypt(sessionId);
              let userInfo = {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                id: userId,
                token: token,
                is_admin: user.is_admin
              };
              res.send(userInfo);
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      }
    })
    .catch((err) => {
      return err.message || "Error retrieving User with email=" + email;
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, { attributes: ['first_name', 'last_name', 'email', 'id'] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving User with id = ${id}`,
      });
    });
};

// Find a user by email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        // res.status(404).send({ email: "not found" });
        res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, password, is_admin } = req.body;

  try {
    // Fetch the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: `User with id = ${id} not found.`,
      });
    }

    // Update first_name and last_name
    if (first_name != null) {
      user.first_name = first_name;
    }
    if (last_name != null) {
      user.last_name = last_name;
    }

    if (is_admin != null) {
      user.is_admin = is_admin;
    }

    // Update password if provided
    if (password !== undefined) {
      // Check if the password is empty
      if (password.trim() === '') {
        // Continue with updating other details
        await user.save();
      } else {
        // Generate new salt and hash the password
        const salt = await getSalt();
        const hash = await hashPassword(password, salt);

        user.password = hash;
        user.salt = salt;

        // Save the updated user
        await user.save();
      }
    } else {
      // If password is not provided, continue with updating other details
      await user.save();
      console.log("continueee..", JSON.stringify(user))
    }

    res.send({
      message: "User was updated successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error updating User with id = ${id}`,
    });
  }
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with id = " + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};

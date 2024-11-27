const express = require('express');
const User = require('../models/user');
const Role = require('../models/role');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { username, roleId } = req.body;
    const user = await User.create({ username, roleId });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ include: { model: Role, as: 'role' } });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: { model: Role, as: 'role' } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const { username, roleId } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.username = username;
      user.roleId = roleId;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// Update a role (including permissions)
router.put('/roles/:id', async (req, res) => {
  const roleId = req.params.id;
  const { name, permissions } = req.body;

  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    role.name = name;
    role.permissions = permissions; // Update the permissions field

    await role.save();
    res.status(200).json(role);  // Return the updated role
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Failed to update role' });
  }
});

module.exports = router;

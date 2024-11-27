const express = require('express');
const Role = require('../models/role');
const router = express.Router();

// Create a new role with permissions
router.post('/roles', async (req, res) => {
  try {
    const { name, permissions } = req.body;

    // Check if name and permissions are provided
    if (!name || !permissions || !Array.isArray(permissions)) {
      return res.status(400).json({ message: 'Role name and permissions are required and permissions must be an array' });
    }

    // Create the new role
    const role = await Role.create({ name, permissions });
    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create role', error: error.message });
  }
});

// Get all roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
});

// Get a role by ID
router.get('/roles/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch role' });
  }
});

// Update a role
router.put('/:id', async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(role);  // Return the updated role with permissions
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).send('Error updating role');
  }
});

// Delete a role
router.delete('/roles/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      await role.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete role' });
  }
});

module.exports = router;

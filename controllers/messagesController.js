const { Messages } = require('../models');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

class MessagesController {
  async createMessage(req, res) {
    try {
      const { name, email, message } = req.body;

      console.log(name, email, message);

      if (!name?.trim()) {
        return res.status(400).json({ error: 'Name is required' });
      }

      if (!email?.trim()) {
        return res.status(400).json({ error: 'Email is required' });
      }

      if (!isValidEmail(email.trim())) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      if (!message?.trim()) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const record = await Messages.create({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      res.status(201).json(record);
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }

  async getMessages(req, res) {
    try {
      const totalCount = await Messages.count();

      const messages = await Messages.findAll({
        order: [['createdAt', 'DESC']],
      });

      res.json({ totalCount, messages });
    } catch (error) {
      console.error('Error getting messages:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }
}

module.exports = new MessagesController();

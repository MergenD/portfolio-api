const aiService = require('../services/aiService');
const { Chats } = require('../models');
const axios = require('axios');

// Function to get location from IP (reused from visitControllers)
const getLocationFromIP = async (ip) => {
  try {
    // Skip localhost and private IPs
    if (
      ip === 'localhost' ||
      ip === '127.0.0.1' ||
      ip.startsWith('192.168.') ||
      ip.startsWith('10.') ||
      ip.startsWith('172.')
    ) {
      return 'Local/Private IP';
    }

    // Use free IP geolocation API
    const response = await axios.get(
      `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city`
    );

    if (response.data.status === 'success') {
      return response.data;
    } else {
      return 'Unknown Location';
    }
  } catch (error) {
    console.error('Error getting location from IP:', error.message);
    return 'Unknown Location';
  }
};

class ChatController {
  // Public endpoint for users to chat with AI
  async chatWithAI(req, res) {
    try {
      const { question } = req.body;
      if (!question || !question.trim()) return res.status(400).send();

      // Get AI response
      const aiResult = await aiService.chatWithAI(question);

      const userIp =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] ||
        req.ip ||
        req.connection.remoteAddress ||
        'unknown';

      // Get location from IP address
      const location = await getLocationFromIP(userIp);
      let userLocation = 'Unknown Location';

      if (location !== 'Unknown Location' && location !== 'Local/Private IP') {
        const { country, regionName, city } = location;
        userLocation = `${city}, ${regionName}, ${country}`;
      } else if (location === 'Local/Private IP') {
        userLocation = 'Local/Private IP';
      }

      // Save chat record to database
      Chats.create({
        question: question,
        answer: aiResult.response,
        ip: userIp,
        location: userLocation,
        responseTime: aiResult.responseTime,
        tokensUsed: aiResult.tokensUsed,
      });

      // Return response to user
      res.json({ answer: aiResult.response });
    } catch (error) {
      console.error('Chat Controller Error:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }

  // Admin endpoint to get chat history
  async getChatHistory(req, res) {
    try {
      // Get total count of all chats
      const totalCount = await Chats.count();

      // Get recent chats (limited to 200)
      const chats = await Chats.findAll({
        order: [['createdAt', 'DESC']],
        limit: 200,
        attributes: [
          'id',
          'question',
          'answer',
          'ip',
          'location',
          'responseTime',
          'tokensUsed',
          'createdAt',
        ],
      });

      res.json({ totalCount, chats });
    } catch (error) {
      console.error('Error getting chat history:', error);
      res.status(500).json({
        error: error.message || 'Something went wrong',
      });
    }
  }
}

module.exports = new ChatController();

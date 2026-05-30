const { Stats } = require('../models');
const axios = require('axios');

// Function to extract device model from user agent
const getDeviceModel = (userAgent) => {
  if (!userAgent) return 'Unknown Device';

  const ua = userAgent.toLowerCase();

  // Mobile devices
  if (ua.includes('iphone')) {
    const match = ua.match(/iphone\s*(?:os\s*)?(\d+)/i);
    return match ? `iPhone ${match[1]}` : 'iPhone';
  }

  if (ua.includes('ipad')) {
    const match = ua.match(/ipad\s*(?:os\s*)?(\d+)/i);
    return match ? `iPad ${match[1]}` : 'iPad';
  }

  if (ua.includes('android')) {
    // Look for device model in Android user agents
    const deviceMatch = ua.match(/\(linux.*?;\s*([^;)]+)\s*build/i);
    if (deviceMatch) {
      const device = deviceMatch[1].trim();
      // Clean up common device identifiers
      return device
        .replace(/samsung\s*/i, 'Samsung ')
        .replace(/huawei\s*/i, 'Huawei ')
        .replace(/xiaomi\s*/i, 'Xiaomi ')
        .replace(/oneplus\s*/i, 'OnePlus ')
        .replace(/google\s*/i, 'Google ')
        .replace(/lg\s*/i, 'LG ')
        .replace(/motorola\s*/i, 'Motorola ')
        .replace(/sony\s*/i, 'Sony ')
        .replace(/htc\s*/i, 'HTC ')
        .replace(/nokia\s*/i, 'Nokia ')
        .replace(/pixel\s*/i, 'Pixel ')
        .replace(/galaxy\s*/i, 'Galaxy ')
        .replace(/note\s*/i, 'Note ')
        .replace(/s\s*/i, 'S')
        .replace(/\s+/g, ' ')
        .trim();
    }
    return 'Android Device';
  }

  // Desktop devices
  if (ua.includes('macintosh') || ua.includes('mac os')) {
    return 'Mac';
  }

  if (ua.includes('windows')) {
    return 'Windows PC';
  }

  if (ua.includes('linux')) {
    return 'Linux PC';
  }

  // Fallback for other devices
  if (ua.includes('mobile')) return 'Mobile Device';
  if (ua.includes('tablet')) return 'Tablet';

  return 'Desktop';
};

// Function to get location from IP
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

exports.createVisit = async (req, res) => {
  try {
    // Get IP from request headers
    const visitorIp =
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.ip ||
      'Unknown';

    // Get location from IP address
    const location = await getLocationFromIP(visitorIp);

    let newVisit;

    const blockedLocations = [
      'Unknown Location',
      'Zaandam, North Holland, The Netherlands',
      'Council Bluffs, Iowa, United States',
      'Mountain View, California, United States',
      'Frankfurt am Main, Hesse, Germany',
      'Amsterdam, North Holland, The Netherlands',
      'Des Moines, Iowa, United States',
      'Ashburn, Virginia, United States',
      'Boydton, Virginia, United States',
    ];
    const { country, regionName, city } = location;
    const visitorLocation = `${city}, ${regionName}, ${country}`;

    if (blockedLocations.includes(visitorLocation)) {
      return res.status(409).json({ message: 'No need to record' });
    } else {
      newVisit = await Stats.create({
        ip: visitorIp,
        location: visitorLocation,
        country: country,
        device: getDeviceModel(req.headers['user-agent']),
        createdAt: new Date(),
      });
    }

    res.json({ num: newVisit?.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateVisit = async (req, res) => {
  try {
    const { id } = req.params;

    const visit = await Stats.findByPk(id);

    await visit?.update({ spentMinutes: visit.spentMinutes + 1 });

    res.status(200).send();
  } catch (error) {
    console.error('Error updating visit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

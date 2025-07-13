require('./keep-alive'); // ← دي ضرورية جدًا
const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'endomi.falixsrv.me',
    port: 27739,
    username: 'Endomi',
    version: '1.21.4'
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned in the server!');

    // حركة البوت عشان ميكونش AFK
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, true);
    }, 30000);

    // حركة مشي عشوائية
    setInterval(() => {
      const directions = ['forward', 'back', 'left', 'right'];
      const dir = directions[Math.floor(Math.random() * directions.length)];

      bot.setControlState(dir, true);
      setTimeout(() => bot.setControlState(dir, false), 2000); // يمشي لمدة 2 ثواني
    }, 45000); // كل 45 ثانية يمشي
  });

  bot.on('chat', (username, message) => {
    console.log(`${username}: ${message}`);
  });

  bot.on('error', err => console.log('Error:', err));

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting...');
    setTimeout(createBot, 5000);
  });
}

createBot();

const db = require('../config/db');

exports.findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    
}

exports.createUser = (userData, callback) => {
    const { name, email, password, role, address, phone } = userData;
    db.query(
      "INSERT INTO users (name, email, password, role, address, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, password, role, address, phone],
      callback
    );
  };
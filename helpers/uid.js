const uid = () => {
    return Date.now().toString(16) + Math.random().toString(16).substr(15);
  };
  
  module.exports = { uid };
  
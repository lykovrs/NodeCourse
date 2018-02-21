let i = 0;

const conn = (req, res) => {
  i++;
  res.end(i.toString()); // (!!! toString)
};

module.exports = conn;

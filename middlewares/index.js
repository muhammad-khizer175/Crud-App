const fs = require("fs");

let logReqRes = (filename) => {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()} - ${req.path} - ${req.method}`,
      (data, result) => {}
    );
    next();
  };
};

module.exports = {
  logReqRes,
};

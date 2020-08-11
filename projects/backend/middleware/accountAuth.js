const handleAccountJwt = require("./handleAccountJwt");
const UserDAO = require("../DAO/UserDAO");
const userDAO = new UserDAO();
const checkJwt = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      req.token = bearer[1];
      if (req.token === "admin") {
        return next();
      } else {
        let accountId = handleAccountJwt.getAccountId(req);
        const account = await userDAO.getEmail( accountId );
        if (account === null || account === undefined) {
          return res.json({
            resultCode: -1,
            message: "Không tìm thấy người dùng này !",
            data: null,
          });
        } else {
          next();
        }
      }
    } else {
      return res.json({
        resultCode: -1,
        message: "Không tìm thấy người dùng này !",
        data: null,
      });
    }
  } catch (error) {
    res.json(1);
  }
};

module.exports = checkJwt;

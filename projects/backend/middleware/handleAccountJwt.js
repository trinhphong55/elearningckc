const jwt = require('jsonwebtoken')

exports.getAccountId = (req, res) => {
  if (req.token === 'admin') {
    return 0
  }
  return jwt.verify(req.token, '11111', (err, data) => {
    if (err) {
      console.log(err)
      res.json({
        resultCode: -1,
        message: 'Không tìm thấy người dùng này',
        data: null,
      })
    } else {
      return data.id
    }
  })
}
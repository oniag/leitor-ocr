const { parsePdf, extractPlainText } = require('easy-pdf-parser')
const fs = require('fs')
const Tesseract = require('tesseract.js')
const multer = require('multer')
const parser = multer({ dest: 'public/uploads' })
const { randonNumber } = require('../util/random')

module.exports = {
  async pdf(req, res) {
    if (!req.files) {
      return res.sendStatus(400);
    }

    const file = req.files.pdf.tempFilePath

    parsePdf(file).then(extractPlainText).then(data => {
      const stream = fs.createWriteStream(`public/txt/file-${randonNumber()}.txt`);
      stream.once('open', () => {
        stream.write(data)
        stream.end()
        res.sendStatus(200)
      })
    })
  },

  async img(req, res) {
    if (!req.files) {
      return res.sendStatus(400);
    }

    parser.single('img')(req, res, err => {
      if (err) res.status(500).json({ error: 1, payload: err })

      Tesseract.recognize(req.files.img.tempFilePath, 'por')
        .then(({ data: { text } }) => {
          const stream = fs.createWriteStream(`public/txt/img-${randonNumber()}.txt`);

          stream.once('open', () => {
            stream.write(text)
            stream.end()
            res.sendStatus(200)
          })
        })
    })
  }
}

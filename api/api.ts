import fs from 'fs'
import path from 'path'
import express from 'express'
import { json } from 'body-parser'
import multer from 'multer'

const app = express()

const upload = multer()

app.post(
  '/settings/read',
  upload.single('settings_file'),
  (req, res) => {
    const json = JSON.parse(req.file.buffer.toString())

    res.json({ data: json })
  }
)

const jsonParser = json()

app.post('/settings/save', jsonParser, (req, res) => {
  const { data } = req.body
  const settingsStr = JSON.stringify(data, null, 2)

  const filename = `settings_${Date.now()}.json`
  const absPath = path.join(__dirname, '/temp/', filename)
  const relPath = path.join('./api/temp', filename) // path relative to server root

  fs.writeFile(relPath, settingsStr, (err) => {
    if (err) {
      console.log('1', err)
    }
    res.download(absPath, (err) => {
      if (err) {
        console.log('2', err)
      }
      fs.unlink(relPath, (err) => {
        if (err) {
          console.log('3', err)
        }
        console.log('FILE [' + filename + '] REMOVED!')
      })
    })
  })
})

export default app

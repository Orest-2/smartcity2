import fs from 'fs'
import express from 'express'
import { json } from 'body-parser'

const app = express()

const getData = () => {
  try {
    if (fs.existsSync('./api/settings.json')) {
      return require('./settings.json')
    } else {
      return {}
    }
  } catch (err) {
    return {}
  }
}

app.get('/settings', (req, res) => {
  const keys = req.query.keys

  let data = getData()

  if (keys === '1') {
    data = Object.keys(data)
  }

  res.json({ data })
})

app.get('/settings/:uid', (req, res) => {
  const settings = getData()

  const data = settings?.[req.params.uid]

  res.json({ data })
})

const jsonParser = json()

app.post('/settings', jsonParser, (req, res) => {
  const settings = getData()

  const { uid, data } = req.body

  settings[uid] = data

  const settingsStr = JSON.stringify(settings, null, 2)
  fs.writeFileSync('./api/settings.json', settingsStr)

  res.json({ data: { uid, settings } })
})

export default app

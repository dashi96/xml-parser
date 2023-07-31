process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const express = require('express')
const cors = require('cors')
const { Parser } = require('xml2js')
const pg = require('pg')
const { readFileSync } = require('fs')

const app = express()
app.use(cors())

const config = {
  host: 'localhost',
  user: 'postgres',
  database: 'events',
  port: 5432,
  ssl: false
}

const client = new pg.Client(config)

async function parseAndSaveXml(path) {
  let events

  const queryCreateTable = `
    CREATE TABLE if NOT EXISTS event (
      _id SERIAL PRIMARY KEY,
      id CHARACTER VARYING, 
      title CHARACTER VARYING, 
      description CHARACTER VARYING, 
      date CHARACTER VARYING, 
      image CHARACTER VARYING, 
      url CHARACTER VARYING, 
      region CHARACTER VARYING, 
      category CHARACTER VARYING, 
      age CHARACTER VARYING, 
      venue_id CHARACTER VARYING, 
      venue_address CHARACTER VARYING, 
      google_address CHARACTER VARYING, 
      venue_alias CHARACTER VARYING, 
      web_tag_groups CHARACTER VARYING, 
      date_type CHARACTER VARYING, 
      min_price INTEGER, 
      max_price INTEGER
    )
  `
  await client.query(queryCreateTable)

  try {
    const querySelect = `SELECT * FROM public.event`
    events = await client.query(querySelect)
    await client.end()

    if (!events?.rows?.length) {
      new Parser({ attrkey: 'ATTR' }).parseString(
        readFileSync(path, 'utf8'),
        (err, result) => {
          if (err) {
            console.error(err)
            throw new Error('Bad file')
          } else {
            events = result?.subevents?.subevent
          }
        }
      )
      await queryInsert(events)
    }
  } catch (err) {
    console.error(err)
  }
}

async function queryInsert(events) {
  for (const event of events) {
    const clientInsert = new pg.Client(config)
    await clientInsert.connect()

    try {
      const queryInsert = `
          INSERT INTO event ("id", "title", "description", "date", "image", "url", "region", "category", "age", "venue_id", "venue_address", "google_address", "venue_alias", "web_tag_groups", "date_type", "min_price", "max_price")
          VALUES (${event.id[0]}, '${event.title[0]}', '${event.description[0]}', '${event.date[0]}', '${event.image[0]}', '${event.url[0]}', '${event.region[0]}', '${event.category[0]}', '${event.age[0]}', '${event.venue_id[0]}', '${event.venue_address[0]}', '${event.google_address[0]}', '${event.venue_alias[0]}', '${event.web_tag_groups[0]}', '${event.date_type[0]}', '${event.min_price[0]}', '${event.max_price[0]}')
      `
      await clientInsert.query(queryInsert)
    } catch (err) {
      console.log(err)
    } finally {
      await clientInsert.end()
    }
  }
}

client
  .connect()
  .then(async () => {
    await parseAndSaveXml('src/db/events.xml')

    app.get('/events', async (req, res) => {
      const clientGetEvents = new pg.Client(config)
      await clientGetEvents.connect()

      const { page = 1, limit = 30, filter = '' } = req.query
      const offset = (page - 1) * limit
      let query = `SELECT * FROM event`

      if (filter) {
        const price = parseInt(filter)
        if (Number.isInteger(price)) {
          query += ` WHERE min_price <= ${price} AND max_price >= ${price}`
        } else {
          query += ` WHERE LOWER(region) ILIKE '%${filter}%'`
        }
      }

      query += ` LIMIT ${limit} OFFSET ${offset}`

      try {
        const result = await clientGetEvents.query(query)
        return res.json(result.rows)
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch data' })
      } finally {
        clientGetEvents.end()
      }
    })

    app.listen(4200, () => {
      console.log('Server is running on port 4200')
    })
  })
  .catch((err) => {
    console.error('Connect db error: ', err)
  })

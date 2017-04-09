'use strict'

const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const textFolder = './texts/'
const months = {
  'Januar': 0,
  'Februar': 1,
  'März': 2,
  'April': 3,
  'Ap ril': 3,
  'Mai': 4,
  'Juni': 5,
  'Juli': 6,
  'August': 7,
  'September': 8,
  'Oktober': 9,
  'November': 10,
  'Dezember': 11
}

fs.readdir(textFolder, (err, files) => {
  if (err) return console.error(err)

  files.slice(0, 1).forEach(file => {
    const id = file.replace('.txt', '')
    const text = fs.readFileSync(textFolder + file, 'utf8')
    const sentiments = require(path.resolve(textFolder, '../sentiment/', `${id}.json`))

    let d = text.match(/(\d+)\.\s+(Januar|Februar|März|April|Ap ril|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\s+(\d{4})/)
    try {
      var date = new Date(d[3], months[d[2]], d[1])
    } catch (e) {
      throw new Error(id + ': ' + text.split('\n')[0])
    }

    const requestsForFile = []
    const chunkSize = 500
    const words = text.split(/\s+/)

    for (let i = 0; i * chunkSize < words.length; i++) {
      const part = words.slice(i * chunkSize, i * chunkSize + chunkSize).join(' ')
      const storeInDb = fetch(`http://127.0.0.1:5984/parlasentiment/${id}.${i}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          date: date.getTime(),
          raw: part,
          documentId: id,
          sentiment: sentiments[i],
          part: i
        })
      })
      .then(_ => ({
        raw: part,
        documentId: id,
        part: i
      }))
      requestsForFile.push(storeInDb)
    }

    Promise.all(requestsForFile)
      .then(chunks => {
        console.log(chunks.length)
        fetch('https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Ocp-Apim-Subscription-Key': ''
          },
          body: JSON.stringify({
            'documents': chunks.map(c => ({
              'language': 'de',
              'id': `${c.documentId}.${c.part}`,
              'text': c.raw
            }))
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          response.documents.forEach(doc => {
            fetch(`http://127.0.0.1:5984/parlasentiment/${doc.id}`)
              .then(res => res.json())
              .then(fromDB => {
                fromDB.keywords = doc.keyPhrases
                fetch(`http://127.0.0.1:5984/parlasentiment/${doc.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify(fromDB)
                })
              })
          })
         .catch(e => console.error(e))
        })
      })
  })
})

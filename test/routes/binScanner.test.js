const request = require('supertest')
const app = require('../../app')
const db = require('../../api/db')

const should = require('chai').should()

describe('GET /bin/binScanner', function() {
  it('responds with OK', function(done) {
    request(app)
      .get('/bin/binscanner/1')
      .end(function(err, res) {
        if (err) done(err)
        res.status.should.equal(200)

        done()
      })
  })
})

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../src/app')
const knex = require('../src/db')

chai.use(chaiHttp)

describe('Posts API routes', function () {
    beforeEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                knex.migrate.latest()
                    .then(function () {
                        return knex.seed.run()
                            .then(function () {
                                done()
                            })
                    })
            })
    })

    afterEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                done()
            })
    })

    describe('Test get on posts', function () {
        it('should return all posts', function (done) {
            chai.request(server)
                .get('/post')
                .end(function (err, res) {
                    res.should.have.status(200)
                    res.should.be.json
                    res.body.data.should.be.a('array')
                    res.body.data[0].should.have.property('title')
                    res.body.data[0].title.should.equal('Post title 1')
                    res.body.data[0].should.have.property('excerpt')
                    res.body.data[0].excerpt.should.equal('Post excerpt 1')
                    res.body.data[0].should.have.property('content')
                    res.body.data[0].content.should.equal('Post content 1')
                    res.body.data[0].should.have.property('user_id')
                    res.body.data[0].user_id.should.equal(1)
                    res.body.data[0].should.have.property('draft')
                    res.body.data[0].draft.should.equal(false)
                    done()
                })
        })
        it('should return one post', function (done) {
            chai.request(server)
                .get('/post/1')
                .end(function (err, res) {
                    res.should.have.status(200)
                    res.should.be.json
                    res.body.data.should.be.a('object')
                    res.body.data.should.have.property('title')
                    res.body.data.title.should.equal('Post title 1')
                    res.body.data.should.have.property('excerpt')
                    res.body.data.excerpt.should.equal('Post excerpt 1')
                    res.body.data.should.have.property('content')
                    res.body.data.content.should.equal('Post content 1')
                    res.body.data.should.have.property('user_id')
                    res.body.data.user_id.should.equal(1)
                    res.body.data.should.have.property('draft')
                    res.body.data.draft.should.equal(false)
                    done()
                })
        })
        it('should save one post', function (done) {
            chai.request(server)
                .post(`/post`)
                .send({
                    title: 'Title',
                    excerpt: 'Excerpt',
                    content: 'Content of post',
                    user_id: 1,
                    draft: false
                })
                .end(function (err, res) {
                    res.should.have.status(200)
                    res.should.be.json
                    res.body.data.should.have.property('id')
                    res.body.data.id.should.equal(1)
                    res.body.data.should.have.property('title')
                    res.body.data.title.should.equal('Title')
                    res.body.data.should.have.property('excerpt')
                    res.body.data.excerpt.should.equal('Excerpt')
                    res.body.data.should.have.property('content')
                    res.body.data.content.should.equal('Content of post')
                    res.body.data.should.have.property('user_id')
                    res.body.data.user_id.should.equal(1)
                    res.body.data.should.have.property('draft')
                    res.body.data.draft.should.equal(false)
                    done()
                })
        })
    })
})
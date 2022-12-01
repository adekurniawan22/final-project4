const { generateToken, verifyToken } = require("../helper/jwt");
const { sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");

let token = "";

let userId = "";
const userData = {
    email: "user_tes@gmail.com",
    full_name: "user tes",
    username: "usertes",
    password: "usertes",
    profile_image_url: "http://user.com/profile.jpg",
    age: 20,
    phone_number: "0851",
}

let photoId = "";
const photoData = {
    title: "gambar tes",
    caption: "ini gambar tes",
    poster_image_url: "https://tes.com/image/1.jpg",
}

let commentId = "";

beforeAll((done) => {
    request(app)
        .post('/users/register')
        .send(userData)
        .end(function (err, res) {
            if (err) {
                done(err)
            }

            request(app)
                .post('/users/login')
                .send(userData)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    }
                    userId = res.body.id
                    token = res.body.token;

                    request(app)
                        .post(`/photos`)
                        .set('authorization', token)
                        .send(photoData)
                        .end(function (err, res) {
                            if (err) {
                                done(err)
                            }
                            photoId = res.body.id
                            done()
                        })
                })
        })
})

// TESTING CREATE COMMENT
describe("POST /comments", () => {
    it("Get 8 expect success", (done) => {
        request(app)
            .post(`/comments`)
            .set('authorization', token)
            .send({ comment: "wow that's cool", UserId: userId, PhotoId: photoId })
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                commentId = res.body.comment.id;
                expect(res.status).toEqual(201);
                expect(res.body).toHaveProperty("comment");
                expect(res.body.comment).toHaveProperty("id");
                expect(res.body.comment).toHaveProperty("comment");
                expect(res.body.comment).toHaveProperty("UserId");
                expect(res.body.comment).toHaveProperty("PhotoId");
                expect(res.body.comment).toHaveProperty("createdAt");
                expect(res.body.comment).toHaveProperty("updatedAt");
                done()
            })

    })

    it("Get 2 except failed", (done) => {
        request(app)
            .post("/comments")
            .set("authorization", token)
            .send({ comment: "", UserId: "", PhotoId: "" })
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(500);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
})

afterAll((done) => {
    sequelize.queryInterface.bulkDelete("Comments", {})
        .then(() => {
            sequelize.queryInterface.bulkDelete("Users", {})
                .then(() => {
                    sequelize.queryInterface.bulkDelete("Photos", {})
                        .then(() => {
                            return done()
                        })
                        .catch((err) => {
                            done(err)
                        })
                })
                .catch((err) => {
                    done(err)
                })
        })
        .catch((err) => {
            done(err)
        })
})
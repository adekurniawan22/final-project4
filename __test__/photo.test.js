const { sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helper/jwt");

let token = "";
let wrongToken = "token salah";

let photoId = "";
let wrongPhotoId = 'aaa';

const userData = {
    id: 1,
    email: "firman@gmail.com",
    full_name: "Firman Ramadhan",
    username: "firman19",
    password: "19112001",
    profile_image_url: "http://photofirman.com",
    age: 21,
    phone_number: "081284858",
    createdAt: new Date(),
    updatedAt: new Date(),
};

const photoData = {
    id: 1,
    title: "One piece",
    caption: "One piece is real",
    poster_image_url: "http://onepiece.png",
    UserId: 1,
};

const wrongPhotoData = {
    title: "",
    caption: "",
    poster_image_url: "",
    UserId: "",
};

beforeAll((done) => {
    sequelize.queryInterface
        .bulkInsert("Users", [userData], {})
        .then(() => {
            token = generateToken({
                id: userData.id,
                email: userData.email,
                full_name: userData.full_name,
                username: userData.username,
                password: userData.password,
                profile_image_url: userData.profile_image_url,
                age: userData.age,
                phone_number: userData.phone_number,
            });
            return done();
        })
        .catch((err) => {
            done(err);
        });
});

//TESTING CREATE PHOTO
describe("POST /photos", () => {
    it("Get 6 except success", (done) => {
        request(app)
            .post("/photos")
            .set("authorization", token)
            .send(photoData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                photoId = res.body.id;
                expect(res.status).toEqual(201);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("title");
                expect(res.body).toHaveProperty("caption");
                expect(res.body).toHaveProperty("poster_image_url");
                expect(res.body).toHaveProperty("UserId");
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .post("/photos")
            .set("authorization", token)
            .send(wrongPhotoData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(500);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
});

//TESTING GET ALL DATA
describe("GET /photos", () => {
    it("Get 13 except success", (done) => {
        request(app)
            .get("/photos")
            .set("authorization", token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(200);
                expect(res.body[0]).toHaveProperty("id");
                expect(res.body[0]).toHaveProperty("title");
                expect(res.body[0]).toHaveProperty("caption");
                expect(res.body[0]).toHaveProperty("poster_image_url");
                expect(res.body[0]).toHaveProperty("UserId");
                expect(res.body[0]).toHaveProperty("createdAt");
                expect(res.body[0]).toHaveProperty("updatedAt");
                expect(res.body[0]).toHaveProperty("Comments");
                expect(res.body[0]).toHaveProperty("User");
                expect(res.body[0].User).toHaveProperty("id");
                expect(res.body[0].User).toHaveProperty("username");
                expect(res.body[0].User).toHaveProperty("profile_image_url");
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .get("/photos")
            .set("authorization", wrongToken)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(500);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
});

//TESTING EDIT PHOTO
describe("PUT /photos/:photoid", () => {
    it("Get 9 except success", (done) => {
        request(app)
            .put(`/photos/${photoId}`)
            .set("authorization", token)
            .send(photoData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty("photo");
                expect(res.body.photo).toHaveProperty("id");
                expect(res.body.photo).toHaveProperty("title");
                expect(res.body.photo).toHaveProperty("caption");
                expect(res.body.photo).toHaveProperty("poster_image_url");
                expect(res.body.photo).toHaveProperty("UserId");
                expect(res.body.photo).toHaveProperty("createdAt");
                expect(res.body.photo).toHaveProperty("updatedAt");
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .put(`/photos/${wrongPhotoId}`)
            .set("authorization", token)
            .send(photoData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(500);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
});

//TESTING DELETE PHOTO
describe("DELETE /photos/:photoid", () => {
    it("Get 5 except success", (done) => {
        request(app)
            .delete(`/photos/${photoId}`)
            .set("authorization", token)
            .send(photoData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }

                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("message");
                expect(typeof res.body.message).toEqual("string");
                expect(res.body.message).toEqual(
                    "Your photo has been successfully deleted"
                );
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .delete(`/photos/${wrongPhotoId}`)
            .set("authorization", token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(500);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
});

afterAll((done) => {
    sequelize.queryInterface
        .bulkDelete("Users", {})
        .then(() => {
            return done();
        })
        .catch((err) => {
            done(err);
        });

    sequelize.queryInterface
        .bulkDelete("Photos", {})
        .then(() => {
            return done();
        })
        .catch((err) => {
            done(err);
        });
});
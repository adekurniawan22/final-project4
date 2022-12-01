const { sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helper/jwt");

let token = "";
let wrongToken = "token salah";


let socialMediaId = "";
let wrongSocialMediaId = 'aaa';

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

const wrongUserData = {
    id: "",
    email: "",
    full_name: "",
    username: "",
    password: "",
    profile_image_url: "",
    age: "",
    phone_number: "",
    createdAt: new Date(),
    updatedAt: new Date(),
};

const socialMediaData = {
    id: 1,
    name: "Firman Ramadhan",
    social_media_url: "http://firmann19.com",
    UserId: 1,
};

const editSocialMediaData = {
    id: 1,
    name: "Edit Firman Ramadhan",
    social_media_url: "http://edit-firmann19.com",
    UserId: 1,
};

const wrongSocialMediaData = {
    id: "",
    name: "",
    social_media_url: "",
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

//TESTING CREATE SOCIAL MEDIA
describe("POST /socialmedias", () => {
    it("Get 8 except success", (done) => {
        request(app)
            .post("/socialmedias")
            .set("authorization", token)
            .send(socialMediaData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                socialMediaId = res.body.social_media.id;
                expect(res.status).toEqual(201);
                expect(res.body).toHaveProperty("social_media");
                expect(res.body.social_media).toHaveProperty("id");
                expect(res.body.social_media).toHaveProperty("name");
                expect(res.body.social_media).toHaveProperty("social_media_url");
                expect(res.body.social_media).toHaveProperty("UserId");
                expect(res.body.social_media).toHaveProperty("createdAt");
                expect(res.body.social_media).toHaveProperty("updatedAt");
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .post("/socialmedias")
            .set("authorization", token)
            .send(wrongSocialMediaData)
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

//TESTING GET SOCIAL MEDIA
describe("GET /socialmedias", () => {
    it("Get 12 except success", (done) => {
        request(app)
            .get("/socialmedias")
            .set("authorization", token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty("social_media");
                expect(res.body.social_media[0]).toHaveProperty("id");
                expect(res.body.social_media[0]).toHaveProperty("name");
                expect(res.body.social_media[0]).toHaveProperty("social_media_url");
                expect(res.body.social_media[0]).toHaveProperty("UserId");
                expect(res.body.social_media[0]).toHaveProperty("createdAt");
                expect(res.body.social_media[0]).toHaveProperty("updatedAt");
                expect(res.body.social_media[0]).toHaveProperty("User");
                expect(res.body.social_media[0].User).toHaveProperty("id");
                expect(res.body.social_media[0].User).toHaveProperty("username");
                expect(res.body.social_media[0].User).toHaveProperty("profile_image_url");
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .get("/socialmedias")
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

//TESTING EDIT SOCIAL MEDIA
describe("PUT /socialmedias/:socialmediasid", () => {
    it("Get 8 except success", (done) => {
        request(app)
            .put(`/socialmedias/${socialMediaId}`)
            .set("authorization", token)
            .send(editSocialMediaData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty("social_media");
                expect(res.body.social_media).toHaveProperty("id");
                expect(res.body.social_media).toHaveProperty("name");
                expect(res.body.social_media).toHaveProperty("social_media_url");
                expect(res.body.social_media).toHaveProperty("UserId");
                expect(res.body.social_media).toHaveProperty("createdAt");
                expect(res.body.social_media).toHaveProperty("updatedAt");
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .put(`/socialmedias/${wrongSocialMediaId}`)
            .set("authorization", token)
            .send(socialMediaData)
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

//TESTING DELETE SOCIAL MEDIA

describe("DELETE /socialmedias/:socialmediasid", () => {
    it("Get 5 except success", (done) => {
        request(app)
            .delete(`/socialmedias/${socialMediaId}`)
            .set("authorization", token)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("message");
                expect(typeof res.body.message).toEqual("string");
                expect(res.body.message).toEqual(
                    "Your social media has been succesfully deleted"
                );
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .delete(`/socialmedias/${wrongSocialMediaId}`)
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
        .bulkDelete("SocialMedia", {})
        .then(() => {
            return done();
        })
        .catch((err) => {
            done(err);
        });
});
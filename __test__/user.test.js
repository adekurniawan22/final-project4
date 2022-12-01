const { verifyToken } = require("../helper/jwt");
const { sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");

// EXAMPLE REGISTER DATA
const registerData = {
    full_name: "user tes",
    email: "usertes@gmail.com",
    username: "usertes",
    password: "usertes",
    profile_image_url: "http://user.com/profile.jpg",
    age: 20,
    phone_number: "085111111111",
}

const wrongRegisterData = {
    email: "",
    full_name: "",
    username: "",
    password: "",
    profile_image_url: "",
    age: "",
    phone_number: "",
}

// TESTING REGISTER
describe("POST /users/register", () => {
    it("Get 8 except success", (done) => {
        request(app)
            .post('/users/register')
            .send(registerData)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.body).toHaveProperty("user");
                expect(res.body.user).toHaveProperty("email");
                expect(res.body.user).toHaveProperty("full_name");
                expect(res.body.user).toHaveProperty("username");
                expect(res.body.user).toHaveProperty("profile_image_url");
                expect(res.body.user).toHaveProperty("age");
                expect(res.body.user).toHaveProperty("phone_number");
                expect(res.status).toEqual(201);
                done();
            })
    })

    it("Get 2 except failed", (done) => {
        request(app)
            .post('/users/register')
            .send(wrongRegisterData)
            .end(function (err, res) {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(500);
                expect(res.body).toHaveProperty("message");
                done()
            })
    })
})

let token = "";

const wrongLoginData = {
    email: "adsasd",
    password: "dsasdas",
};

// TESTING LOGIN
describe("POST /users/login", () => {
    it("Get 5 except success", (done) => {
        request(app)
            .post("/users/login")
            .send(registerData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                token = res.body.token;
                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty("token");
                expect(verifyToken(token)).toHaveProperty("id");
                expect(verifyToken(token)).toHaveProperty("email");
                expect(verifyToken(token)).toHaveProperty("username");
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .post("/users/login")
            .send(wrongLoginData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(500);
                expect(res.body).toHaveProperty("message");
                done()
            });
    });
});

const editData = {
    full_name: "user tes2",
    email: "usertes2@gmail.com",
    username: "usertes2",
    password: "usertes2",
    profile_image_url: "http://user.com/profile.jpg",
    age: 20,
    phone_number: "085111111111",
}

//TESTING EDIT USER
describe("PUT /users/:userid", () => {
    it("Get 8 except success", (done) => {
        request(app)
            .put(`/users/${verifyToken(token).id}`)
            .set("authorization", token)
            .send(editData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty("user");
                expect(res.body.user).toHaveProperty("email");
                expect(res.body.user).toHaveProperty("full_name");
                expect(res.body.user).toHaveProperty("username");
                expect(res.body.user).toHaveProperty("profile_image_url");
                expect(res.body.user).toHaveProperty("age");
                expect(res.body.user).toHaveProperty("phone_number");
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .put(`/users/123`)
            .set("token", token)
            .send(registerData)
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

//TESTING DELETE USER
describe("DELETE /users/:userid", () => {
    it("Get 5 except success", (done) => {
        request(app)
            .delete(`/users/${verifyToken(token).id}`)
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
                    "Your account has been succesfully deleted"
                );
                done();
            });
    });

    it("Get 2 except failed", (done) => {
        request(app)
            .delete(`/users/123`)
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

// DELETE DATA FROM TABLE USERS
afterAll((done) => {
    sequelize.queryInterface
        .bulkDelete("Users", {})
        .then(() => {
            return done();
        })
        .catch((err) => {
            done(err);
        });
});
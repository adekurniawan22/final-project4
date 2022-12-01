const { generateToken, verifyToken } = require("../helper/jwt");
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
    email: "user_tes",
    full_name: "",
    username: "",
    password: "",
    profile_image_url: "http://user/profile.jpg",
    age: '20s',
    phone_number: "0851s",
}

// TESTING REGISTER
describe("Success POST /users/register", () => {
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
})

describe("Failed POST /users/register", () => {
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

// TESTING LOGIN
let token = "";

const wrongLoginData = {
    email: "adsasd",
    password: "dsasdas",
};

describe("Success POST /users/login", () => {
    it("Get 5 except success", (done) => {
        request(app)
            .post("/users/login")
            .send(registerData)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                console.log(res.text);
                expect(res.status).toEqual(200);
                expect(res.body).toHaveProperty("token");
                done();
            });
    });
});

describe("Failed POST /users/login", () => {
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
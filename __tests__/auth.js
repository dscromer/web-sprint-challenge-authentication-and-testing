const { expectCt } = require("helmet")
const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("Auth Integration Tests", () => {
    it("POST /register", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({
                username: "Dalton",
                password: "abc123"
            })
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("Dalton")
    })

    it("POST /register --no data entered", async () => {
        const res = await supertest(server).post("/api/auth/register")
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please enter a username and password")
    })

    it("POST /login", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({
                username: "janedoe",
                password: "abc12345"
            })
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Welcome janedoe!")
    })

    it("POST /login --incorrect login", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({
                username: "jackdoe",
                password: "abc12345"
            })
            expect(res.statusCode).toBe(401)
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("Invalid Credentials")
    })
})

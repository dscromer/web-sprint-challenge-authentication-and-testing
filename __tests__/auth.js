const supertest = require("supertest")
const server = require("../api/server")
const { intersect } = require("../database/dbConfig")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("Auth Integration Tests", () => {
    it("POST /register", async () => {
        const res = await (await supertest(server).post("/api/auth/register")).setEncoding({ username: dscromer})
    })
})
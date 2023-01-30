import app from "../../server";
import request from "supertest";
import * as helper from "../../helper";

// beforeAll(); chạy 1 lần trước chạy test, dùng để setup dữ liệu trước khi chạy test
// beforeEach(); chạy mỗi lần trước khi chạy test
// afterEach();
// afterAll(); clean dữ liệu

// Get

describe("Get", () => {
  beforeAll(() => {
    jest
      .spyOn(helper, "getCurrentDate")
      .mockReturnValue(new Date("2022-12-12T00:00:00.000Z"));
  });
  test("POST /user --> create new user", async () => {
    const { body } = await request(app)
      .post("/user")
      .send({
        name: "test 1",
        _id: "63c0cf622d271448af292879",
      })
      .expect(200);

    expect(body).toEqual({
      data: {
        message: "Create User Successfully!",
        user: {
          name: "TEST 1",
          role: "employee",
          _id: "63c0cf622d271448af292879",
          __v: 0,
          createdAt: "2022-12-12T00:00:00.000Z",
          updatedAt: "2022-12-12T00:00:00.000Z",
        },
      },
    });
  });
  test("POST /user --> create new user", async () => {
    const { body } = await request(app)
      .post("/user")
      .send({
        name: "test 2",
        _id: "63c0cd82ee0ad2114a456a25",
      })
      .expect(200);

    expect(body).toEqual({
      data: {
        message: "Create User Successfully!",
        user: {
          name: "TEST 2",
          role: "employee",
          _id: "63c0cd82ee0ad2114a456a25",
          __v: 0,
          createdAt: "2022-12-12T00:00:00.000Z",
          updatedAt: "2022-12-12T00:00:00.000Z",
        },
      },
    });
  });
  test("GET /user --> get all user", async () => {
    const { body } = await request(app).get("/user").send({}).expect(200);

    expect(body).toEqual({
      data: {
        message: "Get User List Successfully!",
        user: [
          {
            _id: "63c0cf622d271448af292879",
            name: "TEST 1",
            createdAt: "2022-12-12T00:00:00.000Z",
            updatedAt: "2022-12-12T00:00:00.000Z",
            __v: 0,
            role: "employee",
          },
          {
            _id: "63c0cd82ee0ad2114a456a25",
            name: "TEST 2",
            createdAt: "2022-12-12T00:00:00.000Z",
            updatedAt: "2022-12-12T00:00:00.000Z",
            __v: 0,
            role: "employee",
          },
        ],
        page: 1,
        total: 1,
      },
    });
  });
  test("Get /user --> Get user by name", async () => {
    const { body } = await request(app).get("/user?name=test 1").expect(200);

    expect(body).toEqual({
      data: {
        message: "Get User List Successfully!",
        user: [
          {
            _id: "63c0cf622d271448af292879",
            name: "TEST 1",
            createdAt: "2022-12-12T00:00:00.000Z",
            updatedAt: "2022-12-12T00:00:00.000Z",
            __v: 0,
            role: "employee",
          },
        ],
        page: 1,
        total: 1,
      },
    });
  });
  test("Get /user --> Get user by id", async () => {
    const { body } = await request(app)
      .get("/user?_id=63c0cd82ee0ad2114a456a25")
      .expect(200);

    expect(body).toEqual({
      data: {
        message: "Get User List Successfully!",
        user: [
          {
            _id: "63c0cd82ee0ad2114a456a25",
            name: "TEST 2",
            createdAt: "2022-12-12T00:00:00.000Z",
            updatedAt: "2022-12-12T00:00:00.000Z",
            __v: 0,
            role: "employee",
          },
        ],
        page: 1,
        total: 1,
      },
    });
  });
  test("Get /user --> Get user by name", async () => {
    const { body } = await request(app).get("/user?name=test 3").expect(200);

    expect(body).toEqual({
      data: {
        message: "Get User List Successfully!",
        user: [],
        page: 1,
        total: 0,
      },
    });
  });
  test("Get /user --> Get user by name", async () => {
    const { body } = await request(app).get("/user?test=test").expect(400);

    expect(body).toEqual({
      message: '"test" is not allowed',
    });
  });
  afterAll(async () => {
    helper.disconnect();
  });
});

// get user beforAll cần

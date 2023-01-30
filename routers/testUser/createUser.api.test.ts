import app from "../../server";
import request from "supertest";
import * as helper from "../../helper";

// beforeAll(); chạy 1 lần trước chạy test, dùng để setup dữ liệu trước khi chạy test
// beforeEach(); chạy mỗi lần trước khi chạy test
// afterEach();
// afterAll(); clean dữ liệu

// Post

describe("Posts", () => {
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
      })
      .expect(200);

    expect(body).toEqual({
      data: {
        message: "Create User Successfully!",
        user: {
          name: "TEST 1",
          role: "employee",
          _id: expect.any(String),
          __v: 0,
          createdAt: "2022-12-12T00:00:00.000Z",
          updatedAt: "2022-12-12T00:00:00.000Z",
        },
      },
    });
  });
  test("POST /user --> create new user", async () => {
    const { body } = await request(app).post("/user").send({}).expect(400);

    expect(body).toEqual({
      message: '"name" is required',
    });
  });
  test("POST /user --> create new user", async () => {
    const { body } = await request(app)
      .post("/user")
      .send({
        _id: "",
      })
      .expect(400);

    expect(body).toEqual({
      message: '"name" is required. "_id" is not allowed to be empty',
    });
  });
  afterAll(async () => {
    helper.disconnect();
  });
});

// get user beforAll cần

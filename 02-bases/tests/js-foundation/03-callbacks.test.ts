import { getUserById } from "../../src/js-foundation/03-callbacks";

describe("js-foundation/03-callbacks", () => {
  test("getUserById should return an error if user doesnt exist ", (done) => {
    const id = 10;

    getUserById(id, (err, user) => {
      expect(err).toBe(`User not found with id ${id}`);
      expect(user).toBeUndefined();
      done();
    });
  });

  test("getUserById should return John Doe", (done) => {
    const id = 1;

    getUserById(id, (err, user) => {
      expect(user?.id).toBe(1);
      expect(user?.name).toBe("John Doe");
      expect(user).toEqual({ id: 1, name: "John Doe" });
      expect(err).toBeUndefined();
      done();
    });
  });
});

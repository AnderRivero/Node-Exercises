describe("Test in the file App", () => {
  test("Should be 30", () => {
    //arrange
    const num1 = 10;
    const num2 = 20;

    // act
    const result = num1 + num2;

    // assert
    expect(result).toBe(30);
  });
});

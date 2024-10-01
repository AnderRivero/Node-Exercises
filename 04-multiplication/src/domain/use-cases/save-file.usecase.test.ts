import { SaveFile } from "./save-file.usecase";
import fs from "fs";
describe("save-file useCase", () => {
  const customOptions = {
    fileContent: "custom content",
    destination: "custom",
    fileName: "custom",
  };
  const customFilePath = `./src/documents/${customOptions.destination}/${customOptions.fileName}.txt`;
  afterEach(() => {
    if (fs.existsSync("./src/documents/outputs")) {
      fs.rmSync("./src/documents/outputs", { recursive: true });
    }

    if (fs.existsSync(customFilePath)) {
      fs.rmSync(customFilePath, { recursive: true });
    }
  });

  test("save file with defauls values ", () => {
    const saveFile = new SaveFile();
    const option = { fileContent: "test content" };
    const filePath = `./src/documents/outputs/table.txt`;

    const result = saveFile.execute(option);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toEqual(option.fileContent);
  });

  test("should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf-8" });

    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toEqual(customOptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Error");
    });
    const result = saveFile.execute(customOptions);
    expect(result).toBeFalsy();
    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("Error");
    });
    const result = saveFile.execute(customOptions);
    expect(result).toBeFalsy();
    mkdirSpy.mockRestore();
  });
});

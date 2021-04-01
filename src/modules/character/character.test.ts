import { getCharacters, getCharacterById } from "./character";
import { getAllCharacterIds, getCharacter } from "./utils";
import Cache from "../../utils/cache";

jest.mock("./utils");
jest.mock("../../utils/cache", () => ({
  get: jest.fn(),
  set: jest.fn(),
  has: jest.fn(),
}));

const getAllCharacterIdsMock = getAllCharacterIds as jest.MockedFunction<
  typeof getAllCharacterIds
>;
const getCharacterMock = getCharacter as jest.MockedFunction<
  typeof getCharacter
>;

describe("getCharacters", () => {
  it("should return cache when exist", async () => {
    const mockResponseSend = jest.fn();

    Cache.has = jest.fn().mockImplementationOnce(() => true);
    Cache.get = jest.fn().mockImplementationOnce(() => [123]);
    await getCharacters({}, { send: mockResponseSend });
    expect(mockResponseSend).toBeCalledWith([123]);
    expect(getAllCharacterIds).not.toBeCalled();
  });

  it("should call api to get character ids when cache doesn't exist", async () => {
    const mockResponseSend = jest.fn();

    Cache.has = jest.fn().mockImplementationOnce(() => false);
    getAllCharacterIdsMock.mockImplementationOnce(async () => [456]);
    await getCharacters({}, { send: mockResponseSend });
    expect(mockResponseSend).toBeCalledWith([456]);
    expect(getAllCharacterIds).toBeCalled();
  });
});

describe("getCharacterbyId", () => {
  it("should return cache when exist", async () => {
    const mockResponseSend = jest.fn();
    const expectedCharacter = {
      id: 1011334,
      name: "3-D Man",
      description: "",
    };

    Cache.has = jest.fn().mockImplementationOnce(() => true);
    Cache.get = jest.fn().mockImplementationOnce(() => expectedCharacter);
    await getCharacterById(
      { params: { characterId: 1011334 } },
      { send: mockResponseSend }
    );
    expect(mockResponseSend).toBeCalledWith(expectedCharacter);
    expect(getCharacter).not.toBeCalled();
  });

  it("should call api to get character ids when cache doesn't exist", async () => {
    const mockResponseSend = jest.fn();
    const expectedCharacter = {
      id: 1234567,
      name: "3-D Man",
      description: "",
    };

    Cache.has = jest.fn().mockImplementationOnce(() => false);
    getCharacterMock.mockImplementationOnce(async () => expectedCharacter);
    await getCharacterById(
      { params: { characterId: 1234567 } },
      { send: mockResponseSend }
    );
    expect(mockResponseSend).toBeCalledWith(expectedCharacter);
    expect(getCharacter).toBeCalledWith(1234567);
  });

  it("should return 400 when character id is invalid", async () => {
    const mockResponseSend = jest.fn();
    const mockResponseStatus = jest.fn(() => ({
      send: mockResponseSend,
    }));

    await getCharacterById(
      { params: { characterId: "123abc" } },
      { status: mockResponseStatus }
    );
    expect(mockResponseStatus).toBeCalledWith(400);
    expect(mockResponseSend).toBeCalledWith("Invalid character id");
  });

  it("should call api to get character ids when cache doesn't exist", async () => {
    const mockResponseSend = jest.fn();
    const mockResponseStatus = jest.fn(() => ({
      send: mockResponseSend,
    }));

    Cache.has = jest.fn().mockImplementationOnce(() => false);
    getCharacterMock.mockImplementationOnce(async () => null);
    await getCharacterById(
      { params: { characterId: 1234567 } },
      { status: mockResponseStatus }
    );
    expect(getCharacter).toBeCalledWith(1234567);
    expect(mockResponseStatus).toBeCalledWith(404);
    expect(mockResponseSend).toBeCalledWith("Character not found");
  });
});

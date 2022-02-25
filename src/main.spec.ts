import { RedisModule, REDIS_CLIENT, RedisClientType } from "./main";

describe("main exports", () => {
  it("is defined", () => {
    expect(RedisModule).toBeDefined();
    expect(REDIS_CLIENT).toBeDefined();
  });
});

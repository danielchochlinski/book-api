import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { shortenFunction, debounce } from "../helper";

describe("shortenFunction", () => {
  it("should return the original string if it is less than or equal to 10 characters", () => {
    expect(shortenFunction("short")).toBe("short");
    expect(shortenFunction("exactlyten")).toBe("exactlyten");
  });

  it('should shorten the string and append "..." if it is longer than 10 characters', () => {
    expect(shortenFunction("thisiswaytoolong")).toBe("thisiswayt...");
    expect(shortenFunction("elevenchars")).toBe("elevenchar...");
  });

  it("should handle empty string correctly", () => {
    expect(shortenFunction("")).toBe("");
  });
});

describe("debounce", () => {
  it("delays the function call", () => {
    const mockFunc = vi.fn();
    const delayedFunc = debounce(mockFunc, 1000);

    delayedFunc();
    expect(mockFunc).not.toHaveBeenCalled();

    vi.runAllTimers();
    expect(mockFunc).toHaveBeenCalled();
  });

  it("cancels the previous call if called again within the delay", () => {
    const mockFunc = vi.fn();
    const delayedFunc = debounce(mockFunc, 1000);

    delayedFunc();
    delayedFunc();

    vi.runAllTimers();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it("passes the arguments to the debounced function", () => {
    const mockFunc = vi.fn();
    const delayedFunc = debounce(mockFunc, 1000);
    const args = [1, 2, 3];

    delayedFunc(...args);

    vi.runAllTimers();
    expect(mockFunc).toHaveBeenCalledWith(...args);
  });
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

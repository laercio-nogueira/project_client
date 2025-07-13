import { TextEncoder, TextDecoder } from "util";
import "@testing-library/jest-dom";

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

jest.mock("@config/env.config", () => ({
  BACKEND_URL: "http://mocked-backend",
  PORT: "9999",
  BASE_URL: "http://mocked-backend:9999",
}));

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  silent: true,
  collectCoverageFrom: ["**/*.(t|s)s"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/jest.config.ts",
    "/vite.config.ts",
    "/src/app.module.ts",
    "/main.ts",
    "/jest.config.ts",
    "/src/config/",
    "/tests/store/states/testUtils.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@store/(.*)": "<rootDir>/src/store/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@templates/(.*)": "<rootDir>/src/templates/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
  },
};

export default config;

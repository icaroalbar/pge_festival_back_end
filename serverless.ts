import {
  questions,
  responses,
  createUsers,
  updateUsers,
  users,
  ranking,
  updateScoreUser,
} from "@functions/index";
import type { AWS } from "@serverless/typescript";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env.development" });

export const apiName = `pg-festival-questions`;

const serverlessConfiguration: AWS = {
  service: apiName,
  useDotenv: true,
  frameworkVersion: "3",
  plugins: [
    "serverless-dotenv-plugin",
    "serverless-webpack",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: `${apiName}-bucket`,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["*"],
            Resource: ["*"],
          },
        ],
      },
    },
  },
  functions: {
    questions,
    responses,
    createUsers,
    updateUsers,
    users,
    ranking,
    updateScoreUser,
  },
  package: { individually: true, include: ["src/**/*.sql"] },
  custom: {
    dotenv: {
      path: "./.env.development",
    },
    webpack: {
      webpackConfig: "./webpack.config.ts",
      includeModules: true,
      useChildProcesses: true,
      packager: "yarn",
      excludeFiles: "src/**/*.spec.*",
    },
    layers: {
      dependenciesPath: "./package.json",
    },
  },
};

module.exports = serverlessConfiguration;

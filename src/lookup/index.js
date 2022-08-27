"use strict";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getBranches = async (event) => {
  const params = {
    TableName: "scheduler-table-dev",
    Key: {
      PK: "lookup",
      SK: "branches",
    },
  };

  try {
    const { Item } = await docClient.get(params).promise();

    if (Item) {
      const { branches } = Item;
      return { branches };
    } else {
      return {
        error: "Connot find lookup",
      };
    }
  } catch (err) {
    return err;
  }
};

module.exports.getDepartmentByBranch = async (event) => {
  const params = {
    TableName: "scheduler-table-dev",
    Key: {
      PK: "lookup#departments",
      SK: `${event.queryStringParameters.branch}`,
    },
  };

  try {
    const { Item } = await docClient.get(params).promise();

    if (Item) {
      const { departments } = Item;
      return { departments };
    } else {
      return {
        error: "Connot find lookup",
      };
    }
  } catch (err) {
    return err;
  }
};

"use strict";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getSubjectsByDeptAndSem = async (event) => {
    const params = {
      TableName: "scheduler-table-dev",
      Key: {
        PK: "lookup#subjects",
        SK: `${event.queryStringParameters.department}#${event.queryStringParameters.semester}`
      },
    };
  
    try {
      const { Item } = await docClient.get(params).promise();
      if (Item) {
        const { subjects , labs} = Item;
        return { subjects ,labs};
      } else {
        return {
          error: "Connot find lookup",
        };
      }
    } catch (err) {
      return err;
    }
  };
  
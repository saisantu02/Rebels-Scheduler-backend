"use strict";

module.exports.hello = async (event) => {
  console.log("Successfull first deploy");
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
"use strict";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.postExamDetails = async (event) => {
  console.log(event.body);
  const input = JSON.parse(event.body);
  const params = {
    TableName: "scheduler-table-dev",
    Item: {
      PK: `exams#${input.examType.toLowerCase()}`,
      SK: `${input.department.toLowerCase()}#${input.semester}`,
      branch: input.branch,
      department: input.department,
      semester: input.semester,
      examType: input.examType,
      startTimeFN: input.startTimeFN,
      endTimeFN: input.endTimeFN,
      startTimeAN: input.startTimeAN,
      endTimeAN: input.endTimeAN,
      subjectCount: input.subjectCount,
      labCount: input.labCount,
      subject1_Id: input.subject1_Id,
      subject1_Name: input.subject1_Name,
      
      subject2_Id: input.subject2_Id,
      subject2_Name: input.subject2_Name,
      subject3_Id: input.subject3_Id,
      subject3_Name: input.subject3_Name,
      subject4_Id: input.subject4_Id,
      subject4_Name: input.subject4_Name,
      subject5_Id: input.subject5_Id,
      subject5_Name: input.subject5_Name,
      subject6_Id: input.subject6_Id,
      subject6_Name: input.subject6_Name,
      lab1_Id: input.lab1_Id,
      lab2_Id: input.lab2_Id,
      lab3_Id: input.lab3_Id,
      lab1_Name: input.lab1_Name,
      lab2_Name: input.lab2_Name,
      lab3_Name: input.lab3_Name,
    },
  };

  try {
    await docClient.put(params).promise();
    return "Added";
  } catch (err) {
    return err;
  }
};

module.exports.getExamDetails = async (event) => {
  const params = {
    TableName: "scheduler-table-dev",
    Key: {
      PK: "exams#semester",
      SK: `${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`,
    },
  };

  try {
    const { Item } = await docClient.get(params).promise();
    if (Item) {
      return { Item };
    } else {
      return {
        error: "Connot find details",
      };
    }
  } catch (err) {
    return "Catched want me to throw back";
  }
};

module.exports.deleteSchedule = async (event) => {
  const params = {
    TableName: "scheduler-table-dev",
    Key: {
      PK: `exams#${event.pathParameters.examtype}`,
      SK: `${event.queryStringParameters.department}#${event.queryStringParameters.semester}`,
    },
  };

  try {
    const { Item } = await docClient.delete(params).promise();
    if (Item) {
      return { Item };
    } else {
      return "Deleted";
    }
  } catch (err) {
    return "Catch";
  }
};

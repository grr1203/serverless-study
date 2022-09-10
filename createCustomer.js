'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, 'utf8').toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      primary_key: body.name,
      email: body.email,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};
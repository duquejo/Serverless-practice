const AWS = require('aws-sdk');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');

const getTask = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } =  event.pathParameters;

    const result = await dynamodb.get({
        TableName: 'TaskTable',
        Key: {
            id
        }
    }).promise();

    const task = result.Item;

    return {
        status: 200,
        body: task
    };
};

module.exports = {
    getTask: middy( getTask ).use( jsonBodyParser() ), // Parse JSON Body
};

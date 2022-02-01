const AWS = require('aws-sdk');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');

const deleteTask = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    await dynamodb.delete({
        TableName: 'TaskTable',
        Key: {
            id
        }
    }).promise();

    return {
        status: 200,
        body: 'Task deleted'
    };
};

module.exports = {
    deleteTask: middy( deleteTask ).use( jsonBodyParser() ), // Parse JSON Body
};

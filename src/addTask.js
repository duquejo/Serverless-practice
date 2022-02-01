const AWS = require('aws-sdk');

const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const validator = require('@middy/validator');
const httpErrorHandler = require('@middy/http-error-handler');
const Ajv = require('ajv');

const { v4 } = require('uuid');
const { addTaskSchema } = require('./schemas/addTask.schema');

const ajv = new Ajv();

const addTask = async (event) => {

    /**
     * Connecting through AWS config
     */
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { title, description } = event.body;
    const createdAt = new Date().toISOString();
    const id = v4();

    const newTask = {
        id,
        title,
        description,
        createdAt,
        done: false
    };

    /**
     * Call dynamo DB as a Promise
     */
    await dynamodb.put({
        TableName: 'TaskTable',
        Item: newTask
    }).promise();

    /**
     * Return
     */
    return {
        status: 200,
        body: newTask
    }
};

module.exports = {
    addTask: middy( addTask )
        .use( jsonBodyParser() ) // Parse JSON Body
        .use( validator({
            inputSchema: ajv.compile( addTaskSchema )
        }) )
        .use( httpErrorHandler() )
};

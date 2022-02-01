const AWS = require('aws-sdk');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');

const getTasks = async (event) => {

    try {
        
        const dynamodb = new AWS.DynamoDB.DocumentClient();
    
        const result = await dynamodb.scan({
            TableName: 'TaskTable'
        }).promise();
    
        const tasks = result.Items;
    
        return {
            status: 200,
            body: {
                tasks
            }
        };
    } catch (error) {
        console.error( error );
    }
};

module.exports = {
    getTasks: middy( getTasks ).use( jsonBodyParser() ), // Parse JSON Body
};

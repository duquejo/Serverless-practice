const addTaskSchema = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string', maxLength: 20 },
				createdAt: { type: 'string' },
                done: { type:'boolean' },
            },
            required: [
                'title',
                'description'
            ]
        }
    }
};

module.exports = {
    addTaskSchema
};

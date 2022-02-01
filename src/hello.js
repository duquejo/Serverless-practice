"use strict";

module.exports.hello = async (event) => {

  // Code goes here

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello World!",
        input: event,
      },
      null,
      2
    ),
  };
};

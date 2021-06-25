require("dotenv").config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
 .base("appwtUG0ojBOu30TH")
 .table("cars");

exports.handler = async (event, context) => {
 const { id } = event.queryStringParameters;

 if (id) {
  try {
   const car = await airtable.retrieve(id);
   if (car.error) {
    return {
     statusCode: 404,
     body: `No car with id: ${id}`,
    };
   }
   return {
    headers: {
     "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: JSON.stringify(car),
   };
  } catch (error) {
   return {
    statusCode: 500,
    body: `Server Error`,
   };
  }
 }

 try {
  const { records } = await airtable.list();

  return {
   headers: {
    "Access-Control-Allow-Origin": "*",
   },
   statusCode: 200,
   body: JSON.stringify(records),
  };
 } catch (error) {
  return {
   statusCode: 500,
   body: "it was an Error",
  };
 }
};

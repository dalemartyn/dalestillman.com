const {
  getBeers
} = require('../../../tasks/get-beer-data');

exports.handler = async (event, context, callback) => {
  const data = await getBeers();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

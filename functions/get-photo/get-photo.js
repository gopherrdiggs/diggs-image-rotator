const fetch = require('node-fetch');

const API_BASE_URL = 'https://api.pexels.com/v1';
const QUERY = 'HD%20nature%20wallpaper%20-people%20-person';

exports.handler = async (event, context) => {
  let response;

  try {
    let pageNum = Math.floor((Math.random() * 1000) + 1);

    let getPhotoData = await fetch(
      `${API_BASE_URL}/search?query=${QUERY}&per_page=1&page=${pageNum}`,
      {
        method: 'GET',
        headers: {
          'Authorization': '563492ad6f91700001000001742f8c7015ce4bdbb2d419744dd8d9b7'
        }
      }
    );

    response = await getPhotoData.json();
  }
  catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  };
}
# Assignment-GenMe
API to get max possible number of draws from given scores for Go Game

## Installation
* Install Node.js v20.13.1
* Clone or download the repository
* cd to the project directory in the terminal
* Run `npm install`
* Or manually install express v4.19.2, jest v29.7.0, supertest v7.0.0

## Running
* cd to the project directory in the terminal
* Run `node .` or `node server.js` to start the server
* press `ctrl+c` to stop the server

## Using the Api
### GET Route
* Visit http://localhost:8080
* /maxDraws/:p0/:p1/:p2
  * Here p0, p1 and p2 are the scores of the individual players
  * The score should be in non decreasing order
  * Every player's score should be between 0 and 30
  * The scores should correspond to at least one valid configration of games

#### Response
* The API returns a JSON object with max_draws
* If the any of the above constraints is not met by the input then -1 is returned as max_draws
* Otherwise the max possible draws that could have occured, for all valid configration of games, is returned

#### Example cases
* for /maxDraws/2/3/6
  ```json
  {
    "max_draws": 5
  }
  ```
* for /maxDraws/6/6/6
  ```json
  {
    "max_draws": 9
  }
  ```
* for /maxDraws/5/5/5
  ```json
  {
    "max_draws": -1
  }
  ```
* for /maxDraws/3/2/6
  ```json
  {
    "max_draws": -1
  }
  ```

## Testing the API
* cd to the project directory in the terminal
* Run `npx jest` to start the test
* to add/edit tests edit `app.test.js` file

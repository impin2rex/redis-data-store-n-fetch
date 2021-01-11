# redis-data-store-n-fetch
Now test the following:
API route which will accept an object in this format { id: 1, name: "John", age: 24 } like this (use current timestamp for id, so will get unique id)
Save this in redis.
Save the data of last 10 API calls, make another 2 get calls, to fetch the whole list and a single item

So, there you find 3 routes, 1 post route /postdata to save data, 1 get route /getdata to fetch whole list. 1 get route /getdata/:id to fetchById.

To run, at first clone this repo.
Then, install dependencies using <npm install> command on your terminal and install a dev depencies using <npm i -D nodemon> command.
To run this code run <npm start> command.

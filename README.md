# Care Watcher Message Portal

A realtime node message portal

## Structure
- NodeJS
- ES6
- NodeMon
- body-parser
- ejs
- express
- JsonDB

## Usage
- Install NodeJS 8.0 or higher.
- Run `npm install` in the _scripts folder
- Run `npm run dev` in the _scripts folder

## App data
#### Using JSON
Try to do a post to http://localhost:3001/api/message

With the following body 
```
{
    "id": 1,
    "roomNumber": 1,
    "title": "A test message",
    "message": "Put some message text in here",
    "prio": 1
}
```

Then open up the browser again and go to: http://localhost:3001

Tip: to do this 'post' try PostMan: https://www.getpostman.com/

#### Using Form Data
Try to do a post to http://localhost:3001/api/message/alt

With the following form fields
```
"id": 1,
"roomnr": 1,
"title": "A test message",
"description": "Put some message text in here",
"priority": 1
```

## License

MIT

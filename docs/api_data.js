define({ "api": [  {    "type": "post",    "url": "/api/admin/message",    "title": "/api/admin/message",    "name": "message",    "group": "Admin",    "parameter": {      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"_id\": 1\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message modified!</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Message modified!\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "error",            "description": "<p>Incorrect message!</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Incorrect message!\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./controllers/Api/AdminController.js",    "groupTitle": "Admin"  },  {    "type": "post",    "url": "/api/admin/room",    "title": "/api/admin/room",    "name": "room",    "group": "Admin",    "parameter": {      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"id\": 1,\n  \"action\": \"create\",\n  \"client_name\": \"Test User\"\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Room created!</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Room created!\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "error",            "description": "<p>Incorrect body!</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Incorrect body!\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./controllers/Api/AdminController.js",    "groupTitle": "Admin"  },  {    "type": "get",    "url": "/api",    "title": "/api",    "name": "api",    "group": "General",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>A default api message</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Default API route!\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./controllers/Api/IndexController.js",    "groupTitle": "General"  },  {    "type": "get",    "url": "/api/notfound",    "title": "/api/notfound",    "name": "notfound",    "group": "General",    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "error",            "description": "<p>A default api not found message</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"This API route is not implemented yet\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server.js",    "groupTitle": "General"  },  {    "type": "post",    "url": "/api/message/alt",    "title": "/api/message/alt",    "name": "addMessageFormData",    "group": "Message",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Int",            "optional": true,            "field": "id",            "description": ""          },          {            "group": "Parameter",            "type": "Int",            "optional": false,            "field": "roomnr",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "title",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": ""          },          {            "group": "Parameter",            "type": "Int",            "optional": false,            "field": "priority",            "description": ""          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message created!</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Message created!\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "error",            "description": "<p>Incorrect body!</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Incorrect body!\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./controllers/Api/MessageController.js",    "groupTitle": "Message"  },  {    "type": "post",    "url": "/api/message",    "title": "/api/message",    "name": "addMessageJSON",    "group": "Message",    "parameter": {      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"id\": 1,\n  \"roomNumber\": 1,\n  \"title\": \"A test message\",\n  \"message\": \"Put some message text in here\",\n  \"prio\": 1\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>Message created!</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Message created!\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "error",            "description": "<p>Incorrect body!</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Incorrect body!\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./controllers/Api/MessageController.js",    "groupTitle": "Message"  },  {    "type": "get",    "url": "/api/message",    "title": "/api/message",    "name": "getMessage",    "group": "Message",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "messages",            "description": "<p>An array containing all messages in the DB (Array of Objects)</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "messages._id",            "description": "<p>The DB generated ID</p>"          },          {            "group": "Success 200",            "type": "Int",            "optional": false,            "field": "messages.id",            "description": "<p>The message ID</p>"          },          {            "group": "Success 200",            "type": "Int",            "optional": false,            "field": "messages.roomNumber",            "description": "<p>The room number</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "messages.title",            "description": "<p>The title of the message</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "messages.message",            "description": "<p>The message</p>"          },          {            "group": "Success 200",            "type": "Int",            "optional": false,            "field": "messages.prio",            "description": "<p>The prio number</p>"          },          {            "group": "Success 200",            "type": "Int",            "optional": false,            "field": "messages.created",            "description": "<p>When is the message created in Unix Epoch style</p>"          },          {            "group": "Success 200",            "type": "Bool",            "optional": false,            "field": "messages.completed",            "description": "<p>Is the message completed?</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "messages.client_name",            "description": "<p>The client name</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"messages\": []\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./controllers/Api/MessageController.js",    "groupTitle": "Message"  }] });

define({ "api": [
  {
    "type": "post",
    "url": "/games/",
    "title": "Create a game",
    "name": "CreateGame",
    "group": "Games",
    "description": "<p>Creates a game and returns the created object.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name for the game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "welcometext",
            "description": "<p>Game's info/welcome text</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "completedtext",
            "description": "<p>Game's win text</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP  /1.1 200 OK\n {\n   \"g_id\": 2,\n   \"g_name\": \"Fun Game\",\n   \"g_welcometext\": \"Welcome!\",\n   \"g_completedtext\": \"Byebye :(\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/gamesController.js",
    "groupTitle": "Games"
  },
  {
    "type": "get",
    "url": "/games/",
    "title": "Query games by parameters",
    "name": "GetGames",
    "group": "Games",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User's id -&gt; Get games by user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/games?user=Player1",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP  /1.1 200 OK\n {\n   \"g_id\": 2,\n   \"g_name\": \"Fun Game\",\n   \"g_welcometext\": \"Welcome!\",\n   \"g_completedtext\": \"Byebye :(\",\n\t  \"players\": 2,\n    \"tags\": 3\n \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Document not found": [
          {
            "group": "404 Document not found",
            "optional": false,
            "field": "GamesNotFound",
            "description": "<p>Games not found with search parameters.</p>"
          }
        ],
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/gamesController.js",
    "groupTitle": "Games"
  },
  {
    "type": "get",
    "url": "/leaderboard/:game",
    "title": "Get leaderboard for game",
    "name": "Leaderboard",
    "group": "Games",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "game",
            "description": "<p>Id of the game</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP  /1.1 202 OK\n\t[\n  {\n      \"game\": \"Uusi\",\n      \"player\": \"Moi\",\n      \"count\": 1,\n      \"lastfound\": \"2018-04-27T09:04:51.000Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/tagController.js",
    "groupTitle": "Games"
  },
  {
    "type": "patch",
    "url": "/games/:id",
    "title": "Update a game",
    "name": "UpdateGame",
    "group": "Games",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Game's id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>New name for the game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "welcometext",
            "description": "<p>New game's info/welcome text</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "completedtext",
            "description": "<p>New game's win text</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP  /1.1 200 OK\n {\n   \"message\": \"Game updated successfully\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/gamesController.js",
    "groupTitle": "Games"
  },
  {
    "type": "get",
    "url": "/games/:id",
    "title": "Get game by id",
    "name": "getGame",
    "group": "Games",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Game's id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP  /1.1 200 OK\n {\n   \"g_id\": 2,\n   \"g_name\": \"Fun Game\",\n   \"g_welcometext\": \"Welcome!\",\n   \"g_completedtext\": \"Byebye :(\",\n\t  \"players\": 2,\n    \"tags\": 3\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Document not found": [
          {
            "group": "404 Document not found",
            "optional": false,
            "field": "GameNotFound",
            "description": "<p>Game with <code>id</code> was not found.</p>"
          }
        ],
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/gamesController.js",
    "groupTitle": "Games"
  },
  {
    "type": "post",
    "url": "/players/",
    "title": "Create player",
    "name": "CreatePlayer",
    "group": "Players",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name for player</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "game",
            "description": "<p>Game's id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tag",
            "description": "<p>Found tag's id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP  /1.1 200 OK\n{\n  \"p_id\": 2,\n  \"p_name\": \"John\",\n  \"p_game\": 1,\n  \"p_current\": 5\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/playerController.js",
    "groupTitle": "Players"
  },
  {
    "type": "get",
    "url": "/hint/:id",
    "title": "Get hint for player",
    "name": "GetHint",
    "group": "Players",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Player's id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP  /1.1 200 OK\n{\n  \"hint\": \"Roses are red, ___ are blue...\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/playerController.js",
    "groupTitle": "Players"
  },
  {
    "type": "post",
    "url": "/tags",
    "title": "Create tag",
    "name": "CreateTag",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name for tag</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "game",
            "description": "<p>Tag's game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hint",
            "description": "<p>Tag's hint</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "allowedValues": [
              "\"Bearer :token\""
            ],
            "optional": false,
            "field": "Authorization",
            "description": "<p>Replace <code>:token</code> with supplied JWT-token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP  /1.1 200 OK\n\t{\n\t\t\"t_id\": 1,\n\t\t\"t_game\": 1,\n\t\t\"t_shortcode\": \"HyKbkI5iz\",\n\t\t\"t_name\": \"Väinö\",\n\t\t\"t_hint\": \"Alla omenapuun, ei voi olla kukaan muu, siellä siellä se ___ on...\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/tagController.js",
    "groupTitle": "Tags"
  },
  {
    "type": "post",
    "url": "/tags/:shortcode",
    "title": "Get tag",
    "name": "GetTag",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shortcode",
            "description": "<p>Tag's shortcode</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP  /1.1 200 OK\n\t{\n\t\t\"tag\": \"Väinö\",\n\t\t\"tag_id\": 1,\n\t\t\"game\": \"Bileet\",\n\t\t\"game_id\": 5,\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/tagController.js",
    "groupTitle": "Tags"
  },
  {
    "type": "post",
    "url": "/tagsfound",
    "title": "Post found tag",
    "name": "PostTagsfound",
    "group": "Tags",
    "description": "<p>Try to post found tag, gives either error 304 of ducplicate entry or marks the tags as found or if player won the game status 303 is given</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tag",
            "description": "<p>Id of the tag</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "player",
            "description": "<p>Id of the player</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "game",
            "description": "<p>Id of the game</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP  /1.1 201 OK\n\t{\n\t\t\"status\": \"Hint updated\"\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "304 Duplicate entry": [
          {
            "group": "304 Duplicate entry",
            "optional": false,
            "field": "DuplicateEntry",
            "description": "<p>Duplicate entry</p>"
          }
        ],
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/tagController.js",
    "groupTitle": "Tags"
  },
  {
    "type": "get",
    "url": "/tags",
    "title": "Query tags",
    "name": "QueryTags",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "game",
            "description": "<p>Game's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/tags?game=4",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP  /1.1 200 OK\n [\n\t{\n\t\t\"t_id\": 1,\n\t\t\"t_game\": 1,\n\t\t\"t_shortcode\": \"HyKbkI5iz\",\n\t\t\"t_name\": \"Väinö\",\n\t\t\"t_hint\": \"Alla omenapuun, ei voi olla kukaan muu, siellä siellä se ___ on...\"\n\t},\n\t{\n\t\t\"t_id\": 5,\n\t\t\"t_game\": 1,\n\t\t\"t_shortcode\": \"xbbBB\",\n\t\t\"t_name\": \"Kahvi\",\n\t\t\"t_hint\": \"Elämän eliksiiri\"\n\t}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404 Document not found": [
          {
            "group": "404 Document not found",
            "optional": false,
            "field": "TagsNotFound",
            "description": "<p>No tags found</p>"
          }
        ],
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/tagController.js",
    "groupTitle": "Tags"
  },
  {
    "type": "get",
    "url": "/tagsfound",
    "title": "Query found tags",
    "name": "QueryTagsfound",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "game",
            "description": "<p>Id of the game</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "player",
            "description": "<p>Id of the player</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP  /1.1 200 OK\n\t{\n\t\t\"id\": 1,\n\t\t\"tag\": \"Väinö\",\n\t\t\"hint\": \"Maybe mysterious..\",\n\t\t\"game\": \"Bileet\",\n   \"player\": \"Mikko\",\n   \"found\": 2018-15-5\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 Invalid query": [
          {
            "group": "400 Invalid query",
            "optional": false,
            "field": "InvalidQueryError",
            "description": "<p>Invalid query parameter</p>"
          }
        ],
        "500 Internal server error": [
          {
            "group": "500 Internal server error",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>Problem fetching data from database.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/tagController.js",
    "groupTitle": "Tags"
  }
] });

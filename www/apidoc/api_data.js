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
          "content": "HTTP  /1.1 200 OK\n {\n   \"g_id\": 2,\n   \"g_user\": \"Player1\",\n   \"g_shortcode\": \"rygyB@5cG\"\n }",
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
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "game",
            "description": "<p>Game's unique id</p>"
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
          "content": "HTTP  /1.1 200 OK\n{\n  \"g_id\": 2,\n  \"g_user\": \"Player1\",\n  \"g_shortcode\": \"rygyB@5cG\"\n}",
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
        "400 Bad request": [
          {
            "group": "400 Bad request",
            "optional": false,
            "field": "MissingParameters",
            "description": "<p>Missing parameter <code>id</code> from request.</p>"
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
          "content": "HTTP  /1.1 200 OK\n{\n  \"g_id\": 2,\n  \"g_user\": \"Player1\",\n  \"g_shortcode\": \"rygyB@5cG\"\n}",
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
  }
] });

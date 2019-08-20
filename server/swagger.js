'use strict';
var config = require('./config/environment');

module.exports = {
	"swagger": "2.0",
	"info": {
		"version": "1.0.0",
		"title": "Node.js BrainCubate Application API - Swagger",
		"description": "Node.js BRAINCUBATE application for generating API documentation using swagger",
		"license": {
			"name": "MIT",
			"url": "https://opensource.org/licenses/MIT"
		}
	},
	"servers": {
		"url": config.baseUrl
	},
	"basePath": "/api",
	"schemes": [
		"http"
	],
	"consumes": [
		"application/json",
		"multipart/form-data"
	],
	"produces": [
		"application/json",
		"multipart/form-data"
	],
	"components": {
		"securitySchemes": {
			"BearerAuth": {
				"type": "http",
				"schema": "bearer",
				"bearerFormat": "JWT"
			},
			"basicAuth": {
				"type": "http",
				"scheme": "basic"
			}
		}
	},
	"securityDefinitions": {
		"Bearer": {
			"type": "apiKey",
			"name": "Authorization",
			"in": "header"
		},
		"basicAuth": {
			"type": "basic"
		}
	},

	"paths": {
		"/superadmin/create": {
			"post": {
				"tags": [
					"SuperAdmin"
				],
				"summary": "Create SuperAdmin    (Role:SuperAdmin)",
				"parameters": [{
					"name": "SuperAdmin",
					"in": "body",
					"description": "SuperAdmin that we want to create",
					"schema": {
						"$ref": "#/definitions/SuperAdmins"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "SuperAdmin created",
						"schema": {
							"properties": {

								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"properties": {
										"username": {
											"type": "string",
											"lowercase": "true",
											"unique": "true",
											"required": "true"
										},
										"_id": {
											"type": "ObjectId",
										},
										"email": {
											"type": "string",
											"lowercase": "true",
											"unique": "true",
											"required": "true"
										},
										"first_name": {
											"type": "string",
											"required": "true"
										},
										"last_name": {
											"type": "string"
										},
										"role": {
											"type": "integer",
											"default": "4"
										},
										"image_url": {
											"type": "string"
										},
										"hashed_password": {
											"type": "string",
											"required": "true"
										},
										"salt": {
											"type": "string",
											"required": "true"
										},
										"tokens": {
											"type": "array",
											"items": {
												"type": "object",
												"properties": {
													"clientId": {
														"type": "Schema.Types.ObjectId",
														'ref': 'AppClient'
													}
												}
											}
										},
										"refreshToken": {
											"type": "string"
										}
									},
									"deleted": {
										"type": "Boolean",
										"default": "false"
									}
								}
							}
						}
					},
					"500": {
						"description": "Internal Server Error"
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/superadmin/login": {
			"post": {
				"tags": [
					"SuperAdmin"
				],
				"summary": "SuperAdmin Login   (Role:SuperAdmin)",
				"parameters": [{
					"name": "SuperAdmin",
					"in": "body",
					"description": "SuperAdmin Login",
					"schema": {
						"$ref": "#/definitions/SuperAdminLogin"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "Login success",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"access_token": {
											"type": "string"
										},
										"expires_in": {
											"type": "number"
										},
										"token_type": {
											"type": "string"
										},
										"refresh_token": {
											"type": "string"
										},
									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				}
			}
		},
		"/superadmin/me": {
			"get": {
				"tags": [
					"SuperAdmin"
				],
				"summary": "Get SuperAdmin    (Role:SuperAdmin)",
				"responses": {
					"200": {
						"description": "SuperAdmin found",
						"schema": {
							"properties": {

								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"properties": {
										"username": {
											"type": "string",
											"lowercase": "true",
											"unique": "true",
											"required": "true"
										},
										"_id": {
											"type": "ObjectId",
										},
										"email": {
											"type": "string",
											"lowercase": "true",
											"unique": "true",
											"required": "true"
										},
										"first_name": {
											"type": "string",
											"required": "true"
										},
										"last_name": {
											"type": "string"
										},
										"role": {
											"type": "integer",
											"default": "4"
										},
										"image_url": {
											"type": "string"
										},
										"deleted": {
											"type": "Boolean",
											"default": "false"
										}
									}

								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/superadmin/refresh-token": {
			"post": {
				"tags": [
					"SuperAdmin"
				],
				"summary": "SuperAdmin RefreshToken      (Role:SuperAdmin)",
				"parameters": [{
					"name": "SuperAdmin",
					"in": "body",
					"description": "SuperAdmin RefreshToken",
					"schema": {
						"$ref": "#/definitions/SuperAdminRefreshToken"
					}
				}],
				"produces": [
					"application/json"
				],

				"responses": {
					"200": {
						"description": "RefreshToken",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"access_token": {
											"type": "string"
										},
										"expires_in": {
											"type": "number"
										},
										"token_type": {
											"type": "string"
										}
									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				}
			}
		},
		"/superadmin/logout": {
			"post": {
				"tags": [
					"SuperAdmin"
				],
				"summary": "SuperAdmin logout      (Role:SuperAdmin)",
				"parameters": [{
					"name": "SuperAdmin",
					"in": "body",
					"description": "SuperAdmin logout",
					"schema": {
						"$ref": "#/definitions/SuperAdminLogout"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "logout success",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/users": {
			"get": {
				"tags": [
					"User"
				],
				"parameters": [{
					"name": "name",
					"in": "query",
					"description": "name",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "email",
					"in": "query",
					"description": "email",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "provider",
					"in": "query",
					"description": "provider",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "status",
					"in": "query",
					"description": "status",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "from",
					"in": "query",
					"description": "yyyy-mm-dd",
				}, {
					"name": "to",
					"in": "query",
					"description": "yyyy-mm-dd",

				}, {
					"name": "age",
					"in": "query",
					"description": "age",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "level",
					"in": "query",
					"description": "level",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "country",
					"in": "query",
					"description": "country",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "current_game",
					"in": "query",
					"description": "current_game",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "overall_score",
					"in": "query",
					"description": "overall_score",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}, {
					"name": "sort",
					"in": "query"
				}, {
					"name": "orderBy",
					"in": "query",
					"enum": ['desc', 'asc']
				}, {
					"name": "offset",
					"in": "query",
				}, {
					"name": "limit",
					"in": "query"
				}],
				"summary": "Get users  (Role:SuperAdmin and users) ",
				"responses": {
					"200": {
						"description": "users is found",
						"schema": {
							"$ref": "#/definitions/GetUser"
						}
					},
					"500": {
						"description": "internal server error",
					}

				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			},
			"post": {
				"tags": [
					"User"
				],
				"summary": "Create new User  (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "users",
					"in": "body",
					"description": "User that we want to create",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}],
				"responses": {
					"201": {
						"description": "User created",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"_id": {
											"type": "ObjectId",
										},
										"name": {
											"type": "string"
										},
										"email": {
											"type": "string"
										},
										"age": {
											"type": "number"
										},
										"status": {
											"type": "string"
										},
										"profile_id": {
											"type": "string"
										},

										"devices": {
											"type": "array",
											"items": {
												"properties": {
													"device_type": {
														"type": "number"
													},
													"dev_token": {
														"type": "number"
													}
												}
											}
										},

										"connected_friends": {
											"type": "array",
											"items": {
												"type": "objectid"
											}
										},
										"otp": {
											"type": "string"
										},
										"otp_verified": {
											"type": "Boolean",
											"default": false
										},
										"otp_verified_token_generated": {
											"type": "date"
										},
										"email_verified": {
											"type": "Boolean",
											"default": false
										},
										"email_verified_token": {
											"type": "string"
										},
										"email_verified_token_generated": {
											"type": "date"
										},
										"achievements": {
											"type": "array",
											"items": {
												"type": "objectid"
											}
										}

									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				}
			}
		},
		"/users/{id}": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"get": {
				"tags": [
					"User"
				],
				"summary": "Get User with given ID (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "User is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"_id": {
											"type": "ObjectId",
										},
										"name": {
											"type": "string",
											"required": true,
											"index": true
										},
										"email": {
											"type": "string"
										},
										"age": {
											"type": "number",
											"required": true,
											"index": true
										},
										"gender": {
											"type": "string",
											"enum": ['M', 'F']
										},
										"provider": {
											"type": "string",
											"enum": ['OWN', 'FB', 'Google']
										},
										"level": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Level',
											"index": true
										},
										"current_game": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Game',
											"index": true
										},
										"connected_friends": {
											"type": "array",
											"items": {
												"type": "object",
												"properties": {
													"type": "Schema.Types.ObjectId",
													"ref": 'User'
												}
											}
										},
										'score': {
											"type": "object",
											"properties": {
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												}
											}
										}, // SubSchema
										"overall_score": {
											"type": "number"
										},
										"profile_id": {
											"type": "string"
										},
										"otp": {
											"type": "string"
										},
										"otp_verified": {
											"type": "Boolean",
											"default": false
										},
										"otp_verified_token_generated": {
											"type": "date"
										},
										"email_verified": {
											"type": "Boolean",
											"default": false
										},
										"email_verified_token": {
											"type": "string"
										},
										"email_verified_token_generated": {
											"type": "date"
										},
										"achievements": {
											"type": "array",
											"items": {
												"type": "object",
												"properties": {
													"type": "Schema.Types.ObjectId",
													"ref": 'Achievement'
												}
											}
										},
										"country": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Country',
											"index": true
										},
										"profile_pic": {
											"type": "string"
										},
										"status": {
											"type": 'string',
											"enum": ['Active', 'Locked'],
											"default": 'Active'
										},
										"devices": {
											"type": "array",
											"items": {
												"type": "object",
												"properties": {
													"device_type": {
														"type": "number" //1:"ANDROID", 2:"IOS" 
													},
													"dev_token": {
														"type": "string"
													}
												}
											}
										}


									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			},
			"put": {
				"summary": "Update User with give ID  (Role:SuperAdmin and users)",
				"tags": [
					"User"
				],
				"parameters": [{
					"name": "name",
					"in": "formData",
					"type": "string"
				}, {
					"name": "email",
					"in": "formData",
					"type": "string"
				}, {
					"name": "age",
					"in": "formData",
					"type": "string"
				}, {
					"name": "gender",
					"in": "formData",
					"type": "string",
					"enum": ['M', 'F']
				}, {
					"name": "provider",
					"in": "formData",
					"type": "string",
					"enum": ['OWN', 'FB', 'Google']
				}, {
					"name": "level",
					"in": "formData",
					"type": "objectid"
				}, {
					"name": "current_game",
					"in": "formData",
					"type": "objectid"
				}, {
					"name": "speed",
					"in": "formData",
					"type": "string",

				}, {
					"name": "memory",
					"in": "formData",
					"type": "string",
				}, {
					"name": "concentration",
					"in": "formData",
					"type": "string"
				}, {
					"name": "problem_solving",
					"in": "formData",
					"type": "string"
				}, {
					"name": "accuracy",
					"in": "formData",
					"type": "string"
				}, {
					"name": "visual",
					"in": "formData",
					"type": "string"
				}, {
					"name": "connected_friends",
					"in": "formData",
					"type": "objectid"
				}, {
					"name": "overall_score",
					"in": "formData",
					"type": "string"
				}, {
					"name": "achievements",
					"in": "formData",
					"type": "objectid"
				}, {
					"name": "country",
					"in": "formData",
					"type": "objectid"
				}, {
					"name": "device_type",
					"in": "formData",
					"type": "string"
				}, {
					"name": "profile",
					"in": "formData",
					"type": "file",
					"description": "User",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}],
				"responses": {
					"200": {
						"description": "User is updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"_id": {
											"type": "ObjectId"
										},
										"name": {
											"type": "string"
										},
										"email": {
											"type": "string"
										},
										"age": {
											"type": "number"
										},
										"status": {
											"type": "string"
										},
										"profile_id": {
											"type": "string"
										},
										"gender": {
											"type": "string",
											"enum": ['M', 'F']
										},
										"provider": {
											"type": "string",
											"enum": ['OWN', 'FB', 'Google']
										},
										"level": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Level',
											"index": true
										},
										"current_game": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Game',
											"index": true
										},
										"devices": {
											"type": "array",
											"items": {
												"properties": {
													"device_type": {
														"type": "number"
													},
													"dev_token": {
														"type": "number"
													}
												}
											}
										},

										"connected_friends": {
											"type": "array",
											"items": {
												"type": "objectid"
											}
										},
										'score': {
											"type": "object",
											"properties": {
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												}
											}
										}, // SubSchema
										"overall_score": {
											"type": "number"
										},
										"otp": {
											"type": "string"
										},
										"otp_verified": {
											"type": "Boolean",
											"default": false
										},
										"otp_verified_token_generated": {
											"type": "date"
										},
										"email_verified": {
											"type": "Boolean",
											"default": false
										},
										"email_verified_token": {
											"type": "string"
										},
										"email_verified_token_generated": {
											"type": "date"
										},
										"achievements": {
											"type": "array",
											"items": {
												"type": "objectid"
											}
										}

									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			},
			"delete": {
				"summary": "Delete user with given ID  (Role:SuperAdmin)",
				"tags": [
					"User"
				],
				"responses": {
					"200": {
						"description": "user is deleted",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}]
			}
		},
		"/users/all": {
			"get": {
				"tags": [
					"User"
				],
				"parameters": [{
					"name": "name",
					"in": "query",
					"description": "user",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}],
				"summary": "Get users (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "users is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									// "properties": {
									"type": "array",
									"items": {
										"properties": {
											"_id": {
												"type": "objectid"
											},
											"name": {
												"type": "string"
											}
										}
									}

									// }

								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			}
		},
		"/users/check-available": {
			"post": {
				"tags": [
					"User"
				],
				"summary": "check-available (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "users",
					"in": "body",
					"description": "User that we want to check",
					"schema": {
						"$ref": "#/definitions/User"
					}
				}],
				"responses": {
					"200": {
						"description": "ok",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			}
		},
		"/users/update-status": {
			"put": {
				"tags": [
					"User"
				],
				"summary": "SuperAdmin update-user-status (Role:SuperAdmin)",
				"parameters": [{
					"name": "SuperAdmin",
					"in": "body",
					"description": "SuperAdmin UpdateUserStaus",
					"schema": {
						"$ref": "#/definitions/UserStatus"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "updated success",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/users/connect-friend": {
			"put": {
				"tags": [
					"User"
				],
				"summary": "UserConnect-Friends (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "user",
					"in": "body",
					"description": "ConnectedFriends",
					"schema": {
						"$ref": "#/definitions/UserConnection"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "updated success",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/users/{id}/connect-friend": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"put": {
				"tags": [
					"User"
				],
				"summary": "UserConnect-Friends (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "user",
					"in": "body",
					"description": "ConnectedFriends",
					"schema": {
						"$ref": "#/definitions/AcceptReject"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "updated success",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/users/{id}/device-register": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"put": {
				"summary": "update devices with give ID  (Role:SuperAdmin and users)",
				"tags": [
					"User"
				],
				"parameters": [{
					"name": "users",
					"in": "body",
					"description": "update User devices  1:ANDROID, 2:IOS",
					"schema": {
						"$ref": "#/definitions/UpdateDevice"
					}
				}],
				"responses": {
					"200": {
						"description": "ok",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/users/send-otp": {
			"post": {
				"tags": [
					"User"
				],
				"summary": "Send OTP (Role:user)",
				"parameters": [{
					"name": "User",
					"in": "body",
					"description": "send-otp to users",
					"schema": {
						"$ref": "#/definitions/SendOtp"
					}
				}],
				"responses": {
					"201": {
						"description": "email send",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"404": {
						"description": "email not found"
					}
				},
				"security": [{
					"basicAuth": []
				}],
			}
		},
		"/users/resend-otp": {
			"post": {
				"tags": [
					"User"
				],
				"summary": "ReSend OTP (Role:user)",
				"parameters": [{
					"name": "User",
					"in": "body",
					"description": "send-otp to users",
					"schema": {
						"$ref": "#/definitions/ResendOtp"
					}
				}],
				"responses": {
					"201": {
						"description": "email send",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"404": {
						"description": "user not found"
					}
				},
				"security": [{
					"basicAuth": []
				}],
			}
		},
		"/users/verify-otp": {
			"post": {
				"tags": [
					"User"
				],
				"summary": "verify-otp (Role:user)",
				"parameters": [{
					"name": "User",
					"in": "body",
					"description": "verify-otp to users",
					"schema": {
						"$ref": "#/definitions/VerifyOtp"
					}
				}],
				"responses": {
					"201": {
						"description": "User is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"name": {
											"type": "string",
											"required": true,
											"index": true
										},
										"email": {
											"type": "string"
										},
										"age": {
											"type": "number",
											"required": true,
											"index": true
										},
										"gender": {
											"type": "string",
											"enum": ['M', 'F']
										},
										"provider": {
											"type": "string",
											"enum": ['OWN', 'FB', 'Google']
										},
										"level": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Level',
											"index": true
										},
										"current_game": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Game',
											"index": true
										},
										"connected_friends": {
											"type": "array",
											"items": {
												"type": "object",
												"properties": {
													"type": "Schema.Types.ObjectId",
													"ref": 'User'
												}
											}
										},
										'score': {
											"type": "object",
											"properties": {
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												}
											}
										}, // SubSchema
										"overall_score": {
											"type": "number"
										},
										"achievements": {
											"type": "array",
											"items": {
												"type": "object",
												"properties": {
													"type": "Schema.Types.ObjectId",
													"ref": 'Achievement'
												}
											}
										},
										"country": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Country',
											"index": true
										},
										"profile_pic": {
											"type": "string"
										},
										"profile_id": {
											"type": "string"
										},
										"otp": {
											"type": "string"
										},
										"otp_verified": {
											"type": "Boolean",
											"default": false
										},
										"otp_verified_token_generated": {
											"type": "date"
										},
										"email_verified": {
											"type": "Boolean",
											"default": false
										},
										"email_verified_token": {
											"type": "string"
										},
										"email_verified_token_generated": {
											"type": "date"
										},
										"status": {
											"type": 'string',
											"enum": ['Active', 'Locked'],
											"default": 'Active'
										},
										"devices": {
											"type": "array",
											"items": {
												"type": "object",
												"properties": {
													"device_type": {
														"type": "number" //1:"ANDROID", 2:"IOS" 
													},
													"dev_token": {
														"type": "string"
													}
												}
											}
										}


									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"404": {
						"description": "user not found"
					},
					"404": {
						"description": "OTP MISSMATCH"
					}
				},
				"security": [{
					"basicAuth": []
				}],
			}
		},
		"/usergames": {
			"get": {
				"tags": [
					"UserGames"
				],
				"parameters": [{
					"name": "type",
					"in": "query",
					"description": "type",

				}, {
					"name": "user",
					"in": "query",
					"description": "user",

				}, {
					"name": "game",
					"in": "query",
					"description": "game",

				}, {
					"name": "level",
					"in": "query",
					"description": "level",

				}, {
					"name": "offset",
					"in": "query",
				}, {
					"name": "limit",
					"in": "query"
				}],
				"summary": "Get UserGames (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "UserGames is found",
						"schema": {
							"$ref": "#/definitions/GetUserGames"
						}
					},

					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			},
			"post": {
				"tags": [
					"UserGames"
				],
				"summary": "Create new UserGames (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "UserGames",
					"in": "body",
					"description": "UserGames that we want to create",
					"schema": {
						"$ref": "#/definitions/Usergames"
					}
				}],
				"responses": {
					"201": {
						"description": "UserGames created",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"challenge": {
											"type": "object",
											"properties": {
												"suggested_games": {
													"type": "array",
													"items": {
														"type": "ObjectId"
													}
												},
												"_id": {
													"type": "ObjectId",
												},
												"type": {
													"type": "string"
												},
												"code": {
													"type": "number"
												},
												"opponent": {
													"type": "ObjectId"
												},
												"rounds": {
													"type": "array",
													"items": {
														"type": "object",
														"properties": {
															"_id": {
																"type": "ObjectId"
															},
															"game": {
																"type": "ObjectId"
															},
															"user": {
																"type": "ObjectId"
															},
															"score": {
																"type": "object",
																"properties": {
																	"_id": {
																		"type": "ObjectId",
																	},
																	"speed": {
																		"type": "number"
																	},
																	"memory": {
																		"type": "number"
																	},
																	"concentration": {
																		"type": "number"
																	},
																	"problem_solving": {
																		"type": "number"
																	},
																	"accuracy": {
																		"type": "number"
																	},
																	"visual": {
																		"type": "number"
																	},
																	"correct": {
																		"type": "number"
																	},
																	"incorrect": {
																		"type": "number"
																	},
																	"score": {
																		"type": "number"
																	},
																}
															}
														}
													}
												}
											}
										},
										"name": {
											"type": "string"
										},
										"score": {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},
												"correct": {
													"type": "number"
												},
												"incorrect": {
													"type": "number"
												},
												"score": {
													"type": "number"
												},
											}

										},
										"overall_score": {
											"type": "number"
										},
										"user": {
											"type": "ObjectId"
										},

										"game": {
											"type": "ObjectId",

										},
										"level": {
											"type": "ObjectId",

										}


									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			}
		},
		"/usergames/{id}": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"get": {
				"tags": [
					"UserGames"
				],
				"summary": "Get UserGames with given ID  (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "UserGames is found",
						"schema": {

							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"_id": {
											"type": "ObjectId",
										},
										"user": {
											"type": "Schema.Types.ObjectId",
											"ref": 'User',
											"index": true
										},
										"game": {
											"type": " Schema.Types.ObjectId",
											"ref": 'Game',
											"index": true
										},
										"level": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Level'
										},
										'score': {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},
												"correct": {
													"type": "number",
													"default": 0
												},
												"incorrect": {
													"type": "number",
													"default": 0
												},
												"score": {
													"type": "number",
													"default": 0
												}
											}
										},
										"overall_score": {
											'type': "number"
										},
										"type": {
											"type": "string",
											"enum": ['Individual', 'Challenge'],
											"index": true
										},
										"challenge": {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"type": {
													"type": "string",
													"enum": ['Friend', 'Manual', 'Automatic']
												},
												"code": {
													"type": "string",
													"index": true
												},
												"suggested_games": {
													"type": " Schema.Types.ObjectId",
													"ref": 'Game'
												},
												"opponent": {
													"type": "Schema.Types.ObjectId",
													"ref": 'User'
												},

												"rounds": {
													"type": "array",
													"items": {
														"type": "object",
														"properties": {
															"_id": {
																"type": "ObjectId",
															},
															"round_no": {
																"type": "number"
															},
															"round_winner": {
																"type": "Schema.Types.ObjectId",
																"ref": 'User',
																"index": true
															},
															"game": {
																"type": " Schema.Types.ObjectId",
																"ref": 'Game',
																"index": true
															},
															"suggested_games": {
																"type": " Schema.Types.ObjectId",
																"ref": 'Game',
																"index": true
															},
															'score': {
																"type": "object",
																"properties": {
																	"_id": {
																		"type": "ObjectId",
																	},
																	"speed": {
																		"type": "number"
																	},
																	"memory": {
																		"type": "number"
																	},
																	"concentration": {
																		"type": "number"
																	},
																	"problem_solving": {
																		"type": "number"
																	},
																	"accuracy": {
																		"type": "number"
																	},
																	"visual": {
																		"type": "number"
																	},
																	"correct": {
																		"type": "number",
																		"default": 0
																	},
																	"incorrect": {
																		"type": "number",
																		"default": 0
																	},
																	"score": {
																		"type": "number",
																		"default": 0
																	}
																}
															}, // SubSchema
														}
													}
												}
											}

										}
									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]

			},
			"put": {
				"summary": "update usergames with give ID  (Role:SuperAdmin and users)",
				"tags": [
					"UserGames"
				],
				"parameters": [{
					"name": "UserGames",
					"in": "body",
					"description": "update UserGames",
					"schema": {
						"$ref": "#/definitions/Usergames"
					}
				}],
				"responses": {
					"200": {
						"description": "UserGames updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"challenge": {
											"type": "object",
											"properties": {
												"suggested_games": {
													"type": "array",
													"items": {
														"type": "ObjectId"
													}
												},
												"type": {
													"type": "string"
												},
												"code": {
													"type": "number"
												},
												"opponent": {
													"type": "ObjectId"
												},
												"rounds": {
													"type": "array",
													"items": {
														"type": "object",
														"properties": {
															"_id": {
																"type": "ObjectId"
															},
															"game": {
																"type": "ObjectId"
															},
															"user": {
																"type": "ObjectId"
															},
															"score": {
																"type": "object",
																"properties": {
																	"_id": {
																		"type": "ObjectId",
																	},
																	"speed": {
																		"type": "number"
																	},
																	"memory": {
																		"type": "number"
																	},
																	"concentration": {
																		"type": "number"
																	},
																	"problem_solving": {
																		"type": "number"
																	},
																	"accuracy": {
																		"type": "number"
																	},
																	"visual": {
																		"type": "number"
																	},
																	"correct": {
																		"type": "number"
																	},
																	"incorrect": {
																		"type": "number"
																	},
																	"score": {
																		"type": "number"
																	},
																}
															}
														}
													}
												}
											}
										},
										"name": {
											"type": "string"
										},
										"_id": {
											"type": "ObjectId",
										},
										"score": {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},
												"correct": {
													"type": "number"
												},
												"incorrect": {
													"type": "number"
												},
												"score": {
													"type": "number"
												},
											}

										},
										"overall_score": {
											"type": "number"
										},
										"user": {
											"type": "ObjectId"
										},

										"game": {
											"type": "ObjectId",

										},
										"level": {
											"type": "ObjectId",

										}


									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			},
			"delete": {
				"summary": "Delete usergames with given ID (Role:SuperAdmin)",
				"tags": [
					"UserGames"
				],
				"responses": {
					"200": {
						"description": "UserGames is deleted",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}]
			}
		},
		"/usergames/{id}/challenge-game": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
			}],
			"put": {
				"summary": "update rounds given usergames ID(Role:SuperAdmin and users)",
				"tags": [
					"UserGames"
				],
				"parameters": [{
					"name": "UserGames",
					"in": "body",
					"description": "update UserGames rounds",
					"schema": {
						"$ref": "#/definitions/PutUserGames"
					}
				}],
				"responses": {
					"200": {
						"description": "UserGames is rounds updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/usergames/{id}/check-code": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
			}],
			"get": {

				"summary": "check-code given usergames ID  (Role:SuperAdmin and users)",
				"tags": [
					"UserGames"
				],
				"parameters": [{
					"name": "code",
					"in": "query",
					"description": "code",

				}, {
					"name": "opponent",
					"in": "query",
					"description": "opponent",
				}],
				"responses": {
					"200": {
						"description": "check user-code",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/levels": {
			"get": {
				"tags": [
					"Level"
				],
				"parameters": [{
					"name": "name",
					"in": "query",
					"description": "levels",
					"schema": {
						"$ref": "#/definitions/Level"
					}
				}, {
					"name": "offset",
					"in": "query",
				}, {
					"name": "limit",
					"in": "query"
				}],
				"summary": "Get all Level (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Level is found",
						"schema": {
							"$ref": "#/definitions/GetLevel"
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			},
			"post": {
				"tags": [
					"Level"
				],
				"summary": "Create new Level (Role:SuperAdmin)",
				"parameters": [{
					"name": "name",
					"in": "formData",
					"type": "string",

				}, {
					"name": "color_code",
					"in": "formData",
					"type": "string",

				}, {
					"name": "speed",
					"in": "formData",
					"type": "string",

				}, {
					"name": "memory",
					"in": "formData",
					"type": "string",
				}, {
					"name": "concentration",
					"in": "formData",
					"type": "string"
				}, {
					"name": "problem_solving",
					"in": "formData",
					"type": "string"
				}, {
					"name": "accuracy",
					"in": "formData",
					"type": "string"
				}, {
					"name": "visual",
					"in": "formData",
					"type": "string"
				}, {
					"name": "characteristics",
					"in": "formData",
					"type": "string",
					"description":"[string,string]"
				}, {
					"name": "icon",
					"in": "formData",
					"type": "file",
					"description": "Level",
					"schema": {
						"$ref": "#/definitions/Level"
					}
				}, {
					"name": "bg_img",
					"in": "formData",
					"type": "file",
					"description": "Level",
					"schema": {
						"$ref": "#/definitions/Level"
					}
				}],
				"produces": [
					"application/json",
					"multipart/form-data"
				],
				"responses": {
					"201": {
						"description": "Level created",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"name": {
											"type": "string"
										},
										"_id": {
											"type": "ObjectId",
										},
										"color_code": {
											"type": "string"
										},
										"required_score": {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},
												"correct": {
													"type": "number"
												},
												"incorrect": {
													"type": "number"
												},
												"score": {
													"type": "number"
												},
											}

										},
										"icon": {
											"type": "string"
										},
										"bg_img": {
											"type": "string"
										},

										"characteristics": {
											"type": "array",
											"items": {
												"type": "string"
											}
										}

									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/levels/{id}": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"get": {
				"tags": [
					"Level"
				],
				"summary": "Get Level with given ID (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Level is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"_id": {
											"type": "ObjectId",
										},
										"name": {
											"type": "string",
											"required": true,
											"index": true
										},
										"icon": {
											"type": "string"
										},
										"color_code": {
											"type": "string"
										},

										"required_score": {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},

											}
										},
										"characteristics": {
											"type": "array",
											"items": {

												"type": "string"

											}
										},
										"bg_img": {
											"type": "string"
										}
									}
								}


							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]

			},
			"put": {
				"summary": "update Level with give ID (Role:SuperAdmin)",
				"tags": [
					"Level"
				],
				"parameters": [{
					"name": "name",
					"in": "formData",
					"type": "string",

				}, {
					"name": "color_code",
					"in": "formData",
					"type": "string",

				}, {
					"name": "speed",
					"in": "formData",
					"type": "string",

				}, {
					"name": "memory",
					"in": "formData",
					"type": "string",

				}, {
					"name": "concentration",
					"in": "formData",
					"type": "string"
				}, {
					"name": "problem_solving",
					"in": "formData",
					"type": "string"
				}, {
					"name": "accuracy",
					"in": "formData",
					"type": "string"
				}, {
					"name": "visual",
					"in": "formData",
					"type": "string"
				}, {
					"name": "characteristics",
					"in": "formData",
					"type": "string",
					"description":"[string,string]"
				}, {
					"name": "icon",
					"in": "formData",
					"type": "file",
					"description": "Level",
					"schema": {
						"$ref": "#/definitions/Level"
					}
				}, {
					"name": "bg_img",
					"in": "formData",
					"type": "file",
					"description": "Level",
					"schema": {
						"$ref": "#/definitions/Level"
					}
				}],
				"responses": {
					"200": {
						"description": "Level updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"name": {
											"type": "string"
										},
										"_id": {
											"type": "ObjectId",
										},
										"color_code": {
											"type": "string"
										},
										"required_score": {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},
												"correct": {
													"type": "number"
												},
												"incorrect": {
													"type": "number"
												},
												"score": {
													"type": "number"
												},
											}

										},
										"icon": {
											"type": "string"
										},
										"bg_img": {
											"type": "string"
										},

										"characteristics": {
											"type": "array",
											"items": {
												"type": "string"
											}
										}

									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			},
			"delete": {
				"summary": "Delete Level with given ID  (Role:SuperAdmin and users)",
				"tags": [
					"Level"
				],
				"responses": {
					"200": {
						"description": "Level is deleted",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}]
			}
		},
		"/levels/all": {
			"get": {
				"tags": [
					"Level"
				],
				"parameters": [{
					"name": "name",
					"in": "query",
					"description": "levels",
					"schema": {
						"$ref": "#/definitions/Level"
					}
				}],
				"summary": "Get Level (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Level is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									// "properties": {
									"type": "array",
									"items": {
										"properties": {
											"_id": {
												"type": "objectid"
											},
											"name": {
												"type": "string"
											}
										}
									}

									// }

								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/levels/check-available": {
			"post": {
				"tags": [
					"Level"
				],
				"summary": "check-available (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "Level",
					"in": "body",
					"description": "Level that we want to check",
					"schema": {
						"$ref": "#/definitions/Level"
					}
				}],
				"responses": {
					"200": {
						"description": "ok",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			}
		},
		"/games": {
			"post": {
				"tags": [
					"Games"
				],
				"summary": "Games   (Role:SuperAdmin)",
				"parameters": [{
					"name": "name",
					"in": "formData",
					"type": "string",
				}, {
					"name": "desc",
					"in": "formData",
					"type": "string",
				}, {
					"name": "level",
					"in": "formData",
					"type": "string",
				}, {
					"name": "level_position",
					"in": "formData",
					"type": "string",
				}, {
					"name": "speed",
					"in": "formData",
					"type": "string",

				}, {
					"name": "memory",
					"in": "formData",
					"type": "string",

				}, {
					"name": "concentration",
					"in": "formData",
					"type": "string"
				}, {
					"name": "problem_solving",
					"in": "formData",
					"type": "string"
				}, {
					"name": "accuracy",
					"in": "formData",
					"type": "string"
				}, {
					"name": "visual",
					"in": "formData",
					"type": "string"
				}, {
					"name": "game_time_in_sec",
					"in": "formData",
					"type": "string"
				}, {
					"name": "question_time_in_sec",
					"in": "formData",
					"type": "string"
				}, {
					"name": "inst_desc[0]",
					"in": "formData",
					"type": "string",
				}, {
					"name": "instruction_1",
					"in": "formData",
					"type": "file",
					"description": "Game",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}, {
					"name": "icon",
					"in": "formData",
					"type": "file",
					"description": "Game",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}, {
					"name": "bg_img",
					"in": "formData",
					"type": "file",
					"description": "Game",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "Games",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"name": {
											"type": "string"
										},
										"_id": {
											"type": "ObjectId",
										},
										"score": {
											"type": "object",
											// "items": {
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},
												"correct": {
													"type": "number"
												},
												"incorrect": {
													"type": "number"
												},
												"score": {
													"type": "number"
												},
											}
											// }
										},
										"level_position": {
											"type": "number"
										},
										"game_time_in_sec": {
											"type": "number"
										},
										"question_time_in_sec": {
											"type": "number"
										},
										"desc": {
											"type": "string"
										},
										"level": {
											"type": "objectid"
										},
										"instructions": {
											"type": "array",
											"items": {
												"properties": {
													"_id": {
														"type": "ObjectId",
													},
													"icon": {
														"type": "string",

													},
													"desc": {
														"type": "string"
													}
												}
											}
										}

									}
								}
							}
						}

					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			},
			"get": {
				"summary": "Get Games  (Role:SuperAdmin and users)",
				"tags": [
					"Games"
				],
				"parameters": [{
					"name": "name",
					"in": "query",
					"description": "name",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}, {
					"name": "level",
					"in": "query",
					"description": "level",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}, {
					"name": "level_position",
					"in": "query",
					"description": "level_position",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}, {
					"name": "difficulty",
					"in": "query",
					"description": "difficulty",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}, {
					"name": "offset",
					"in": "query",
				}, {
					"name": "limit",
					"in": "query"
				}],
				"responses": {
					"200": {
						"description": "Games",
						"schema": {
							"$ref": "#/definitions/GetGame"
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]

			}
		},
		"/games/{id}": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"get": {
				"tags": [
					"Games"
				],
				"summary": "Get Games with given ID (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Games is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {


									"properties": {
										"name": {
											"type": "string",
											"required": true,
											"index": true
										},
										"_id": {
											"type": "ObjectId",
										},
										"icon": {
											"type": "string"
										},
										"desc": {
											"type": "string"
										},
										"level": {
											"type": "Schema.Types.ObjectId",
											"ref": 'Level',
											"index": true
										},
										"level_position": {
											"type": "number"
										},
										"bg_img": {
											"type": "string"
										},
										"instructions": {
											"type": "array",
											"items": {
												"type": "object",
												"properties": {
													"_id": {
														"type": "ObjectId",
													},
													"icon": {
														"type": 'string'
													},
													"desc": {
														"type": "string"
													}
												}
											}
										},
										"difficulty": {
											"type": "string",
											"enum": ['Easy', 'Medium', 'Hard']
										},
										'score': {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												}
											}
										}, // SubSchema
										"game_time_in_sec": {
											"type": "number",
											"required": true
										},
										"question_time_in_sec": {
											"type": "number"
										}
									}



								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]

			},
			"put": {
				"summary": "update Games with give ID   (Role:SuperAdmin)",
				"tags": [
					"Games"
				],
				"parameters": [{
					"name": "name",
					"in": "formData",
					"type": "string",
				}, {
					"name": "desc",
					"in": "formData",
					"type": "string",
				}, {
					"name": "level",
					"in": "formData",
					"type": "string",
				}, {
					"name": "level_position",
					"in": "formData",
					"type": "string",
				}, {
					"name": "speed",
					"in": "formData",
					"type": "string",

				}, {
					"name": "memory",
					"in": "formData",
					"type": "string",

				}, {
					"name": "concentration",
					"in": "formData",
					"type": "string"
				}, {
					"name": "problem_solving",
					"in": "formData",
					"type": "string"
				}, {
					"name": "accuracy",
					"in": "formData",
					"type": "string"
				}, {
					"name": "visual",
					"in": "formData",
					"type": "string"
				}, {
					"name": "game_time_in_sec",
					"in": "formData",
					"type": "string"
				}, {
					"name": "question_time_in_sec",
					"in": "formData",
					"type": "string"
				}, {
					"name": "inst_desc[0]",
					"in": "formData",
					"type": "string",
				}, {
					"name": "instruction_1",
					"in": "formData",
					"type": "file",
					"description": "Game",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}, {
					"name": "icon",
					"in": "formData",
					"type": "file",
					"description": "Game",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}, {
					"name": "bg_img",
					"in": "formData",
					"type": "file",
					"description": "Game",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}],
				"responses": {
					"200": {
						"description": "Games updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"name": {
											"type": "string"
										},
										"_id": {
											"type": "objectid"
										},
										"score": {
											"type": "object",
											// "items": {
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},
												"correct": {
													"type": "number"
												},
												"incorrect": {
													"type": "number"
												},
												"score": {
													"type": "number"
												},
											}
											// }
										},
										"level_position": {
											"type": "number"
										},
										"game_time_in_sec": {
											"type": "number"
										},
										"question_time_in_sec": {
											"type": "number"
										},
										"desc": {
											"type": "string"
										},
										"level": {
											"type": "objectid"
										},
										"instructions": {
											"type": "array",
											"items": {
												"properties": {
													"_id": {
														"type": "ObjectId",
													},
													"icon": {
														"type": "string",

													},
													"desc": {
														"type": "string"
													}
												}
											}
										}

									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			},
			"delete": {
				"summary": "Delete Game with given ID (Role:SuperAdmin)",
				"tags": [
					"Games"
				],
				"responses": {
					"200": {
						"description": "Game is deleted",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}]
			}
		},
		"/games/all": {
			"get": {
				"tags": [
					"Games"
				],
				"parameters": [{
					"name": "name",
					"in": "query",
					"description": "Games",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}],
				"summary": "Get Games (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Games is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									// "properties": {
									"type": "array",
									"items": {
										"properties": {
											"_id": {
												"type": "objectid"
											},
											"name": {
												"type": "string"
											}
										}
									}

									// }

								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/games/check-available": {
			"post": {
				"tags": [
					"Games"
				],
				"summary": "check-available (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "Games",
					"in": "body",
					"description": "Games that we want to check",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}],
				"responses": {
					"200": {
						"description": "ok",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/games/{id}/instruction/{instid}": {
			"delete": {
				"tags": [
					"Games"
				],
				"parameters": [{
					"name": "id",
					"in": "path",
					"description": "gameId",
					"required": false,
					"type": "string"
				}, {
					"name": "instid",
					"in": "path",
					"description": "instructionId",
					"required": false,
					"type": "string"
				}],
				"summary": "Delete icons with given ID  (Role:SuperAdmin)",

				"responses": {
					"200": {
						"description": "post is deleted",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/games/{id}/instruction": {
			"put": {
				"tags": [
					"Games"
				],
				"summary": "(Role:SuperAdmin)",
				"parameters": [{
					"name": "id",
					"in": "path",
					"description": "objectid",
					"required": false,
					"type": "string"
				}, {
					"name": "inst_desc",
					"in": "formData",
					"type": "string",
				}, {
					"name": "inst_icon",
					"in": "formData",
					"type": "file",
					"description": "Game",
					"schema": {
						"$ref": "#/definitions/Game"
					}
				}],
				"responses": {
					"200": {
						"description": "instruction is updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"name": {
											"type": "string"
										},
										"_id": {
											"type": "objectid"
										},
										"score": {
											"type": "object",
											// "items": {
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"speed": {
													"type": "number"
												},
												"memory": {
													"type": "number"
												},
												"concentration": {
													"type": "number"
												},
												"problem_solving": {
													"type": "number"
												},
												"accuracy": {
													"type": "number"
												},
												"visual": {
													"type": "number"
												},
												"correct": {
													"type": "number"
												},
												"incorrect": {
													"type": "number"
												},
												"score": {
													"type": "number"
												},
											}
											// }
										},
										"level_position": {
											"type": "number"
										},
										"game_time_in_sec": {
											"type": "number"
										},
										"question_time_in_sec": {
											"type": "number"
										},
										"desc": {
											"type": "string"
										},
										"level": {
											"type": "objectid"
										},
										"instruction": {
											"type": "array",
											"items": {
												"properties": {
													"_id": {
														"type": "ObjectId"
													},
													"icon": {
														"type": "string",

													},
													"desc": {
														"type": "string"
													}
												}
											}
										}

									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/announcements": {
			"get": {
				"tags": [
					"Announcements"
				],
				"parameters": [{
					"name": "title",
					"in": "query",
					"description": "TITLE",
					"schema": {
						"$ref": "#/definitions/Announcement"
					}
				}, {
					"name": "type",
					"in": "query",
					"description": "TYPE",

				}, {
					"name": "status",
					"in": "query",
					"description": "STATUS",
					"schema": {
						"$ref": "#/definitions/Announcement"
					}
				}, {
					"name": "offset",
					"in": "query",
				}, {
					"name": "limit",
					"in": "query"
				}],
				"summary": "Get Announcements (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Announcements is found",
						"schema": {
							"$ref": "#/definitions/GetAnnouncement"
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			},
			"post": {
				"tags": [
					"Announcements"
				],
				"summary": "Create new Announcements  (Role:SuperAdmin)",
				"parameters": [{
					"name": "title",
					"in": "formData",
					"type": "string"
				}, {
					"name": "desc",
					"in": "formData",
					"type": "string",

				}, {
					"name": "type",
					"in": "formData",
					"type": "string",
					"enum": ['INFO', 'ACHIEVEMENT']

				}, {
					"name": "icon",
					"in": "formData",
					"type": "file",
					"description": "Announcement",
					"schema": {
						"$ref": "#/definitions/Announcement"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "Announcements created",
						"schema": {

							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "number"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"_id": {
											"type": "ObjectId",
										},
										"title": {
											"type": "string"
										},
										"status": {
											"type": "number"
										},
										"type": {
											"type": "number"
										},
										"desc": {
											"type": "string"
										},
										"icon": {
											"type": "string"
										}
									}

								}
							}

						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/announcements/{id}": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"get": {
				"tags": [
					"Announcements"
				],
				"summary": "Get Announcements (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Announcements is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {
									"properties": {

										"title": {
											"type": "string",
											"required": true,
											"index": true
										},
										"_id": {
											"type": "ObjectId",
										},
										"icon": {
											"type": "string"
										},
										"desc": {
											"type": "string"
										},
										"status": {
											"type": "number"
										},
										"type": {
											"type": "string",
											"enum": ['INFO', 'ACHIEVEMENT']
										}



									}
								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			},
			"put": {
				"summary": "Update Announcements with give ID",
				"tags": [
					"Announcements"
				],
				"parameters": [{
					"name": "title",
					"in": "formData",
					"type": "string"
				}, {
					"name": "desc",
					"in": "formData",
					"type": "string",

				}, {
					"name": "type",
					"in": "formData",
					"type": "string",
					"enum": ['INFO', 'ACHIEVEMENT']

				}, {
					"name": "icon",
					"in": "formData",
					"type": "file",
					"description": "Announcement",
					"schema": {
						"$ref": "#/definitions/Announcement"
					}
				}],
				"responses": {
					"200": {
						"description": "updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "number"
										},
									}
								},
								"response": {
									"properties": {
										"status": {
											"type": "number"
										},
										"deleted": {
											"type": "Boolean"
										},
										"_id": {
											"type": "objectid"
										},
										"title": {
											"type": "string"
										},
										"desc": {
											"type": "string"
										},
										"type": {
											"type": "string"
										},
										"icon": {
											"type": "string"
										}
									}

								}
							}
						},
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			},
			"delete": {
				"summary": "Delete Announcement with given ID",
				"tags": [
					"Announcements"
				],
				"responses": {
					"200": {
						"description": "Announcement is deleted",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}]
			}
		},
		"/announcements/{id}/send": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"put": {
				"summary": "send Announcements with give ID (Role:SuperAdmin)",
				"tags": [
					"Announcements"
				],
				"responses": {
					"200": {
						"description": "Announcements is send",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/announcements/check-available": {
			"post": {
				"tags": [
					"Announcements"
				],
				"summary": "check-available (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "Announcements",
					"in": "body",
					"description": "Announcements that we want to check",
					"schema": {
						"$ref": "#/definitions/Announcement"
					}
				}],
				"responses": {
					"200": {
						"description": "ok",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			}
		},
		"/achievements": {
			"get": {
				"tags": [
					"Achievements"
				],
				"parameters": [{
					"name": "name",
					"in": "query",
					"description": "Achievements",
					"schema": {
						"$ref": "#/definitions/Achievement"
					}
				}, {
					"name": "offset",
					"in": "query",
				}, {
					"name": "limit",
					"in": "query"
				}],
				"summary": "get Achievements (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Achievements is found",
						"schema": {
							"$ref": "#/definitions/GetAchievement"
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			},
			"post": {
				"tags": [
					"Achievements"
				],
				"summary": "Create new Achievements in system (Role:SuperAdmin)",
				"parameters": [{
					"name": "name",
					"in": "formData",
					"type": "string"
				}, {
					"name": "desc",
					"in": "formData",
					"type": "string"
				}, {
					"name": "type",
					"in": "formData",
					"type": "number",
					"description": "1: Bronze, 2: Silver, 3: Gold, 4: Platinum, 5: Diamond"
				}, {
					"name": "icon",
					"in": "formData",
					"type": "file",
					"description": "Achievement",
					"schema": {
						"$ref": "#/definitions/Achievement"
					}
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"description": "Achievements created",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "number"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"_id": {
											"type": "ObjectId",
										},
										"name": {
											"type": "string"
										},
										"desc": {
											"type": "string"
										},
										"icon": {
											"type": "string"
										}
									}

								}
							}

						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/achievements/{id}": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"get": {
				"tags": [
					"Achievements"
				],
				"parameters": [{
					"name": "Achievements",
					"in": "query",
					"description": "objectid",
					"required": false,
					"type": "string"
				}],
				"summary": "get Achievements (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Achievements is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {

									"properties": {
										"name": {
											"type": "string",
											"required": true,
											"index": true
										},
										"_id": {
											"type": "ObjectId",
										},
										"icon": {
											"type": "string"
										},
										"desc": {
											"type": "string"
										},
										"type": {
											"type": "number"
										}
									}



								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			},
			"put": {
				"summary": "Update Achievements with give ID (Role:SuperAdmin)",
				"tags": [
					"Achievements"
				],
				"parameters": [{
					"name": "name",
					"in": "formData",
					"type": "string"
				}, {
					"name": "desc",
					"in": "formData",
					"type": "string"
				}, {
					"name": "type",
					"in": "formData",
					"type": "number",
					"description": "1: Bronze, 2: Silver, 3: Gold, 4: Platinum, 5: Diamond"
				}, {
					"name": "icon",
					"in": "formData",
					"type": "file",
					"description": "Achievement",
					"schema": {
						"$ref": "#/definitions/Achievement"
					}
				}],
				"responses": {
					"200": {
						"description": "Achievements is updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "number"
										},
									}
								},
								"response": {
									"properties": {
										"deleted": {
											"type": "Boolean"
										},
										"name": {
											"type": "string"
										},
										"_id": {
											"type": "objectid"
										},
										"desc": {
											"type": "string"
										},
										"icon": {
											"type": "string"
										}
									}

								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"Bearer": []
				}],
			},
			"delete": {
				"summary": "Delete Achievement with given ID (Role:SuperAdmin)",
				"tags": [
					"Achievements"
				],
				"responses": {
					"200": {
						"description": "Achievement is deleted",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}]
			}
		},
		"/achievements/check-available": {
			"post": {
				"tags": [
					"Achievements"
				],
				"summary": "check-available (Role:SuperAdmin and users)",
				"parameters": [{
					"name": "Achievements",
					"in": "body",
					"description": "Achievements that we want to check",
					"schema": {
						"$ref": "#/definitions/Achievement"
					}
				}],
				"responses": {
					"200": {
						"description": "ok",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					},
					"409": {
						"description": "conflict",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/country": {
			"get": {
				"tags": [
					"Country"
				],
				"parameters": [{
					"name": "name",
					"in": "query",
					"description": "name",
					"schema": {
						"$ref": "#/definitions/Country"
					}
				}, {
					"name": "alpha_3",
					"in": "query",
					"description": "alpha_3",
					"schema": {
						"$ref": "#/definitions/Country"
					}
				}, {
					"name": "offset",
					"in": "query",
				}, {
					"name": "limit",
					"in": "query"
				}],
				"summary": "get Country (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Country is found",
						"schema": {
							"$ref": "#/definitions/GetCountry"
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			}
		},
		"/notifications": {
			"get": {
				"tags": [
					"Notification"
				],
				"parameters": [{
					"name": "type",
					"in": "query",
					"enum": ['Individual', 'General']
				}, {
					"name": "status",
					"in": "query",
					"type": "number"
				}, {
					"name": "announcement",
					"in": "query",
					"description": "objectid",
				}, {
					"name": "is_read",
					"in": "query",
					"enum": ['false', 'true']
				}, {
					"name": "offset",
					"in": "query",
				}, {
					"name": "limit",
					"in": "query"
				}],
				"summary": "get Notification (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Notification is found",
						"schema": {
							"$ref": "#/definitions/GetNotification"
						}
					},
					"500": {
						"description": "internal server error",
					}

				},
				"security": [{
					"Bearer": []
				}],
			}

		},
		"/notifications/{id}/isread": {
			"put": {
				"parameters": [{
					"name": "id",
					"in": "path",
					"description": "objectid",
					"required": false,
					"type": "string"
				}],
				"summary": "Read Notification with given ID  (Role:SuperAdmin and users)",
				"tags": [
					"Notification"
				],
				"responses": {
					"200": {
						"description": "Notification is readed",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"type": "object"
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}],
			}
		},
		"/settings": {
			"get": {
				"tags": [
					"Setting"
				],
				"summary": "get Setting (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Setting is found",
						"schema": {
							"$ref": "#/definitions/GetSetting"
						}
					},
					"500": {
						"description": "internal server error",
					}
				},

				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			},
			"post": {
				"tags": [
					"Setting"
				],
				"summary": "settings  (Role:SuperAdmin)",
				"parameters": [{
					"name": "website",
					"in": "formData",
					"type": "string"
				}, {
					"name": "fb_link",
					"in": "formData",
					"type": "string"
				}, {
					"name": "email",
					"in": "formData",
					"type": "string"
				}, {
					"name": "google_link",
					"in": "formData",
					"type": "string"
				}, {
					"name": "phone",
					"in": "formData",
					"type": "string"
				}, {
					"name": "logo",
					"in": "formData",
					"type": "file",
				}],
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"description": "Setting",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {

									"properties": {
										"_id": {
											"type": "ObjectId",
										},
										"website": {
											"type": "string"
										},
										"fb_link": {
											"type": "string"
										},
										"google_link": {
											"type": "string"
										},
										"logo": {
											"type": "string"
										},
										"email": {
											"type": "string"
										},
										"phone": {
											"type": "string"
										}
									}


								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/settings/{id}": {
			"parameters": [{
				"name": "id",
				"in": "path",
				"description": "objectid",
				"required": false,
				"type": "string"
			}],
			"get": {
				"tags": [
					"Setting"
				],
				"parameters": [{
					"name": "Setting",
					"in": "query",
					"description": "objectid",
					"required": false,
					"type": "string"
				}],
				"summary": "get Setting (Role:SuperAdmin and users)",
				"responses": {
					"200": {
						"description": "Setting is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {

									"properties": {
										"_id": {
											"type": "ObjectId",
										},
										"website": {
											"type": "string"
										},
										"fb_link": {
											"type": "string"
										},
										"google_link": {
											"type": "string"
										},
										"logo": {
											"type": "string"
										},
										"email": {
											"type": "string"
										},
										"phone": {
											"type": "string"
										}
									}


								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"basicAuth": [],
					"Bearer": []
				}]
			},
			"put": {
				"summary": "Update Setting with give ID (Role:SuperAdmin)",
				"tags": [
					"Setting"
				],
				"parameters": [{
					"name": "website",
					"in": "formData",
					"type": "string"
				}, {
					"name": "fb_link",
					"in": "formData",
					"type": "string"
				}, {
					"name": "email",
					"in": "formData",
					"type": "string"
				}, {
					"name": "google_link",
					"in": "formData",
					"type": "string"
				}, {
					"name": "phone",
					"in": "formData",
					"type": "string"
				}, {
					"name": "logo",
					"in": "formData",
					"type": "file",
				}],
				"responses": {
					"200": {
						"description": "Setting is updated",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number"
										},
										"msg": {
											"type": "string"
										},
									}
								},
								"response": {

									"properties": {
										"_id": {
											"type": "ObjectId",
										},
										"website": {
											"type": "string"
										},
										"fb_link": {
											"type": "string"
										},
										"google_link": {
											"type": "string"
										},
										"logo": {
											"type": "string"
										},
										"email": {
											"type": "string"
										},
										"phone": {
											"type": "string"
										}
									}


								}
							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/reports/stats": {
			"get": {
				"tags": [
					"Report"
				],
				"summary": "get all report status (Role:SuperAdmin)",
				"responses": {
					"200": {
						"description": "stats is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"properties": {
										"users": {
											"type": "number",
										},
										"games": {
											"type": "number",
										},
										"levels": {
											"type": "number",
										},
										"announcements": {
											"type": "number",
										},
										"achievements": {
											"type": "number",
										}
									}
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		},
		"/reports/device-registration/stats": {
			"get": {
				"tags": [
					"Report"
				],
				"summary": "get all devices status (Role:SuperAdmin)",
				"parameters": [{
					"name": "from",
					"in": "query",
					"description": "yyyy-mm-dd"
				}, {
					"name": "to",
					"in": "query",
					"description": "yyyy-mm-dd"

				}],
				"responses": {
					"200": {
						"description": "stats is found",
						"schema": {
							"properties": {
								"meta": {
									"properties": {
										"status": {
											"type": "number",
										},
										"msg": {
											"type": "string",
										},

									}
								},
								"response": {
									"properties": {
										"android": {
											"type": "number",
										},
										"ios": {
											"type": "number",
										},
										"date": {
											"type": "number",
										}
									}
								}

							}
						}
					},
					"500": {
						"description": "internal server error",
					}
				},
				"security": [{
					"Bearer": []
				}],
			}
		}
	},
	"definitions": {

		"Country": {
			"properties": {
				"numeric_code": {
					"type": "number"
				},
				"alpha_3": {
					"type": "string"
				},
				"alpha_2": {
					"type": "string"
				},
				"name": {
					"type": "string",
					"index": true
				}
			}
		},
		"GetCountry": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {
					"properties": {
						"total": {
							"type": "number"
						},
						"countries": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"numeric_code": {
										"type": "number"
									},
									"alpha_3": {
										"type": "string"
									},
									"alpha_2": {
										"type": "string"
									},
									"name": {
										"type": "string",
										"index": true
									}
								}
							}
						}
					}
				}
			}

		},
		"UserConnection": {
			"properties": {
				"name": {
					"type": "string"
				},
				"id": {
					"type": "Schema.Types.ObjectId",
					'ref': 'User'
				}
			}
		},
		"AcceptReject": {
			"properties": {
				"name": {
					"type": "string"
				},
				"code": {
					"type": "string"
				},
				"status": {
					"type": "number"
				}
			}
		},
		"SuperAdmins": {
			"properties": {
				"username": {
					"type": "string",
					"lowercase": "true",
					"unique": "true",
					"required": "true"
				},
				"email": {
					"type": "string",
					"lowercase": "true",
					"unique": "true",
					"required": "true"
				},
				"first_name": {
					"type": "string",
					"required": "true"
				},
				"last_name": {
					"type": "string"
				},
				"role": {
					"type": "integer",
					"default": "4"
				},
				"image_url": {
					"type": "string"
				},
				"hashed_password": {
					"type": "string",
					"required": "true"
				},
				"salt": {
					"type": "string",
					"required": "true"
				},
				"tokens": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"clientId": {
								"type": "Schema.Types.ObjectId",
								'ref': 'AppClient'
							}
						}
					}
				},
				"refreshToken": {
					"type": "string"
				}
			},
			"deleted": {
				"type": "Boolean",
				"default": "false"
			}
		},
		"SuperAdminLogin": {
			"properties": {
				"username": {
					"type": "string",
					"lowercase": "true",
					"unique": "true",
					"required": "true"
				},
				"password": {
					"type": "string"
				}
			}
		},
		"SuperAdminLogout": {
			"properties": {
				"username": {
					"type": "string",
					"lowercase": "true",
					"unique": "true",
					"required": "true"
				},
				"refresh_token": {
					"type": "string"
				}
			}
		},
		"UserStatus": {
			"properties": {
				"id": {
					"type": "Schema.Types.ObjectId",
					"ref": 'User',
					"index": true
				}
			}
		},
		"UpdateDevice": {
			"properties": {
				"device_type": {
					"type": "number"
				},
				"dev_token": {
					"type": "string"
				}
			}
		},
		"SuperAdminRefreshToken": {
			"properties": {
				"username": {
					"type": "string"
				},
				"refresh_token": {
					"type": "string"
				}
			}
		},
		"Announcement": {
			"properties": {
				"title": {
					"type": "string",
					"required": true,
					"index": true
				},
				"icon": {
					"type": "string"
				},
				"desc": {
					"type": "string"
				},
				"status": {
					"type": "number"
				},
				"type": {
					"type": "string",
					"enum": ['INFO', 'ACHIEVEMENT']
				}
			}
		},
		"GetAnnouncement": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {
					"properties": {
						"total": {
							"type": "number"
						},
						"announcements": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"title": {
										"type": "string",
										"required": true,
										"index": true
									},
									"icon": {
										"type": "string"
									},
									"desc": {
										"type": "string"
									},
									"status": {
										"type": "number"
									},
									"type": {
										"type": "string",
										"enum": ['INFO', 'ACHIEVEMENT']
									}
								}
							}
						}
					}
				}
			}

		},
		"Achievement": {
			"properties": {
				"name": {
					"type": "string",
					"required": true,
					"index": true
				},
				"icon": {
					"type": "string"
				},
				"desc": {
					"type": "string"
				},
				"type": {
					"type": "number"
				}
			}
		},
		"GetAchievement": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {
					"properties": {
						"total": {
							"type": "number"
						},
						"games": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"name": {
										"type": "string",
										"required": true,
										"index": true
									},
									"icon": {
										"type": "string"
									},
									"desc": {
										"type": "string"
									},
									"type": {
										"type": "number"
									}
								}
							}
						}
					}
				}
			}
		},
		"Game": {
			"properties": {
				"name": {
					"type": "string",
					"required": true,
					"index": true
				},
				"icon": {
					"type": "string"
				},
				"desc": {
					"type": "string"
				},
				"level": {
					"type": "Schema.Types.ObjectId",
					"ref": 'Level',
					"index": true
				},
				"level_position": {
					"type": "number"
				},
				"bg_img": {
					"type": "string"
				},
				"instructions": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"icon": {
								"type": 'string'
							},
							"desc": {
								"type": "string"
							}
						}
					}
				},
				"difficulty": {
					"type": "string",
					"enum": ['Easy', 'Medium', 'Hard']
				},
				'score': {
					"type": "object",
					"properties": {
						"speed": {
							"type": "number"
						},
						"memory": {
							"type": "number"
						},
						"concentration": {
							"type": "number"
						},
						"problem_solving": {
							"type": "number"
						},
						"accuracy": {
							"type": "number"
						},
						"visual": {
							"type": "number"
						}
					}
				}, // SubSchema
				"game_time_in_sec": {
					"type": "number",
					"required": true
				},
				"question_time_in_sec": {
					"type": "number"
				}
			}
		},
		"GetGame": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {
					"properties": {
						"total": {
							"type": "number"
						},
						"games": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"name": {
										"type": "string",
										"required": true,
										"index": true
									},
									"icon": {
										"type": "string"
									},
									"desc": {
										"type": "string"
									},
									"level": {
										"type": "Schema.Types.ObjectId",
										"ref": 'Level',
										"index": true
									},
									"level_position": {
										"type": "number"
									},
									"bg_img": {
										"type": "string"
									},
									"instructions": {
										"type": "array",
										"items": {
											"type": "object",
											"properties": {
												"_id": {
													"type": "ObjectId",
												},
												"icon": {
													"type": 'string'
												},
												"desc": {
													"type": "string"
												}
											}
										}
									},
									"difficulty": {
										"type": "string",
										"enum": ['Easy', 'Medium', 'Hard']
									},
									'score': {
										"type": "object",
										"properties": {
											"_id": {
												"type": "ObjectId",
											},
											"speed": {
												"type": "number"
											},
											"memory": {
												"type": "number"
											},
											"concentration": {
												"type": "number"
											},
											"problem_solving": {
												"type": "number"
											},
											"accuracy": {
												"type": "number"
											},
											"visual": {
												"type": "number"
											}
										}
									}, // SubSchema
									"game_time_in_sec": {
										"type": "number",
										"required": true
									},
									"question_time_in_sec": {
										"type": "number"
									}
								}
							}
						}
					}
				}
			}
		},
		"Level": {
			"properties": {
				"name": {
					"type": "string",
					"required": true,
					"index": true
				},
				"icon": {
					"type": "string"
				},
				"color_code": {
					"type": "string"
				},
				"required_score": {
					"type": "object",
					"properties": {
						"speed": {
							"type": "number"
						},
						"memory": {
							"type": "number"
						},
						"concentration": {
							"type": "number"
						},
						"problem_solving": {
							"type": "number"
						},
						"accuracy": {
							"type": "number"
						},
						"visual": {
							"type": "number"
						}
					}
				},
				"characteristics": {
					"type": "array",
					"items": {

						"type": "string"

					}
				},
				"bg_img": {
					"type": "string"
				}
			}
		},
		"GetLevel": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {
					"properties": {
						"total": {
							"type": "number"
						},
						"levels": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"name": {
										"type": "string",
										"required": true,
										"index": true
									},
									"icon": {
										"type": "string"
									},
									"color_code": {
										"type": "string"
									},
									"required_score": {
										"type": "object",
										"properties": {
											"_id": {
												"type": "ObjectId",
											},
											"speed": {
												"type": "number"
											},
											"memory": {
												"type": "number"
											},
											"concentration": {
												"type": "number"
											},
											"problem_solving": {
												"type": "number"
											},
											"accuracy": {
												"type": "number"
											},
											"visual": {
												"type": "number"
											},

										}
									},
									"characteristics": {
										"type": "array",
										"items": {

											"type": "string"

										}
									},
									"bg_img": {
										"type": "string"
									}
								}
							}
						}
					}
				}
			}
		},
		"PutUserGames": {
			"properties": {
				"round_no": {
					"type": "number"
				},
				"round_winner": {
					"type": "Schema.Types.ObjectId",
					"ref": 'User',
					"index": true
				},
				"game": {
					"type": " Schema.Types.ObjectId",
					"ref": 'Game',
					"index": true
				},
				"suggested_games": {
					"type": " Schema.Types.ObjectId",
					"ref": 'Game',
					"index": true
				},
				'score': {
					"type": "object",
					"properties": {
						"speed": {
							"type": "number"
						},
						"memory": {
							"type": "number"
						},
						"concentration": {
							"type": "number"
						},
						"problem_solving": {
							"type": "number"
						},
						"accuracy": {
							"type": "number"
						},
						"visual": {
							"type": "number"
						},
						"correct": {
							"type": "number",
							"default": 0
						},
						"incorrect": {
							"type": "number",
							"default": 0
						},
						"score": {
							"type": "number",
							"default": 0
						}
					}
				},
			}
		},
		"Usergames": {
			"properties": {
				"user": {
					"type": "Schema.Types.ObjectId",
					"ref": 'User',
					"index": true
				},
				"game": {
					"type": " Schema.Types.ObjectId",
					"ref": 'Game',
					"index": true
				},
				"level": {
					"type": "Schema.Types.ObjectId",
					"ref": 'Level'
				},
				'score': {
					"type": "object",
					"properties": {
						"speed": {
							"type": "number"
						},
						"memory": {
							"type": "number"
						},
						"concentration": {
							"type": "number"
						},
						"problem_solving": {
							"type": "number"
						},
						"accuracy": {
							"type": "number"
						},
						"visual": {
							"type": "number"
						},
						"correct": {
							"type": "number",
							"default": 0
						},
						"incorrect": {
							"type": "number",
							"default": 0
						},
						"score": {
							"type": "number",
							"default": 0
						}
					}
				},
				"overall_score": {
					'type': "number"
				},
				"type": {
					"type": "string",
					"enum": ['Individual', 'Challenge'],
					"index": true
				},
				"challenge": {
					"type": "object",
					"properties": {
						"type": {
							"type": "string",
							"enum": ['Friend', 'Manual', 'Automatic']
						},
						"code": {
							"type": "string",
							"index": true
						},
						"suggested_games": {
							"type": " Schema.Types.ObjectId",
							"ref": 'Game'
						},
						"opponent": {
							"type": "Schema.Types.ObjectId",
							"ref": 'User'
						},

						"rounds": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"round_no": {
										"type": "number"
									},
									"round_winner": {
										"type": "Schema.Types.ObjectId",
										"ref": 'User',
										"index": true
									},
									"game": {
										"type": " Schema.Types.ObjectId",
										"ref": 'Game',
										"index": true
									},
									"suggested_games": {
										"type": " Schema.Types.ObjectId",
										"ref": 'Game',
										"index": true
									},
									'score': {
										"type": "object",
										"properties": {
											"speed": {
												"type": "number"
											},
											"memory": {
												"type": "number"
											},
											"concentration": {
												"type": "number"
											},
											"problem_solving": {
												"type": "number"
											},
											"accuracy": {
												"type": "number"
											},
											"visual": {
												"type": "number"
											},
											"correct": {
												"type": "number",
												"default": 0
											},
											"incorrect": {
												"type": "number",
												"default": 0
											},
											"score": {
												"type": "number",
												"default": 0
											}
										}
									}, // SubSchema
								}
							}
						}
					}

				}
			}
		},
		"GetUserGames": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {

					"properties": {
						"total": {
							"type": "number"
						},
						"usergames": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"user": {
										"type": "Schema.Types.ObjectId",
										"ref": 'User',
										"index": true
									},
									"game": {
										"type": " Schema.Types.ObjectId",
										"ref": 'Game',
										"index": true
									},
									"level": {
										"type": "Schema.Types.ObjectId",
										"ref": 'Level'
									},
									'score': {
										"type": "object",
										"properties": {
											"_id": {
												"type": "ObjectId",
											},
											"speed": {
												"type": "number"
											},
											"memory": {
												"type": "number"
											},
											"concentration": {
												"type": "number"
											},
											"problem_solving": {
												"type": "number"
											},
											"accuracy": {
												"type": "number"
											},
											"visual": {
												"type": "number"
											},
											"correct": {
												"type": "number",
												"default": 0
											},
											"incorrect": {
												"type": "number",
												"default": 0
											},
											"score": {
												"type": "number",
												"default": 0
											}
										}
									},
									"overall_score": {
										'type': "number"
									},
									"type": {
										"type": "string",
										"enum": ['Individual', 'Challenge'],
										"index": true
									},
									"challenge": {
										"type": "object",
										"properties": {
											"_id": {
												"type": "ObjectId",
											},
											"type": {
												"type": "string",
												"enum": ['Friend', 'Manual', 'Automatic']
											},
											"code": {
												"type": "string",
												"index": true
											},
											"suggested_games": {
												"type": " Schema.Types.ObjectId",
												"ref": 'Game'
											},
											"opponent": {
												"type": "Schema.Types.ObjectId",
												"ref": 'User'
											},

											"rounds": {
												"type": "array",
												"items": {
													"type": "object",
													"properties": {
														"_id": {
															"type": "ObjectId",
														},
														"round_no": {
															"type": "number"
														},
														"round_winner": {
															"type": "Schema.Types.ObjectId",
															"ref": 'User',
															"index": true
														},
														"game": {
															"type": " Schema.Types.ObjectId",
															"ref": 'Game',
															"index": true
														},
														"suggested_games": {
															"type": " Schema.Types.ObjectId",
															"ref": 'Game',
															"index": true
														},
														'score': {
															"type": "object",
															"properties": {
																"_id": {
																	"type": "ObjectId",
																},
																"speed": {
																	"type": "number"
																},
																"memory": {
																	"type": "number"
																},
																"concentration": {
																	"type": "number"
																},
																"problem_solving": {
																	"type": "number"
																},
																"accuracy": {
																	"type": "number"
																},
																"visual": {
																	"type": "number"
																},
																"correct": {
																	"type": "number",
																	"default": 0
																},
																"incorrect": {
																	"type": "number",
																	"default": 0
																},
																"score": {
																	"type": "number",
																	"default": 0
																}
															}
														}, // SubSchema
													}
												}
											}
										}

									}
								}
							}
						}
					}
				}
			}
		},
		"User": {

			"properties": {



				"name": {
					"type": "string",
					"required": true,
					"index": true
				},
				"email": {
					"type": "string"
				},
				"age": {
					"type": "number",
					"required": true,
					"index": true
				},
				"gender": {
					"type": "string",
					"enum": ['M', 'F']
				},
				"provider": {
					"type": "string",
					"enum": ['OWN', 'FB', 'Google']
				},
				"level": {
					"type": "Schema.Types.ObjectId",
					"ref": 'Level',
					"index": true
				},
				"current_game": {
					"type": "Schema.Types.ObjectId",
					"ref": 'Game',
					"index": true
				},
				"connected_friends": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"type": "Schema.Types.ObjectId",
							"ref": 'User'
						}
					}
				},
				'score': {
					"type": "object",
					"properties": {
						"speed": {
							"type": "number"
						},
						"memory": {
							"type": "number"
						},
						"concentration": {
							"type": "number"
						},
						"problem_solving": {
							"type": "number"
						},
						"accuracy": {
							"type": "number"
						},
						"visual": {
							"type": "number"
						}
					}
				}, // SubSchema
				"overall_score": {
					"type": "number"
				},
				"achievements": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"type": "Schema.Types.ObjectId",
							"ref": 'Achievement'
						}
					}
				},
				"country": {
					"type": "Schema.Types.ObjectId",
					"ref": 'Country',
					"index": true
				},
				"profile_pic": {
					"type": "string"
				},
				"profile_id": {
					"type": "string"
				},

				"otp": {
					"type": "string"
				},
				"otp_verified": {
					"type": "Boolean",
					"default": false
				},
				"otp_verified_token_generated": {
					"type": "date"
				},
				"email_verified": {
					"type": "Boolean",
					"default": false
				},
				"email_verified_token": {
					"type": "string"
				},
				"email_verified_token_generated": {
					"type": "date"
				},
				"status": {
					"type": 'string',
					"enum": ['Active', 'Locked'],
					"default": 'Active'
				},
				"devices": {
					"type": "array",
					"items": {
						"type": "object",
						"properties": {
							"device_type": {
								"type": "number" //1:"ANDROID", 2:"IOS" 
							},
							"dev_token": {
								"type": "string"
							}
						}
					}
				}


			}
		},
		"GetUser": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {

					"properties": {
						"total": {
							"type": "number"
						},
						"users": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"name": {
										"type": "string",
										"required": true,
										"index": true
									},
									"email": {
										"type": "string"
									},
									"age": {
										"type": "number",
										"required": true,
										"index": true
									},
									"gender": {
										"type": "string",
										"enum": ['M', 'F']
									},
									"provider": {
										"type": "string",
										"enum": ['OWN', 'FB', 'Google']
									},
									"level": {
										"type": "Schema.Types.ObjectId",
										"ref": 'Level',
										"index": true
									},
									"current_game": {
										"type": "Schema.Types.ObjectId",
										"ref": 'Game',
										"index": true
									},
									"connected_friends": {
										"type": "array",
										"items": {
											"type": "object",
											"properties": {
												"type": "Schema.Types.ObjectId",
												"ref": 'User'
											}
										}
									},
									'score': {
										"type": "object",
										"properties": {
											"speed": {
												"type": "number"
											},
											"memory": {
												"type": "number"
											},
											"concentration": {
												"type": "number"
											},
											"problem_solving": {
												"type": "number"
											},
											"accuracy": {
												"type": "number"
											},
											"visual": {
												"type": "number"
											}
										}
									}, // SubSchema
									"overall_score": {
										"type": "number"
									},
									"achievements": {
										"type": "array",
										"items": {
											"type": "object",
											"properties": {
												"type": "Schema.Types.ObjectId",
												"ref": 'Achievement'
											}
										}
									},
									"country": {
										"type": "Schema.Types.ObjectId",
										"ref": 'Country',
										"index": true
									},
									"profile_pic": {
										"type": "string"
									},
									"profile_id": {
										"type": "string"
									},

									"otp": {
										"type": "string"
									},
									"otp_verified": {
										"type": "Boolean",
										"default": false
									},
									"otp_verified_token_generated": {
										"type": "date"
									},
									"email_verified": {
										"type": "Boolean",
										"default": false
									},
									"email_verified_token": {
										"type": "string"
									},
									"email_verified_token_generated": {
										"type": "date"
									},
									"status": {
										"type": 'string',
										"enum": ['Active', 'Locked'],
										"default": 'Active'
									},
									"devices": {
										"type": "array",
										"items": {
											"type": "object",
											"properties": {
												"device_type": {
													"type": "number" //1:"ANDROID", 2:"IOS" 
												},
												"dev_token": {
													"type": "string"
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		"Setting": {
			"properties": {

				"website": {
					"type": "string"
				},
				"fb_link": {
					"type": "string"
				},
				"google_link": {
					"type": "string"
				},
				"logo": {
					"type": "string"
				},
				"email": {
					"type": "string"
				},
				"phone": {
					"type": "string"
				}
			}
		},
		"GetSetting": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {
					"properties": {
						"total": {
							"type": "number"
						},
						"settings": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"website": {
										"type": "string"
									},
									"fb_link": {
										"type": "string"
									},
									"google_link": {
										"type": "string"
									},
									"logo": {
										"type": "string"
									},
									"email": {
										"type": "string"
									},
									"phone": {
										"type": "string"
									}
								}
							}
						}
					}
				}
			}
		},
		"Notification": {
			"properties": {
				"from": {
					"type": "Schema.Types.ObjectId",
					"ref": 'User'
				},
				"to": {
					"type": "Schema.Types.ObjectId",
					"ref": 'User'
				},
				"type": {
					'type': "string",
					"enum": ['Individual', 'General']
				},
				"status": {
					"type": "string",
					default: "1"
				},
				"title": {
					"type": "string"
				},
				"description": {
					"type": "string"
				},
				"created_by": {
					"type": "Schema.Types.ObjectId",
					"ref": 'User'
				},
				"is_read": {
					"type": "Boolean",
					default: false
				}
			}
		},
		"GetNotification": {
			"properties": {
				"meta": {
					"properties": {
						"status": {
							"type": "number"
						},
						"msg": {
							"type": "string"
						},
					}
				},
				"response": {
					"properties": {
						"total": {
							"type": "number"
						},
						"notifications": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"_id": {
										"type": "ObjectId",
									},
									"from": {
										"type": "Schema.Types.ObjectId",
										"ref": 'User'
									},
									"to": {
										"type": "Schema.Types.ObjectId",
										"ref": 'User'
									},
									"type": {
										'type': "string",
										"enum": ['Individual', 'General']
									},
									"status": {
										"type": "string",
										default: "1"
									},
									"title": {
										"type": "string"
									},
									"description": {
										"type": "string"
									},
									"created_by": {
										"type": "Schema.Types.ObjectId",
										"ref": 'User'
									},
									"is_read": {
										"type": "Boolean",
										default: false
									}
								}
							}
						}
					}
				}
			}
		},
		"Score": {
			"properties": {
				"speed": {
					"type": "number"
				},
				"memory": {
					"type": "number"
				},
				"concentration": {
					"type": "number"
				},
				"problem_solving": {
					"type": "number"
				},
				"accuracy": {
					"type": "number"
				},
				"visual": {
					"type": "number"
				},
				"correct": {
					"type": "number",
					"default": 0
				},
				"incorrect": {
					"type": "number",
					"default": 0
				},
				"score": {
					"type": "number",
					"default": 0
				}
			}
		},
		"SendOtp": {
			"properties": {
				"email": {
					"type": "string"
				}
			}
		},
		"VerifyOtp": {
			"properties": {
				"email": {
					"type": "string",
				},
				"otp": {
					"type": "string"
				}
			}
		},
		"ResendOtp": {
			"properties": {
				"email": {
					"type": "string"
				}
			}
		}
	}
}
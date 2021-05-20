<div align="center">
	<img src="./icon.png" alt="AURL" width=200>
	<h1>AURL</h1>
</div>

# AURL
URL shortener written in Node.js  

# API endpoint
| api              | required permission                | description                                                  |
| :---             | :---                               | :---                                                         |
| POST /url        | manager:custonCode(optional)       | create a record for ${body.url} with ${body.code}            |
| GET /url/:code   | manager:getUrl(optional)           | get record information of ${params.code}                     |
| PUT /url/:code   | owner or manager:editUrl           | edit record information                                      |
| DELET /url/:code | owner or mamager:deleteUrl         | delete record                                                |
| POST /user       | one-time token or admin:createUser | create user with specified permissions in ${body.permission} |
| GET /user        | (manager or admin):getUserInfo     | get all users info                                           |
| GET /user/:id    | (manager or admin):getuserInfo     | get specified users info                                     |
| PUT /user/:id    | (manager or admin):editUserInfo    | edit users info                                              |
| DELETE /user/:id | one-time token or admin:deleteUser | delete user                                                  |

# role
| role    | description                                                                         |
| :---    | :---                                                                                |
| guest   | unsign-ined user, only can create records, which will be marked as 'unsafe'         |
| user    | regular user, with the basic permission to create, edit and delete their own record |
| manager | managing records                                                                    |
| admin   | managing records and users, including permission                                    |

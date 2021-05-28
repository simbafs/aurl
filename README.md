<div align="center">	
<img src="./icon.png" alt="AURL" width=200>
<h1>AURL</h1>
</div>

# AURL
URL shortener written in Node.js

> TODO: permission control  
> TODO: clean and unify error message  
> TODO: reorganize config

| emoji | meanings                       |
| :---: | :---                           |
| ⬜️    | Not start yet                  |
| 🟨    | Already start but not finished |
| ✅    | Finished                       |

# API endpoint
| finished | api                      | required permission  | description                                                  |
| :---:    | :---                     | :---                 | :---                                                         |
| ✅       | POST /url                | custonCode(optional) | create a record for ${body.url} with ${body.code}            |
| ✅       | GET /url/code            | getUrl(optional)     | get record information of ${params.code}                     |
| ⬜️       | PUT /url/code            | owner or editUrl     | edit record information                                      |
| ⬜️       | DELET /url/code          | owner or deleteUrl   | delete record                                                |
| ⬜️       | POST /user               | createUser           | create user with specified permissions in ${body.permission} |
| ✅       | GET /user                | getUser              | get all users info                                           |
| ✅       | GET /user/id             | getUser              | get specified users info                                     |
| 🟨       | PUT /user/id             | editUser             | edit users info                                              |
| ⬜️       | DELETE /user/id          | owner or deleteUser  | delete user                                                  |
| ✅       | POST /user/signin        |                      | signin with password                                         |
| ✅       | POST /user/signup        |                      | signup                                                       |
| ✅       | POST /user/signup/verify |                      | verify email                                                 |

# permission
| finished | permission | description                                                                |
| :---:    | :---       | :---                                                                       |
| ✅       | cuteomCode | custom ${body.code}                                                        |
| ✅       | getUrl     | get full detail of url                                                     |
| ⬜️       | editUrl    | edit url                                                                   |
| ⬜️       | deleteUrl  | deleteUrl                                                                  |
| ⬜️       | createUrl  | createUrl without verify                                                   |
| ✅       | getUser    | get user info, excluding password because password is hashed               |
| ⬜️       | editUser   | edit user info, including password                                         |
| ⬜️       | deleteUser | deleteUser                                                                 |
| 🟨       | owner      | this is a special permission that won't be mark in user's permission field |

# role (you can custom roles in config/local.js)
| role    | permissions | description                                                    |
| :---    | :---        | :---                                                           |
| guest   | none        | all url create by guest will be mark as 'unsafe'               |
| user    | none        | all url create by unverified user will be mark as 'unverified' |
| manager | editUrl     |                                                                |
| admin   | all         |                                                                |

# 參考資料
https://docs.mongodb.com/manual/reference/operator/query/nin/  


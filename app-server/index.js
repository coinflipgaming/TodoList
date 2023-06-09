const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 8080

//open database from 'sqlite\database.db'
let db = new sqlite3.Database(`./sqlite/database.db`, (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('connected to the sqlite database succesfully')
    }
})

//cors settings
var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",//IMPORTANT FOR PATCH REQUEST TO WORK
    "preflightContinue": true,
    "optionsSuccessStatus": 205
}

//cross origin requests middleware
app.use(cors(options))

//json and parsing middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())

// authentication middleware, checks if user provided in json body exists in db
app.use((req, res, next) => {

    //assigning variables from request
    const { username, password } = req.headers

    //sql request looking for matching user credentials
    db.all(`select password from users where nickname = '${username}'`,
        (err, rows) => {
            if (err) {
                res.send(err.message)
            }
            if (rows.length > 0) { 
                // user with nickname found
                //console.log(rows[0].password)
                bcrypt.compare(password, rows[0].password, (err, result) => {
                    if (err) {
                        res.send(err.message)
                    } else if (result) {
                        // password is valid
                        return next()
                    } else {
                        // password is invalid
                        res.status(200).send({ "auth": false })
                    }
                });
            } else {
                // no users match the nickname
                res.status(200).send({ "auth": false }) // custom message
        }
    })
})

app.get('/', (req, res) => {
    const { username, password } = req.headers
    db.all(`select name,surname from users where nickname like '%${username}%' limit 1`,
        (err, rows) => {
            if (err) {
                res.send(err.message)
            }
            if (rows.length > 0) {
                res.status(200).send({
                    "auth": true,
                    "username": username,
                    "password": password,
                    "name":rows[0].name,
                    "surname":rows[0].surname
                });
            } else {
                res.status(400) // custom message
            }
        })
    
})

//select all users names and surnames
app.get('/users', (req, res) => {
    db.all(`select rowid,nickname,name,surname,password_raw from users`,
        (err, rows) => {
            if (err) {
                res.send(err.message)
            }
            if (rows.length > 0) {
                res.status(200).send(rows)
            } else {
                res.status(400) // custom message
            }
        })
})

/*bcrypt.hash("haslo", 10, function (err, hash) {
    if (err) {
        console.log(err.message)
    }
    db.all(`insert into users values ('asinatio','${hash}','Damian','Mika')`)
});*/

// add user with hashed password
app.post('/users/add', (req, res) => {
    const { newUsername, newPassword, newName, newSurname } = req.body
    bcrypt.hash(newPassword, 10, function (err, hash) {
        if (err) {
            res.status(400).send(err)
        } else {
            db.all(`insert into users values ('${newUsername}','${hash}','${newName}','${newSurname}','${newPassword}')`,
            (err) => {
                if (err) {
                    res.status(400).send(err)
                }
                else {
                    res.status(200).send(`added row`)
                }
            })
        }
        
    });
})
app.delete('/users/delete', (req, res) => {
    const { rowid } = req.body
    db.all(`delete from users where rowid = ${rowid}`,
        (err) => {
            if (err) {
                res.status(400).send(err)
            }
            else {
                res.status(200).send(`deleted row with rowid: ${rowid}`)
            }
        })
})

//select all notes with the username provided with json header
app.get('/notes', (req, res) => {
    const { username, surname } = req.headers
    var sort = req.headers.sort
    var sortdir = req.headers.sortdir
    if (sort == undefined || !sortdir == undefined) {
        sort = "deadline"
        sortdir = "desc"
    }
    db.all(`select rowid,* from posts where contributors_nicknames like '%${surname}%' or author_nickname like '%${username}%' order by ${sort}`+" "+`${sortdir};`,
        (err, rows) => {
            if (err) {
                res.send(err.message)
            }
            if (rows.length > 0) {
                res.status(200).send(rows)
            } else {
                res.status(404).send(`Couldn't send notes.`) // custom message
            }
        })
})

//add a new note with the username provided with json header
app.post('/notes/add', (req, res) => {
    const { title, priority, description, rooms, author_nickname, contributors_nicknames, date_added, deadline } = req.body
    db.all(`insert into posts values ('${title}', '${priority}', '${description}', '${rooms}', '${author_nickname}', '${contributors_nicknames}', '${date_added}', '${deadline}')`)
    res.status(200).send(`Added '${title}', '${priority}', '${description}', '${rooms}', '${author_nickname}', '${contributors_nicknames}', '${date_added}', '${deadline}'`)
})

//delete a note with specified row id if json header provided username is among note contributors
app.delete('/notes/delete', (req, res) => {
    const { rowid } = req.body
    db.all(`delete from posts where rowid = ${rowid}`, (err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send(`Deleted note with id: ${rowid}`) //custom message
        }
    })
})

//modify a note with specified row id if json header provided username is among note contributors
app.post('/notes/modify', (req, res) => {
    const { rowid, title, priority, description, rooms, author_nickname, contributors_nicknames, date_added, deadline } = req.body
    db.all(`update posts set title = '${title}', priority = '${priority}', description = '${description}', rooms = '${rooms}', author_nickname = '${author_nickname}', contributors_nicknames = '${contributors_nicknames}', date_added = '${date_added}', deadline = '${deadline}' where rowid = ${rowid}`, (err) => {
        if (err) {
            res.status(400).send(err.message)
        } else {
            res.status(200).send(`Modified record with id: ${rowid}`) //custom message
        }
    })
})

//select all sticky notes if there are any
app.get('/sticky_notes', (req, res) => {
    db.all(`select rowid,* from sticky_notes;`,
        (err, rows) => {
            if (err) {
                res.send(err.message)
            }
            if (rows.length > 0) {
                res.status(200).send(rows)
            } else {
                res.status(402).send(`There are no notes.`) // custom message
            }
        })
})

//add a new sticky note
app.post('/sticky_notes/add', (req, res) => {
    const { content, date_added, priority } = req.body
    db.all(`insert into sticky_notes values ('${content}', '${date_added}', '${priority}')`)
    res.status(200).send(`Added '${content}', '${date_added}', '${priority}'`)
})

//deletes a sticky note
app.delete('/sticky_notes/delete', (req, res) => {
    const { rowid } = req.body
    db.all(`delete from sticky_notes where rowid = ${rowid};`, (err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send(`Deleted sticky note with id: ${rowid}`) //custom message
        }
    })
})

//modify a sticky note
app.post('/sticky_notes/modify', (req, res) => {
    const { rowid, content, date_added, priority } = req.body
    db.all(`update sticky_notes set content = '${content}', date_added = '${date_added}', priority = '${priority}' where rowid = ${rowid};`, (err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.status(200).send(`Modified sticky note: '${rowid}', '${content}', '${date_added}', '${priority}'`)
        }
    })
})

app.listen(PORT , () => console.log(`Server is live on http://localhost:${PORT}`))
package model

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"log"
)

var db *sql.DB

func InitDb() *sql.DB {
	var err error
	db, err = sql.Open("sqlite3", "./todos.db")
	if err != nil {
		log.Println(err)
	}
	db.Exec("create table if not exists goals (uid text, goal text, created text)")
	return db
}

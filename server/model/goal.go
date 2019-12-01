package model

import (
	"log"
	"time"

	uuid "github.com/satori/go.uuid"
)

// Goal struct
type Goal struct {
	ID      int       `json:"-"`
	UID     string    `json:"uid"`
	Goal    string    `json:"goal"`
	Created time.Time `json:"-"`
}

func checkErr(err error) {
	if err != nil {
		log.Println(err)
	}
}

// AddGoal ...
func AddGoal(goal string) error {

	uid := uuid.NewV4()
	created := time.Now()

	stmt, _ := db.Prepare(`
			INSERT INTO 
			goals(uid, goal, created)
			VALUES(?,?,?)
		`)

	_, err := stmt.Exec(uid, goal, created)
	checkErr(err)

	return err
}

// GetGoals ...
func GetGoals() ([]Goal, error) {
	goals := []Goal{}

	rows, err := db.Query("SELECT uid, goal FROM goals")
	checkErr(err)

	for rows.Next() {
		goal := Goal{}
		err = rows.Scan(&goal.UID, &goal.Goal)
		goals = append(goals, goal)
		checkErr(err)
	}

	return goals, err
}

// DeleteGoal ...
func DeleteGoal(uid string) (err error) {

	stmt, err := db.Prepare("delete from goals where uid=?")
	checkErr(err)

	res, err := stmt.Exec(uid)
	checkErr(err)

	_, err = res.RowsAffected()
	checkErr(err)

	return err
}

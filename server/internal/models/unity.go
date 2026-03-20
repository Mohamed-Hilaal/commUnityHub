package models

import (
    "time"
    "github.com/google/uuid"
)

type Unity struct {
    ID                   uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    CommunityName        string    `gorm:"not null"`
    Location             string
    Category             string    `gorm:"not null"`
    Audience             string    `gorm:"not null"`
    CommunityDescription string    `gorm:"not null"`
    ContactMethod        string    `gorm:"not null"`
    CommunityVision      string    `gorm:"not null"`
    Goals                string    `gorm:"not null"`
    LongTermObjectives   string    `gorm:"not null"`
    CurrentInterest      *bool
    ContentAndActivities string
    CommitmentLevel      string    `gorm:"not null"`
    Differentiation      string
    PotentialChallenges  string
    CreatorID            uuid.UUID `gorm:"type:uuid;not null"`
    CreatedAt            time.Time
    UpdatedAt            time.Time

    Creator User     `gorm:"foreignKey:CreatorID"`
    Members []Member `gorm:"foreignKey:UnityID"`
}
package models

import (
    "time"
    "github.com/google/uuid"
)

type Unity struct {
    ID                   uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    CommunityName        string    `json:"communityName" gorm:"not null"`
    Location             string    `json:"location"`
    Category             string    `json:"category" gorm:"not null"`
    Audience             string    `json:"audience" gorm:"not null"`
    CommunityDescription string    `json:"communityDescription" gorm:"not null"`
    ContactMethod        string    `json:"contactMethod" gorm:"not null"`
    CommunityVision      string    `json:"communityVision" gorm:"not null"`
    Goals                string    `json:"goals" gorm:"not null"`
    LongTermObjectives   string    `json:"longTermObjectives" gorm:"not null"`
    CurrentInterest      *bool     `json:"currentInterest"`
    ContentAndActivities string    `json:"contentAndActivities"`
    CommitmentLevel      string    `json:"commitmentLevel" gorm:"not null"`
    Differentiation      string    `json:"differentiation"`
    PotentialChallenges  string    `json:"potentialChallenges"`
    CreatorID            uuid.UUID `json:"creatorId" gorm:"type:uuid;not null"`
    CreatedAt            time.Time `json:"createdAt"`
    UpdatedAt            time.Time `json:"updatedAt"`

    Creator User     `json:"creator" gorm:"foreignKey:CreatorID"`
    Members []Member `json:"members" gorm:"foreignKey:UnityID"`
}
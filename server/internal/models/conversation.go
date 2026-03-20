package models

import (
    "time"
    "github.com/google/uuid"
)

type Conversation struct {
    ID        uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    Type      string     `gorm:"not null"` // unity_group, unity_private, direct
    UnityID   *uuid.UUID `gorm:"type:uuid"`
    CreatedAt time.Time
    UpdatedAt time.Time

    Unity        *Unity                    `gorm:"foreignKey:UnityID"`
    Participants []ConversationParticipant `gorm:"foreignKey:ConversationID"`
    Messages     []Message                 `gorm:"foreignKey:ConversationID"`
}

type ConversationParticipant struct {
    ID             uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    ConversationID uuid.UUID  `gorm:"type:uuid;not null"`
    UserID         *uuid.UUID `gorm:"type:uuid"`
    UnityID        *uuid.UUID `gorm:"type:uuid"`
    CreatedAt      time.Time

    User  *User  `gorm:"foreignKey:UserID"`
    Unity *Unity `gorm:"foreignKey:UnityID"`
}

type Message struct {
    ID             uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    ConversationID uuid.UUID `gorm:"type:uuid;not null"`
    SenderID       uuid.UUID `gorm:"type:uuid;not null"`
    Content        string    `gorm:"not null"`
    CreatedAt      time.Time
    UpdatedAt      time.Time

    Sender User `gorm:"foreignKey:SenderID"`
}

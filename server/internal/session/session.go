package session

import (
	    "github.com/google/uuid"
)

// Todo: Implement a more robust session management system, possibly using Redis or another in-memory store for better performance and scalability.
type session struct {
	SessionStore map[string]uuid.UUID
}

type Manager interface {
	CreateSession(string, uuid.UUID)
	GetUserID(string) (uuid.UUID, bool)
	DeleteSession(string)
}

func NewSession() Manager {
	return &session{
		SessionStore: make(map[string]uuid.UUID),
	}
}


func (s *session) CreateSession(sessionID string, userID uuid.UUID) {
	s.SessionStore[sessionID] = userID
}

func (s *session) GetUserID(sessionID string) (uuid.UUID, bool) {
	userID, exists := s.SessionStore[sessionID]
	return userID, exists
}

func (s *session) DeleteSession(sessionID string) {
	delete(s.SessionStore, sessionID)
}
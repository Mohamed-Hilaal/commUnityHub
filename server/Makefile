include .env
export

# Makefile at root of server/
DB_URL=postgres://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=$(DB_SSLMODE)

migrate-up:
	migrate -path ./migrations -database "$(DB_URL)" up

migrate-down:
	migrate -path ./migrations -database "$(DB_URL)" down 1

migrate-create:
	migrate create -ext sql -dir migrations -seq $(name)

migrate-goto:
	migrate -path ./migrations -database "$(DB_URL)" goto $(version)
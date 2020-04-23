.DEFAULT_GOAL := help

.PHONY: default build dev prod

help:
	@echo ""
	@echo "Commands:"
	@echo "  \033[38;5;75mbuild\033[0m: build project for production"
	@echo "  \033[38;5;75mdev\033[0m: start project for development"
	@echo "  \033[38;5;75mprod\033[0m: start project for production"
	@echo ""

build:
	@cd frontend; yarn build
	@cd backend; cargo build --release

dev: 
	@cd backend; cargo run
	@cd frontend; yarn dev

prod:
	@cd backend; cargo run

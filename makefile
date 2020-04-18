.DEFAULT_GOAL := help

.PHONY: default build start

help:
	@echo ""
	@echo "Commands:"
	@echo "  \033[38;5;75mbuild\033[0m: build project for production"
	@echo "  \033[38;5;75mstart\033[0m: start project for production"
	@echo ""

build:
	@cd frontend; yarn build
	@cd backend; cargo build --release

start:
	@cd backend; cargo run

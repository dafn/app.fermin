.DEFAULT_GOAL := help

.PHONY: default build_dev build_prod run_dev run_prod backend_to_pi, frontend_to_pi, env_to_pi

help:
	@echo ""
	@echo "Commands:"
	@echo "  \033[38;5;75mbuild_dev\033[0m: build project for development"
	@echo "  \033[38;5;75mbuild_prod\033[0m: build project for production"
	@echo "  \033[38;5;75mrun_dev\033[0m: start project for development"
	@echo "  \033[38;5;75mrun_prd\033[0m: start project for production"
	@echo "  \033[38;5;75mbackend_to_pi\033[0m: move backend, pre build, to pi"
	@echo "  \033[38;5;75mfrontend_to_pi\033[0m: move frontend, post build (dist), to pi"
	@echo "  \033[38;5;75menv_to_pi\033[0m: move .env and makefile to pi"
	@echo ""

build_dev:
	@cd frontend; yarn && yarn build
	@cd backend; cargo build

build_prod:
	@cd backend; cargo build --release

run_dev: 
	@cd backend; RUST_ENV=devlopment cargo run
	@cd frontend; yarn dev

run_prod:
	@cd backend; RUST_ENV=production cargo run --release

back_to_pi:
	@rm -rf ./backend/target
	@scp -r ./backend pi@raspberrypi.local:app.fermin/

front_to_pi:
	@cd frontend; yarn build; cd ..
	@scp -r ./frontend/dist pi@raspberrypi.local:app.fermin/frontend/

env_to_pi: 
	@scp -r .env makefile pi@raspberrypi.local:app.fermin/

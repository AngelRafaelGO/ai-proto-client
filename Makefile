run-dev-log:
	docker compose -f "docker-compose-dev.yaml" up

run-dev-log-build:
	docker compose -f "docker-compose-dev.yaml" up --build

run-prod-log:
	docker compose -f "docker-compose-prod.yaml" up --build
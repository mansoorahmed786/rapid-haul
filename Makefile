
# Build all services
build:
	@docker-compose build

# Start all services
up:
	@docker-compose up -d

# Stop all services
down:
	@docker-compose down

# View logs
logs:
	@docker-compose logs -f

# Shell into backend container
shell-backend:
	@docker-compose exec backend bash

# Shell into frontend container
shell-frontend:
	@docker-compose exec frontend bash

# Run database migrations
migrate:
	@docker-compose exec backend python manage.py migrate

# Collect static files
static:
	@docker-compose exec backend python manage.py collectstatic --noinput

# Run backend tests
test:
	@docker-compose exec backend python manage.py test

# Create a new superuser
createsuperuser:
	@docker-compose exec backend python manage.py createsuperuser

# Clean up volumes
clean:
	@docker-compose down -v

# Restart all services
restart:
	@docker-compose restart

# Start services and view logs
start:
	@make up
	@make logs
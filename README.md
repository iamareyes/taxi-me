##### Enviroment variables to be store in /compose/local/.env
```
# server
SECRET_KEY=
DEBUG_MODE=
DJANGO_ALLOWED_HOSTS=
PGDATABASE=
PGUSER=
PGPASSWORD=
PGHOST=
REDIS_URL=

#Database
POSTGRES_USER=
POSTGRES_PASSWORD=

# client
CHOKIDAR_USEPOLLING=
REACT_APP_BASE_URL=
REACT_APP_GOOGLE_MAPS_KEY=
```

###### Create symbolic links for .env and docker-compose.yml run commands from root of project
```
$ ln -sfn ./compose/local/.env .env
$ ln -sfn ./compose/local/docker-compose.yml docker-compose.yml
```

###### To build project
```
$ docker compose up -d --build
```



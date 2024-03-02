# SocialNet

Este repositorio contiene una aplicación NestJS junto con los servicios de Redis y Mailpit, todos ellos dockerizados y orquestados mediante Docker Compose.

## Requisitos previos

Asegúrate de tener instalado Docker y Docker Compose en tu sistema.

- Docker: [Instalación de Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalación de Docker Compose](https://docs.docker.com/compose/install/)

## Puesta en marcha

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/ArnuelGM/socialnet-api.git
```

2. Accede al directorio del proyecto:

```bash
cd socialnet-api
```

3. Compilar la imagen de docker del proyecto y descargar las imagenes de los demas servicios.

```bash
docker-compose build
docker-compose pull
```

4. Inicia los servicios utilizando Docker Compose:

```bash
docker-compose up -d
```

Esto creará e iniciará los contenedores de la aplicación.

Una vez que los servicios estén en funcionamiento, podrás acceder a la aplicación desde tu navegador web en http://localhost:3000.

Para ver los correos enviados, accede a Mailpit desde tu navegador en http://localhost:8025.

## Detener y limpiar

Para detener los servicios y eliminar los contenedores, puedes utilizar el siguiente comando:

```bash
docker-compose down
```

Este comando detendrá los contenedores y eliminará cualquier recurso creado por docker-compose up.
# SocialNet

Este repositorio contiene una aplicación **NestJS** junto con los servicios de **Redis**, **Mailpit** (para probar envio de correo en local) y **socialnet_ui**, todos ellos dockerizados y orquestados mediante Docker Compose.

## Requisitos previos

Asegúrate de tener instalado Docker y Docker Compose en tu sistema.

- Docker: [Instalación de Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalación de Docker Compose](https://docs.docker.com/compose/install/)

## Puesta en marcha

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/ArnuelGM/socialnet.git
```

2. Accede al directorio del proyecto:

```bash
cd socialnet
```

3. Compilar las imágenes de docker del proyecto y descargar las imágenes de los demás servicios.

```bash
# Compila las imágenes de socialnet_ui y socialnet_api
docker-compose build

# Descarga las imagenes de redis y mailpit
docker-compose pull
```

4. Inicia los servicios utilizando Docker Compose:

```bash
docker-compose up -d
```

Esto creará e iniciará los contenedores de la aplicación.

Una vez que los servicios estén en funcionamiento, podrás acceder a la aplicación desde tu navegador web en http://localhost.

Para ver los correos que se envian cuando un nuevo usuario se registra, accede a Mailpit desde tu navegador en http://localhost:8025.

Para ver la documentación de la API, puedes acceder desde el navegador a http://localhost:3000/api

## Detener y limpiar

Para detener los servicios y eliminar los contenedores, puedes utilizar el siguiente comando:

```bash
docker-compose down
```

Este comando detendrá los contenedores y eliminará cualquier recurso creado por docker-compose up.

## Información adicional

La interfaz de usuario fue contruida bajo un sub-proyecto completo de VueJS en el directorio `./ui/`
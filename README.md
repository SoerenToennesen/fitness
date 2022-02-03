# Fitness application

Fitness application that monitors and evaluates your health and nutritional intake.

*Note, at the current state of this project, it is a work-in-progress, and a lot of the below mentioned features are not yet implemented.

### Technologies

The application is a fullstack application featuring a UI, frontend, business logic, API, backend, and database

- ReactJS frontend web-app UI
- React Native frontend mobile-app UI
- SpringBoot Java backend
- REST communication between frontend and backend
- Messagebroker communication between services in backend (RabbitMQ)
- CQRS / Event sourcing (event-driven microservice architecture)
- PostgreSQL / In-memory database (H2)
- Spring Security
- User role management
- Docker
- VM / Jenkins?

## Prerequisites for running the application

- Install RabbitMQ
  - This requires installing Erlang (for Windows)
    - https://www.erlang.org/downloads
  - https://www.rabbitmq.com/download.html
- Install Docker

## Architecture & Pipeline
TODO: Insert picture and explain

## Features

These are currently being built, but below are the envisioned features of the application.

- UI
- Gateway service with authentication
- Account management (including login with personal account)
  - Includes intermediate goals, end goals, saved & custom routines, saved & custom foods, favourites activities & foods
- Nutritional statistics (with visuals) - both macros and micros
- Health and fitness statistics (with visuals)
- Model that predictes how you will progress in the future (machine learning built on your habits)
- Historic personal logging (pictures of yourself, pictures of food, stats, etc.)

## Motivation

To learn about creating microservice-based architecture, event sourcing, fullstack application building and DevOps.
General system design concepts.

Also to geek a bit into my personal fitness and progression.

## Demo

TODO

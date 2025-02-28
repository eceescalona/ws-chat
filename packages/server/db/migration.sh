#!/bin/sh

nohup ./cloud_sql_proxy \
    -ip_address_types=PRIVATE \
    -instances=$DB_CONNECTION_NAME=tcp:0.0.0.0:$DB_PORT &

export FLYWAY_PLACEHOLDERS_READ=$DB_READ_USER
export FLYWAY_PLACEHOLDERS_RW=$DB_RW_USER
export FLYWAY_LOCATIONS="filesystem:/migrations/schema"

flyway \
    -url=jdbc:postgresql://$DB_HOST:$DB_PORT/$DB_NAME \
    -user=$DB_USER \
    -password=$DB_PWD \
    -connectRetries=$MIGRATION_RETRIES \
    migrate
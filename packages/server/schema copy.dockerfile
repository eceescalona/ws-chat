# syntax=docker/dockerfile:1
FROM flyway/flyway:8.5.8-alpine@sha256:43b042cafe4c4d92163e9c78813cc128a0b2f9130a9a846043aefd8ce51460cc

ENV DB_HOST localhost
ENV DB_PORT 5432
ENV DB_NAME postgres
ENV DB_USER postgres
ENV DB_RW_USER postgres
ENV DB_READ_USER postgres
ENV DB_PWD postgres
ENV DB_CONNECTION_NAME local
ENV MIGRATION_RETRIES 1
ENV MIGRATE_TEST_DATA="false"

RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
RUN chmod +x cloud_sql_proxy

COPY db/schema /migrations/schema

COPY db/migration.sh migration.sh

ENTRYPOINT ["./migration.sh"]
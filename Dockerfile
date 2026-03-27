FROM heroiclabs/nakama:3.17.0

COPY modules /nakama/data/modules

EXPOSE 7350

CMD ["sh", "-c", "\
nakama migrate up --database.address ${DATABASE_URL} && \
nakama \
--name nakama1 \
--database.address ${DATABASE_URL} \
--logger.level DEBUG \
--session.token_expiry_sec 7200 \
--socket.address 0.0.0.0 \
--socket.port ${PORT} \
--server_key defaultkey \
"]
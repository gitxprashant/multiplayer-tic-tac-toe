FROM heroiclabs/nakama:3.17.0

COPY modules /nakama/data/modules

EXPOSE 7350

CMD ["sh", "-c", "\
nakama migrate up --database.address postgres://postgres:cxdOBpxSSLlJQNPqbkmczoyHwledehEs@postgres.railway.internal:5432/railway && \
nakama \
--name nakama1 \
--database.address postgres://postgres:cxdOBpxSSLlJQNPqbkmczoyHwledehEs@postgres.railway.internal:5432/railway \
--logger.level DEBUG \
--session.token_expiry_sec 7200 \
--socket.address 0.0.0.0 \
--socket.port ${PORT} \
--server_key defaultkey \
"]
FROM heroiclabs/nakama:3.17.0

COPY modules /nakama/data/modules

EXPOSE 7350

ENTRYPOINT ["/bin/sh", "-c"]

CMD "echo DB:$DATABASE_URL && /nakama/nakama migrate up --database.address=$DATABASE_URL && /nakama/nakama --name nakama1 --database.address=$DATABASE_URL --logger.level=DEBUG --session.token_expiry_sec=7200 --socket.address=0.0.0.0 --socket.port=7350 --server_key=defaultkey"
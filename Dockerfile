FROM heroiclabs/nakama:3.17.0

COPY modules /nakama/data/modules

EXPOSE 7350

CMD ["nakama", "--name", "nakama1", "--database.address", "${DB_CONNECTION}", "--logger.level", "DEBUG", "--session.token_expiry_sec", "7200", "--socket.port", "${PORT}", "--socket.address", "0.0.0.0"]
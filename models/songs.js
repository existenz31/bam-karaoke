module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  const Songs = sequelize.define(
    'songs',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: DataTypes.STRING,
      },
      length: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
      // dummy: {
      //   type: DataTypes.VIRTUAL,
      //   get() {
      //     return null;
      //   },
      //   set(value) {
      //     // Storing passwords in plaintext in the database is terrible.
      //     // Hashing the value with an appropriate cryptographic hash function is better.
      //     return;
      //   },
      // }
    },
    {
      tableName: 'songs',
      underscored: true,
      schema: process.env.DATABASE_SCHEMA,
    },
  );

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Songs.associate = models => {
    Songs.belongsTo(models.artists, {
      foreignKey: {
        name: 'artistIdKey',
        field: 'artist_id',
      },
      as: 'artist',
    });
    Songs.belongsTo(models.languages, {
      foreignKey: {
        name: 'languageIdKey',
        field: 'language_id',
      },
      as: 'language',
    });
    Songs.belongsToMany(models.artists, {
      through: 'songsWritersArtists',
      foreignKey: 'song_id',
      otherKey: 'artist_id',
      as: 'writers',
    });
    Songs.belongsToMany(models.genres, {
      through: 'songsGenresGenres',
      foreignKey: 'song_id',
      otherKey: 'genre_id',
    });

    Songs.hasMany(models.songsGenresGenres, {
      foreignKey: {
        name: 'songIdKey',
        field: 'song_id',
      },
      as: 'songsGenresGenres3',
    });

    Songs.belongsToMany(models.publishers, {
      through: 'songsPublishersPublishers',
      foreignKey: 'song_id',
      otherKey: 'publisher_id',
    });
    Songs.belongsToMany(models.playlists, {
      through: 'playlistsSongsSongs',
      foreignKey: 'song_id',
      otherKey: 'playlist_id',
    });
  };

  return Songs;
};

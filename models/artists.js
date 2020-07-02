// This model was generated by Lumber. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models
module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  // This section contains the fields of your model, mapped to your table's columns.
  // Learn more here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const Artists = sequelize.define(
    'artists',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('now()'),
      },
    },
    {
      tableName: 'artists',
      underscored: true,
      schema: process.env.DATABASE_SCHEMA,
    },
  );

  // This section contains the relationships for this model. See: https://docs.forestadmin.com/documentation/v/v6/reference-guide/relationships#adding-relationships.
  Artists.associate = models => {
    Artists.belongsToMany(models.songs, {
      through: 'songsWritersArtists',
      foreignKey: 'artist_id',
      otherKey: 'song_id',
      as: 'writtenSong',
    });
    Artists.hasMany(models.songs, {
      foreignKey: {
        name: 'artistIdKey',
        field: 'artist_id',
      },
      as: 'performedSong',
    });
  };

  return Artists;
};

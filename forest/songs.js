const { collection } = require('forest-express-sequelize');
const { songs, genres, songsGenresGenres } = require('../models');
const { Op } = require('sequelize');

collection('songs', {
  actions: [],
  fields: [
    { /* Filterable Smart Field */
    isFilterable: true,
    field: 'genresStringArray',
    type: 'String',
    get: (song) => {
      const include = [{
        model: songsGenresGenres,
        as: 'songsGenresGenres2',
        where: { songIdKey: song.id },
      }];
    
      return genres
        .findAll({ include: include })
        .then((items) => {
          return items.map(item => item.name).join(', ');
        });
    },
  },
  { /* Searchable Smart Field */
    field: 'genresStringArray2',
    type: 'String',
    get: (song) => {
      const include = [{
        model: songsGenresGenres,
        as: 'songsGenresGenres2',
        where: { songIdKey: song.id },
      }];
    
      return genres
        .findAll({ include: include })
        .then((items) => {
          return items.map(item => item.name).join(', ');
        });
    },
    search: function (query, search) {
      var searchCondition = { '$genres.name$': { [Op.like]: `%${search}%` }};
      query.where[Op.and][0][Op.or].push(searchCondition);

      query.include.push({
        model: genres,
        attributes: [''] , 
        as: 'genres',
        through: { attributes: [''] }, 
        required: false,
      });
      query.subQuery = false; // do not create sub queries to avoid where misconfiguration (nested SELECT on 'SONGS' not having the 'GENRES' include)
      return query;
    }
  },
  { /* Filerable Smart Relationship */
    isFilterable: true,
    field: 'fakeGenre',
    type: 'String',
    reference: 'genres.id',
    get: (song) => {
      return null; // Just a fake attribute
    },
  },
],
  segments: [],
});

// collection('songs', {
//   actions: [],
//   fields: [
//     {
//     field: 'genresArray',
//     type: '[String]',
//     reference: 'genres.id'
//     }
//   ],
//   segments: [],
// });

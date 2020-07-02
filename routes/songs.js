"use strict";

const express = require('express');
const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
const { songs, genres, songsGenresGenres, artists, languages } = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('songs');
const FiltersParser = require("forest-express-sequelize/dist/services/filters-parser");

// Create a Song
router.post('/songs', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Song
router.put('/songs/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Song
router.delete('/songs/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#delete-a-record
  next();
});

function addIncludeGenres(queryOptions) {
  queryOptions.include.push({
    model: genres,
    attributes: [] , // This seems not enough ==> Select "genres -> songsGenresGenres" is generated from the include
    through: { attributes: [''] }, 
    required: true,
    //where: {name: genreClause},
  });
}

function getBelongsToIncludes() {
    // Include all belongsTo models
    var include = [];
    include.push({
      model: languages,
      required: false,
      as: 'language',
    },{
      model: artists,
      required: false,
      as: 'artist',
    });
    return include;
}

function replaceSmartFieldsCondition(queryOptions) {
  console.log(queryOptions);
  var where = queryOptions.where;
  var genresIncluded = false;
  // Filter with one level 
  for(let lvl0 in where[Sequelize.Op.and]) {
    let genreClause = where[Sequelize.Op.and][lvl0].genresStringArray
    if (genreClause) {
      where[Sequelize.Op.and][lvl0] = {'$genres.name$': genreClause};
      if (!genresIncluded) {
        addIncludeGenres(queryOptions);
        genresIncluded = true;
      }
    }
  }
  // Filter with two levels
  if (!where[Sequelize.Op.and][0]) return;
  for(let lvl1 of Object.getOwnPropertySymbols(where[Sequelize.Op.and][0]) ) {
    for(let lvl2 in where[Sequelize.Op.and][0][lvl1]) {
      let genreClause = where[Sequelize.Op.and][0][lvl1][lvl2].genresStringArray
      if (genreClause) {   
        where[Sequelize.Op.and][0][lvl1][lvl2] = {'$genres.name$': genreClause};
        if (!genresIncluded) {
          addIncludeGenres(queryOptions);
          genresIncluded = true;
        }  
      }
    }
  }
}

function getFiltersParser(request)  {
  const sequelizeOptions = {
    sequelize: Sequelize,
  };
  const timezone = request.query.timezone;
  const fields = {fields: request.query.fields['songs'].split(',')};

  return  new FiltersParser(fields, timezone, sequelizeOptions);
}

function getQueryOptions(defaultQueryOptions, where, search) {
  var options = defaultQueryOptions;
  options.include = getBelongsToIncludes();
  options.where = where;
  options.subQuery = false;// Important here ==> https://github.com/sequelize/sequelize/issues/8802

  replaceSmartFieldsCondition(options);

  // Add the search in the global Where (if present)
  if (search) {
    options.where = {[Sequelize.Op.and]: [{title: {[Sequelize.Op.iLike]: `%${search}%`}}, options.where]};
  }

  return options;
};

// Get a list of Songs
router.get('/songs', permissionMiddlewareCreator.list(), (request, response, next) => {
  const limit = parseInt(request.query.page.size, 10) || 20;
  const offset = (parseInt(request.query.page.number, 10) - 1) * limit;

  var filtersParser = getFiltersParser(request);

  filtersParser.perform(request.query.filters)
  .then((where) => {
    var defaultQueryOptions = {
      offset: offset,
      limit: limit,
    };

    var findAllOptions = getQueryOptions(defaultQueryOptions, where, request.query.search);
  
    // Now use the RecordsGetter to serialize the records
    const recordsGetter = new RecordsGetter(songs);

    songs.findAll(findAllOptions)
    .then((records) => recordsGetter.serialize(records))
    .then((recordsSerialized) => response.send(recordsSerialized))
    .catch(next);  

  });

});

// Get a number of Songs
router.get('/songs/count', permissionMiddlewareCreator.list(), (request, response, next) => {

  var filtersParser = getFiltersParser(request);

  filtersParser.perform(request.query.filters)
  .then((where) => {
    var defaultQueryOptions = {};

    
    var countOptions = getQueryOptions(defaultQueryOptions, where, request.query.search);    
  
    songs.count(countOptions)
    .then(count => response.send({ count }))
    .catch(next);  
  });

});

// Get a Song
router.get('/songs/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Songs
router.get('/songs.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

router.get('/songs/:song_id/relationships/genresTwo', (request, response, next) => {
  const songId = request.params.song_id;
  const limit = parseInt(request.query.page.size, 10) || 20;
  const offset = (parseInt(request.query.page.number, 10) - 1) * limit;
  const recordsGetter = new RecordsGetter(genres);
  const include = [{
    model: songsGenresGenres,
    as: 'songsGenresGenres',
    where: { songIdKey: songId },
  }];

  // find the deliveries for the requested page and page size
  const findAll = genres.findAll({
    include,
    offset,
    limit,
  });

  // count all deliveries for pagination
  const count = genres.count({ include });

  // resolve the two promises and serialize the response
  Promise.all([findAll, count])
    .then(([itemsFound, itemsCount]) =>
      recordsGetter.serialize(itemsFound, { count: itemsCount }))
    .then((recordsSerialized) => response.send(recordsSerialized))
    .catch(next);
});

module.exports = router;

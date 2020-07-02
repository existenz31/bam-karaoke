// "use strict";

// const express = require('express');
// const { PermissionMiddlewareCreator, RecordsGetter } = require('forest-express-sequelize');
// const { songs, genres, songsGenresGenres, artists, languages } = require('../models');
// const { Op } = require('sequelize');
// const Sequelize = require('sequelize');
// //FiltersParser = req
// const { BaseFiltersParser, BaseOperatorDateParser } = require('forest-express');
// const router = express.Router();
// const permissionMiddlewareCreator = new PermissionMiddlewareCreator('songs');
// const  FiltersParserSPA = require('../services/filters-parsers');
// //import FiltersParser from '../../src/services/filters-parser';


// // This file contains the logic of every route in Forest Admin for the collection songs:
// // - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/extend-a-route
// // - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/actions/create-and-manage-smart-actions

// // Create a Song
// router.post('/songs', permissionMiddlewareCreator.create(), (request, response, next) => {
//   // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#create-a-record
//   next();
// });

// // Update a Song
// router.put('/songs/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
//   // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#update-a-record
//   next();
// });

// // Delete a Song
// router.delete('/songs/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
//   // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#delete-a-record
//   next();
// });

// var addIncludeGenres = function (options, genreClause) {
//   options.include.push({
//     model: genres,
//     attributes: [] , // This seems not enough ==> Select "genres -> songsGenresGenres" is generated from the include
//     through: { attributes: [''] }, 
//     required: true,
//     where: {name: genreClause},
//   });
// }

// var changeClauseWhere = function (options) {

//   var where = options.where;
//   for(let lvl0 in where[Sequelize.Op.and]) {
//     let genreClause = where[Sequelize.Op.and][lvl0].genresStringArray
//     if (genreClause) {
//       //options.subQuery = false; // Important here ==>
//       where[Sequelize.Op.and][lvl0] = {}; //{'$genres.name$': genreClause};
//       addIncludeGenres(options, genreClause);
//     }
//   }
//   if (!where[Sequelize.Op.and][0]) return;
//   for(let lvl1 of Object.getOwnPropertySymbols(where[Sequelize.Op.and][0]) ) {
//     for(let lvl2 in where[Sequelize.Op.and][0][lvl1]) {
//       let genreClause = where[Sequelize.Op.and][0][lvl1][lvl2].genresStringArray
//       if (genreClause) {   
//       //options.subQuery = false; // Important here
//       where[Sequelize.Op.and][0][lvl1][lvl2] = {}; //{'$genres.name$': genreClause};
//         addIncludeGenres(options, genreClause);
//       }
//     }
//   }
// }
// // Get a list of Songs
// router.get('/songs-callback', permissionMiddlewareCreator.list(), (request, response, next) => {
//   // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#get-a-list-of-records
//   //const recordsGetter = new RecordsGetter(songs);
//   const params = request.query;
//   params.postBuildQueryCallback = changeClauseWhere;
//   //recordsGetter.getAll(params);
//   next();
// });

// function conditionToClause(condition) {
//   // Here is the boiler plate : transform the Forest UI condition into Sequelize format (Operator + Value)
//   var fieldName, sequelizeOp;
//   var field = condition.field;

//   switch (field) {
//     case 'genresStringArray':
//       fieldName = '$genres.name$';
//       break;
//     case String(field.match(/^artist:.*/)): 
//     case String(field.match(/^language:.*/)):
//       fieldName = `$${field.replace(':','.')}$`;
//       break;
//     // For all special fields
//     default:
//       fieldName = condition.field;
//       break;
//   }
//   sequelizeOp = forestToSequelizeOp(condition.operator, condition.value);
//   return { [fieldName]: {[Op[sequelizeOp.op]]: sequelizeOp.value} };
// }

// function forestToSequelizeOp(operatorForest, value) {
//   // TODO: Maybe there are missing operators here, >>>>>> to be checked by engineering <<<<<<<
//   // TODO: Transform date format to localtime??
//   switch (operatorForest) {
//     case 'is':
//       return {op: 'is', value: value};
//     case 'equal':
//       return {op: 'eq', value: value};
//     case 'not_equal':
//       return {op: 'ne', value: value};
//     case 'after':
//     case 'greater_than':
//       return {op: 'gte', value: value};
//     case 'before':
//     case 'less_than':
//         return {op: 'lte', value: value};
//     case 'contains':
//       return {op: 'iLike', value: `%${value}%`};
//     case 'not_contains':
//       return {op: 'notILike', value: `%${value}%`};  
//     case 'starts_with':
//       return {op: 'iLike', value: `${value}%`};
//     case 'ends_with':
//       return {op: 'iLike', value: `%${value}`};
//     case 'present':
//       return {op: 'not', value: null};
//     case 'blank':
//       return {op: 'eq', value: ''};
//     default: // This fallback should not happen
//       return {op: operatorForest, value: value};
//   } 
//   // function body 
// } 

// // Get a list of Songs
// router.get('/songs', permissionMiddlewareCreator.list(), (request, response, next) => {
//   const limit = parseInt(request.query.page.size, 10) || 20;
//   const offset = (parseInt(request.query.page.number, 10) - 1) * limit;
//   const search = request.query.search;
//   const filters = JSON.parse(request.query.filters); //TODO: add filtering
//   const filtersParsed = BaseFiltersParser.parseFiltersString(request.query.filters);
//   BaseFiltersParser.getAssociations(request.query.filters).then((res) => {
//     console.log('res = ' + res);
//   })
//   let conditionFormat = function (param) { return param};
//   let aggregationFormat = function (param) { return param};
//   const result = BaseFiltersParser.perform(request.query.filters, aggregationFormat, conditionFormat)
//   .then((res) => {
//     console.log('res = ' + res);
//   });


//   const sequelizeOptions = {
//     sequelize: Sequelize,
//   };
//   const timezone = request.query.timezone;
//   const fields = {fields: request.query.fields['songs'].split(',')};

//   //const r2 = new FiltersParserSPA(fields, timezone, sequelizeOptions);
//   // r2.perform()((res2) => {
//   //   console.log('res2 = ' + res2);
//   // });
//   var r4 = new FiltersParserSPA(fields, timezone, sequelizeOptions);
//   r4.perform(request.query.filters).then(function(result) {
//     console.log(result) // "Some User token"
//  });

//   // Include all belongsTo models
//   var include = [];
//   include.push({
//     model: languages,
//     required: false,
//     as: 'language',
//   },{
//     model: artists,
//     required: false,
//     as: 'artist',
//   });

//   // Add the include for belongsToMany
//   include.push({
//     model: genres,
//     attributes: [] ,
//     through: { attributes: [''] }, 
//     required: false,
//   });

//   // Generate the Where related to Filters from the Forest UI
//   var whereSequelize = {};

//   if (filters.aggregator) {
//     // This is a filter with more than one argument
//     var clauses = [];
//     filters.conditions.forEach(function (condition) {
//       var clause = conditionToClause(condition);
//       clauses.push(clause);
//     });

//     whereSequelize = {[Op[`${filters.aggregator}`]]: clauses};
//   }
//   else {
//     // This is a filter with one argument (no aggregator)
//     whereSequelize = conditionToClause(filters);
//   }

//   // Add the search in the global Where (if present)
//   if (search) {
//     whereSequelize = {[Op.and]: [{title: {[Op.iLike]: `%${search}%`}}, whereSequelize]};
//   }

//   // find the songs for the requested page and page size
//   const findAll = songs.findAll({
//     include: include,
//     offset: offset,
//     limit: limit,
//     where: whereSequelize,
//     subQuery: false, // Important here ==> https://github.com/sequelize/sequelize/issues/8802
//   });

//   // Now use the RecordsGetter to serialize the records
//   const recordsGetter = new RecordsGetter(songs);
//   findAll.then((records) => recordsGetter.serialize(records))
//   .then((recordsSerialized) => response.send(recordsSerialized))
//   .catch(next);  

// });

// // Get a number of Songs
// router.get('/songs/count', permissionMiddlewareCreator.list(), (request, response, next) => {
//   // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#get-a-number-of-records
//   //const recordsCounter = new RecordsCounter(songs);
//   const params = request.query;
//   params.postBuildQueryCallback = changeClauseWhere;

//   //next();
// });

// // Get a Song
// router.get('/songs/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
//   // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#get-a-record
//   next();
// });

// // Export a list of Songs
// router.get('/songs.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
//   // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v5/reference-guide/routes/default-routes#export-a-list-of-records
//   next();
// });

// router.get('/songs/:song_id/relationships/genresTwo', (request, response, next) => {
//   const songId = request.params.song_id;
//   const limit = parseInt(request.query.page.size, 10) || 20;
//   const offset = (parseInt(request.query.page.number, 10) - 1) * limit;
//   const recordsGetter = new RecordsGetter(genres);
//   const include = [{
//     model: songsGenresGenres,
//     as: 'songsGenresGenres',
//     where: { songIdKey: songId },
//   }];

//   // find the deliveries for the requested page and page size
//   const findAll = genres.findAll({
//     include,
//     offset,
//     limit,
//   });

//   // count all deliveries for pagination
//   const count = genres.count({ include });

//   // resolve the two promises and serialize the response
//   Promise.all([findAll, count])
//     .then(([itemsFound, itemsCount]) =>
//       recordsGetter.serialize(itemsFound, { count: itemsCount }))
//     .then((recordsSerialized) => response.send(recordsSerialized))
//     .catch(next);
// });

// module.exports = router;

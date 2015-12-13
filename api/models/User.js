/**
 * Created by ASAWAVETVUTT VARIT on 13/12/2015.
 */
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/ORM/Models.html
 */

module.exports = {

  attributes: {
    id:{
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    username: {
      type: 'string',
      size: 200
    },
    password:{
      type: 'string'
    },
    email: {
      type: 'string'
    }
  }
};

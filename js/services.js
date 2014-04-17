/*
 * Module - for services/factories
**/

angular.module('todo.services', [] )

/**
* Factory Service to communicate with HTML5 local storage
* The Projects factory handles saving and loading projects
* from local storage, and also lets us save and load the
* last active project index.
*/
.factory('Projects', function($rootScope) 
{

  return {

    all: function() {
      var projectString = window.localStorage['projects'];
      
      if(projectString) 
      {
        return angular.fromJson(projectString);
      }
      return [];
    },

    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);

    },

    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: [],
      };
    },

    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },

    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }

});
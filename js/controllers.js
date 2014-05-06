/*
 * Module - for controllers
**/
angular.module('todo.controllers', [] )

/*
 * Controller
**/
.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);

    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }

  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];


  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    // $scope.sideMenuController.close();   						//depricated
    $ionicSideMenuDelegate.toggleLeft();                
  };


  // Called to select the given task
  $scope.selectTask = function(task, index) {
    $scope.activeTask = task;
    Tasks.setLastActiveIndex(index);
  };

  $scope.completionChanged = function() {
    Projects.save($scope.projects);
  };

  //*******************************************************************************

 
  $scope.data= 
  {
  	showProjectDelete: false,
  	showTaskDelete: false
  };


  //Delete Task - using splice function
  $scope.onTaskDelete=function(activeProject, index)
  {
    $scope.activeProject.tasks.splice(index, 1);
    Projects.save($scope.projects);
  };

  //Delete Project - using splice function
  $scope.onProjectDelete=function(project)
  {
  	//if project has tasks - return & don't delete it
  	if(project.tasks.length > 0)
  	{
  		alert("First delete all project tasks");
  		return;
  	}
  	$scope.projects.splice($scope.projects.indexOf(project), 1);
    Projects.save($scope.projects);
  };

  //*******************************************************************************
  // Create our modal - instantiated by $ionicModal service
  //call remove() after eachmodal to avoid mem leaks
 
  $ionicModal.fromTemplateUrl('templates/new-task.tpl.html', function(modal) {
    $scope.taskModal = modal;
  }, 

  {
    focusFirstInput: false,
    scope: $scope
  });


  $scope.createTask = function(task) {
    
    if(!$scope.activeProject) {
      return;
    }
    
    $scope.activeProject.tasks.push({
      title: task.title,
      checked: task.checked
    });
    
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
    task.checked = "false"; 
  };


  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  //When checkbox changes value - save
  $scope.cbChanged = function() {
    Projects.save($scope.projects);
  };
    
  //When inputbox changes value - save
  $scope.inputChanged = function() {
    Projects.save($scope.projects);
  };


  //toggle side-menu
  $scope.toggleProjects = function() {
  	$ionicSideMenuDelegate.toggleLeft();
    // $scope.sideMenuController.toggleLeft();
  };


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) 
      {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) 
        {
          createProject(projectTitle);
          break;
        }
      }
    }
  });

});


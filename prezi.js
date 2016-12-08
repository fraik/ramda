// http://scott.sauyet.com/Javascript/Talk/2014/01/FuncProgTalk/#slide-55
var Promise = require('promise');

var readFile = Promise.denodeify(require('fs').readFile);

function readJSON(filename, callback){
  // If a callback is provided, call it with error as the
  // first argument and result as the second argument,
  // then return `undefined`. If no callback is provided,
  // just return the promise.
  return readFile(filename, 'utf8')
    .then(JSON.parse)
    .nodeify(callback);
}

var fetchData = function() {
    return readJSON('prezi-data.js');
}

// functional version
var getIncompleteTaskSummariesForMember_functional = function(memberName) {
}

// imperative version
var getIncompleteTaskSummariesForMember_imperative = function(memberName) {
    return fetchData()
        .then(function(data) {
            return data.tasks;
        })
        .then(function(tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (tasks[i].member == memberName) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function(tasks) {
            var results = [];
            for (var i = 0, len = tasks.length; i < len; i++) {
                if (!tasks[i].complete) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function(tasks) {
            var results = [], task;
            for (var i = 0, len = tasks.length; i < len; i++) {
                task = tasks[i];
                results.push({
                    id: task.id,
                    dueDate: task.dueDate,
                    title: task.title,
                    priority: task.priority
                })
            }
            return results;
        })
        .then(function(tasks) {
            tasks.sort(function(first, second) {
                return first.dueDate - second.dueDate;
            });
            return tasks;
        });
};


// OO version (also imperative, just included for completeness)
// main method
var getIncompleteTaskSummariesForMember_objectOriented = function(memberName) {
    return fetchData()
        .then(function(data) {
            var taskList = new TaskList(data.tasks);
            taskList.chooseByMember(memberName);
            taskList.chooseByCompletion(false);
            var newTaskList = taskList.getSummaries();
            newTaskList.sort(new TaskListSorter("dueDate"));
            return newTaskList.tasks;
        });
};
var TaskList = (function() {
    var TaskList = function(/*Task[]*/ tasks) {
        this.tasks = tasks;
    };
    TaskList.prototype.chooseByMember = function(memberName) {
        var results = [];
        for (var i = 0, len = this.tasks.length; i < len; i++) {
            if (this.tasks[i].member === memberName) {
                results.push(this.tasks[i]);
            }
        }
        this.tasks = results;
    };
    TaskList.prototype.chooseByCompletion = function(completion) {
        var results = [];
        for (var i = 0, len = this.tasks.length; i < len; i++) {
            if (this.tasks[i].complete == completion) {
                results.push(this.tasks[i]);
            }
        }
        this.tasks = results;
    };
	TaskList.prototype.getSummaries = function() {
        var results = [], task;
        for (var i = 0, len = this.tasks.length; i < len; i++) {
            task = this.tasks[i];
            results.push({
                id: task.id,
                dueDate: task.dueDate,
                title: task.title,
                priority: task.priority
            })
        }
        return new TaskList(results);
    };

    TaskList.prototype.sort = function(/*TaskListSorter*/ sorter) {
        this.tasks.sort(sorter.getSortFunction());
    };

    return TaskList;
}());
var TaskListSorter = (function()  {
    var TaskListSorter = function(propName) {
        this.propName = propName;
    };
    TaskListSorter.prototype.getSortFunction = function() {
        var propName = this.propName;
        return function(first, second) {
            return first[propName] < second[propName] ? -1 :
                   first[propName] > second[propName] ? +1 : 0;
        }
    };

    return TaskListSorter;
}());

var data = getIncompleteTaskSummariesForMember_imperative('Lena');
data.then(function(d){console.log(d);});


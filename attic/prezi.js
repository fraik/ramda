// http://scott.sauyet.com/Javascript/Talk/2014/01/FuncProgTalk/#slide-55   (functional programming talk)
// http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-2      (function composition talk)

var Promise = require('promise');
var R = require('ramda');

// helper functions
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
    return readJSON('data.json');
}

// aliases (for readability)
var compose = R.compose;
var eq      = R.equals;
var filter  = R.filter;
var over    = R.over;
var map     = R.map;
var pick    = R.pick;
var pipe    = R.pipe;
var reject  = R.reject;
var sortBy  = R.sortBy;
var use     = R.useWith;
//  get
var get     = R.prop;
var get     = R.curry(function(prop, obj) {return obj[prop];});
var get = function(prop) {
    return function(obj) {
        return obj[prop];
    };
};
//  propEq
var propEq = function(prop, val) { // original propEq definition
    return function(obj) {
        return obj[prop] === val;
    };
}
var propEq = function(prop, val) { // first points-free try
	return compose(eq(val), get(prop));
}
var propEq = function(prop, val) { // second attempt (using pipe() instead of compose());
	return pipe(get(prop), eq(val));
}
// FIXME figure out why this use-over stuff doesn't work :(
//var propEq = use(pipe).over(get, eq); // using 'use-over' feature

// functional version
var getIncompleteTaskSummariesForMember_functional = function(memberName) {
    return fetchData()
        .then(get('tasks'))
        .then(filter(propEq('member', memberName)))
        .then(reject(propEq('complete', true)))
        .then(map(pick(['id', 'dueDate', 'title', 'priority'])))
        .then(sortBy(get('dueDate')))
    ;
}

var data = getIncompleteTaskSummariesForMember_functional('Scott');
data.then(function(d){console.log(d);});

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

//var data = getIncompleteTaskSummariesForMember_imperative('Scott');
//data.then(function(d){console.log(d);});


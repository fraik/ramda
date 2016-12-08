// http://scott.sauyet.com/Javascript/Talk/2014/01/FuncProgTalk/#slide-55
var Promise = require('promise');

var data = {
    result: "SUCCESS",
    interfaceVersion: "1.0.3",
    requested: "10/17/2013 15:31:20",
    lastUpdated: "10/16/2013 10:52:39",
    tasks: [
        {id: 104, complete: false,            priority: "high",
                  dueDate: "11/29/2013",      member: "Scott",
                  title: "Do something",      created: "9/22/2013"},
        {id: 105, complete: false,            priority: "medium",
                  dueDate: "11/22/2013",      member: "Lena",
                  title: "Do something else", created: "9/22/2013"},
        {id: 107, complete: true,             priority: "high",
                  dueDate: "11/22/2013",      member: "Mike",
                  title: "Fix the foo",       created: "9/22/2013"},
        {id: 108, complete: false,            priority: "low",
                  dueDate: "11/15/2013",      member: "Punam",
                  title: "Adjust the bar",    created: "9/25/2013"},
        {id: 110, complete: false,            priority: "medium",
                  dueDate: "11/15/2013",      member: "Scott",
                  title: "Rename everything", created: "10/2/2013"},
        {id: 112, complete: true,             priority: "high",
                  dueDate: "11/27/2013",      member: "Lena",
                  title: "Alter all quuxes",  created: "10/5/2013"}
    ]
}
var fetchData = function() {
    var henk = new Promise(function(){ return data;});
    return henk;
}
// functional version

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

console.log(getIncompleteTaskSummariesForMember_imperative('Scott'));

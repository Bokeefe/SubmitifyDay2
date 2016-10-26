/* jshint esversion:6 */
var fs = require("fs");
users = fs.readFileSync("./users.json");
users = JSON.parse(users);

/*
	This is our extensible storage object. We've written it so that we can
	replace any parts of it in the future with calls to file system or mongo
	without too much effort.
*/
function Storage() {
	var projects = []; // array of Project objects

	this.addUser = (user, cb) => {
		users.push(user);
		this.saveUsers(cb);
		};

		this.getUserByName = (name, cb) => {
			for(var u of users) {
				if (u.username === name) {
					cb(u);
					return;
				}
			}
		cb(null);
		};

		this.saveUsers = (cb) => {
			fs.writeFile(
				"./users.json",
				JSON.stringify(users),
				(err) => {
					if (err) {
						console.log("Error writing new user to file");
						if (cb) {
							cb(false);
						}
						return;
					}
					if(cb){
						cb(true);
					}
				});
		};

	this.addProject = (project, cb)  => {
		// cb = callback
		projects.push(project);
		if (cb) {
			cb();
		}
	};

	this.getAllProjects = (cb) => {
		// cb = callback
		cb(projects);
	};

	this.getProjectByName = (name, cb) => {
		for (var p of projects) {
			if (p.name === name) {
				cb(p);
			}
		}
	};

	/*
		Takes in a username string and returns the user
		with that username
	*/
	this.getUserByUsername = (name, cb) => {
        for (var u of users) {
            if (u.username === name) {
                cb(u);
                return;
            }
        }
        cb(null);
    };
}

module.exports = Storage;

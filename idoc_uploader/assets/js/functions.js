var self = module.exports = {		
	// md5 function
	md5:  function(string) {
		return require('crypto').createHash('md5').update(string).digest('hex');
	},
    // generate_key function
	generate_key:  function() {
		var crypto = require('crypto');
        
        var sha = crypto.createHash('sha256');        
        sha.update(Math.random().toString());
        
        return sha.digest('hex');
	},
    // generate_serial_key function
	generate_serial_key:  function(length, separator) {
		// separator
        separator = separator || '-';
                
        // characters
        var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // randomString
        var randomString = '';
        
        // loop chars
        for (var i = 0; i < length; i++) {
            randomString += (characters[Math.floor((Math.random() * characters.length))]);
        }
        
        //randomString = randomString.toUpperCase().replace(/(\w{6})/g, '$1' + separator).substr(0, length + Math.round(length/6)-1);
        //randomString = randomString.replace(/(\w{6})/g, '$1' + separator).substr(0, length + Math.round(length/6)-1);
        
        return randomString;
	},
	// empty function
	empty:  function(data) {
		if(typeof(data) == 'number' || typeof(data) == 'boolean')
		{ 
			return false; 
		}
		
		if(typeof(data) == 'undefined' || data === null)
		{
			return true; 
		}
		
		if(typeof(data.length) != 'undefined')
		{
			return data.length == 0;
		}
		
		var count = 0;
		
		for(var i in data)
		{
			if(data.hasOwnProperty(i))
			{
				count ++;
			}
		}
		
		return count == 0;
	},	
    // is object
    isObject: function(o) {
        return (!!o) && (o.constructor === Object);
    },
    // is object
    toObject: function(str) {
        var o = {};
        for (var i = 0; i < str.length; ++i) {console.log(v); o[i] = str[i]};
        return o;
    },
    // is array
    isArray: function(str) {
        return (!!str) && (str.constructor === Array);
    },
    // is json
    isJSON: function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        
        return true;
    },
    // is dir
    isDir: function(path) {
        try {
            return fs.statSync(path).isDirectory();
        } catch (err) {
            return false;
        }
    },
    // is file
    isFile: function(path) {
        try {
            return fs.statSync(path).isFile();
        } catch (err) {
            return false;
        }
    },
    // user avatar
    avatar: function(user_id, exists) {
        if(fs.existsSync(PUBLIC_PATH + '/assets/img/avatars/'+ user_id +'.png')) {           
            // get thumbs
            var thumb = BASE_URL +'/'+ AVATAR_PATH +'/'+ user_id +'.png?v=1';				
            
            // avatar exists
            exists = true;
        } else {
            // get thumbs
            var thumb = BASE_URL +'/'+ AVATAR_PATH +'/avatar.png';				
            
            // avatar exists
            exists = false;
        }
        
        // return thumb
        return thumb;  
    },
    // object serialize
    serialize: function(obj) {        
        var str = [], p;
       			
        for(p in obj) {
            str.push(encodeURIComponent(p) +"="+ encodeURIComponent(obj[p]));            
        }
        
        return str.join("&");
    },
    // object serialize
    dateTimeFormat: function(datetime, format) {        
        return dateFormat(datetime, format || "dd-mm-yyyy hh:MM TT");
    },
    // get dayOfYear
    dayOfYear: function(date) {        
        var now = (typeof date != 'undefined' && date.trim() != '' ? new Date(date) : new Date());       
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
                
        return Math.floor(diff / oneDay);
    },	
	// get date range
	getDateRange: function(range) {
		var now = new Date();
		var daysOfYear = [];

		var prev = new Date();
		prev.setDate(prev.getDate() - range);

		for (var d = prev; d <= now; d.setDate(d.getDate() + 1)) {
			daysOfYear.push(new Date(d));
		}
		
		return daysOfYear;
	},
    // move the image
	moveImage: function(file, src, dest) {
		var extn = path.extname(file);
		var name = path.basename(file);
		
		return new Promise(function (resolve, reject) {       
			fs.rename(path.join(src, name), path.join(dest, name), function() {
				fs.rename(path.join(src, name.replace(extn, '.original.jpg')), path.join(dest, name.replace(extn, '.original.jpg')), function() {					
					fs.rename(path.join(src, name.replace(extn, '.thumb.png')), path.join(dest, name.replace(extn, '.thumb.png')), function() {
						resolve(name);
					});
				});
			});
			
			resolve(name);        
		});		
	},
	// load directory
	loadDir: function(dir) {
		fs.readdir(dir, function(err, files) {
			if(err) {
				console.error("Could not list the directory.", err);
				process.exit(1);
			} 

			files.forEach(function(file, i) {
				// update send to
				$('#send_to').append('<a class="dropdown-item" href="#" data-path="'+ path.join(dir, file) +'"><span class="icon icon-folder"></span> '+ file +'</a>');
				
				// update destination
				$('#destination_folders').append('<span class="nav-group-item file-item'+'" data-path="'+ path.join(dir, file) +'"><span class="icon icon-folder"></span> '+ file +'</span>');
			})
		});
	},
	// load_dir_image
	load_dir_image: function(dir, date) {	
		// get relative path
		var dir = dir.replace(/\\/g, '/');
        		
		// loop dir
		fs.readdir(dir, function(err, files) {
			if(err) {
				console.error("Could not list the directory.", err);
				process.exit(1);
			} 
            
			$('#image-list > .image-grids').empty();
			
			files.forEach(function(name, index) {
                fs.stat(path.join(dir, name), function (err, stats) {
                    // set hours to zero
                    stats.mtime.setHours(0, 0, 0, 0);
                                                    
                    if(self.dateTimeFormat(stats.mtime, "yyyy-mm-dd") == date || typeof date == 'undefined') {
                        if(stats.isDirectory()) {
                            $('#image-list > .image-grids').append('<div class="image-grid folder"><div class="folder-element"><span class="icon icon-folder" title="'+ name +'" data-path="'+ path.join(dir, name) +'"></span><h4>'+ name +'</h4></div></div>');					
                        } else {
                            if(path.extname(files[index]).toLowerCase() === '.png') {
                                $('#image-list > .image-grids').append('<div class="image-grid"><div class="image-element" title="'+ name.replace('.thumb.png', '.jpg')+'" data-path="'+ dir +'" data-image="'+ dir +'/'+ name.replace('.thumb.png', '.jpg') +'?v='+ Date.now() +'" style="background-image: url(\''+ dir +'/'+ name +'?v='+ Date.now() +'\');"></div><h4>'+ name.replace('.thumb.png', '.jpg') +'</h4></div>');					
                            }
                        }
                    }
                });
			})
		})
	},
    // QueryString
    QueryString: function() {
        var paramsArray = window.location.search.substr(1).split('&');
        var hashesArray = window.location.hash.substr(1).split('&');
                
        let querys = {};

        // get query params
        for (let i = 0; i < paramsArray.length; ++i)
        {
            let param = paramsArray[i].split('=', 2);

            if (param.length !== 2)
                continue;

            querys[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
        }
        
        // get hash params
        for (let i = 0; i < hashesArray.length; ++i)
        {
            let param = hashesArray[i].split('=', 2);

            if (param.length !== 2)
                continue;

            querys[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
        }
        
        // get params
        //console.log(querys);

        return querys;
    }
}
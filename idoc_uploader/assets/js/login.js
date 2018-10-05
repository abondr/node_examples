const fs = require('fs');
const path = require('path');
const functions = require('./functions.js');

// get db config
config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// login
$("#signin_form").submit(function(e) {
    e.preventDefault();
    
    // get form data
    var data = $("#signin_form").serialize();
	
    // set company ids
    data += '&company='+ config.company;
    
    // request ajax
    $.ajax({
        url : config.base_url + "/login/auth",
        type : "post",
        data : data,
        dataType: "json",
        success: function(res) {
            if(res.code == 200) {
                window.location = "upload.html?full_name="+ res.full_name;
            } else {
                alert(res.msg);
            }
        }
    });
});
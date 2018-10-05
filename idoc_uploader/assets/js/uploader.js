dateFormat = require('dateformat');

const fs = require('fs');
const path = require('path');
const functions = require('./functions.js');

// Retrieve remote BrowserWindow
const { BrowserWindow } = require('electron').remote;

// get active window
var window = BrowserWindow.getFocusedWindow();

// set file array
var files = [];
//set file list array
var file_list = [];
// set file array
//var logs = [];

// set index
var index = 1;

// get url query
var query;

// get db config
config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// init
loadConfig();

// load config
function loadConfig() {
    // set source path
    if (fs.existsSync(config.source)) $('#source_path').val(config.source);

    // set dest path
    if (fs.existsSync(config.dest)) $('#dest_path').val(config.dest);

    // init upload
    intUpload();

    // load files
    loadFiles(config.source);

    // activate start upload button
    $('[data-action=start-upload]').removeClass('hide');

    // get url parameters
    query = functions.QueryString();

    // truncate file
    fs.truncate('logs.json', 0, function () { console.log('done') })
}

// save config
function saveConfig() {
    // set source path
    config.source = $('#source_path').val();

    // set dest path
    config.dest = $('#dest_path').val();

    // write to file
    fs.writeFileSync('config.json', JSON.stringify(config));
}

// save config
function intUpload() {
    // total progress
    $('[data-value=upload-progress]').text('Upload Document');

    // total percentage
    $('#upload-progress').css('background', '-webkit-linear-gradient(left, #82b54b 0%, #6d7a86 0%)');

    // empty queue
    $('.file-uploader-container').empty();

    // set window statusbar progress
    window.setProgressBar(0);

    // empty files
    files = [];

    // index
    index = 1;
}

// load files
function loadFiles(src) {
    // load files from path
    if (fs.existsSync(src)) {
        fs.readdir(src, function (err, _files) {
            if (err) {
                console.error("Could not list the directory.", err);
                process.exit(1);
            }

            // get allowed files
            var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + config.extn.join('|') + ")$");

            // loop files
            _files.forEach(function (file, i) {
                fs.stat(path.join(src, file), function (err, stats) {
                    if (stats.isDirectory()) {
                        loadFiles(path.join(src, file));
                    } else {
                        // check extention
                        if (regex.test(file.toLowerCase())) {
                            // convert path to file element
                            file_list.push({ "file_src": path.join(src, file), "file_name": file });
                            // insert file to queue
                            var data_id = index+1;
                            $('.file-uploader-container').append(
                                '<div class="upload-element" data-id="'+ data_id +'">'+
                                    '<div class="block-header p-0">'+
                                        '<h3 class="block-title"><small class="text-primary"><span class="text-danger">'+ index++ +'</span> : '+ path.join(src, file) +'</small></h3>'+
                                        
                                        '<div class="block-options">'+
                                            '<button type="button" class="btn-block-option" data-toggle="block-option" data-action="cancel-upload" data-id="'+ data_id +'">'+
                                                '<i class="si si-close"></i>'+
                                            '</button>'+
                                        '</div>'+
                                    '</div>'+                                    
                                    '<div class="progress push">'+
                                        '<div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%;">'+
                                            '<span class="font-size-sm font-w600">0%</span>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'
                            );
                            
                        }
                    }
                });
            });
        });
    }
}

function getFileContentAsBase64(path, name, callback) {
    // convert file path to file element
    fs.readFile(path, function (err, data) {
        callback(new File([data], name));
    });
}

// select path
$('.open-path').click(function () {
    const { dialog } = require('electron').remote;

    // get path
    var path = dialog.showOpenDialog({
        properties: ['openDirectory']
    });

    // save config file
    if (!functions.empty(path)) {
        // get id
        var id = $(this).attr('id').replace('open_', '');

        // set path
        $('#' + id + '_path').val(path);

        // save config
        saveConfig();

        // load file on select
        if (id == 'source') {
            // init upload
            intUpload();

            // load files
            loadFiles(config.source);

            // activate start upload button
            $('[data-action=start-upload]').removeClass('hide');
        }
    }
});

// get array sum
function getSum(total, num) {
    return total + num;
}

// upload process
function UploadProcess() {
    // check session
    if (!check_session()) {
        // give error is session is expired
        alert('Oops! your session has expired. Please login again');

        // exit if session is false        
        return false;
    }

    // get session user
    //var user = require('electron').remote.getGlobal('sharedObject').full_name;

    var workers = [];
    var pending = 0;
    var success = 0;
    var totalProgress = [];
    //file_list{file_src,file_name)
    // get queue count
    file_list.forEach(function (fileObj, i) {
        // check if empty
        if (fileObj !== null) {
            pending++;
            totalProgress[index] = 0;
        }
    });
    // loop file and upload
    file_list.forEach(function (fileObj, index) {
        // check if empty
        if (fileObj !== null) {
            getFileContentAsBase64(fileObj.file_src, fileObj.file_name, function (file) {
                //FormData
                var formData = new FormData();
                // create file element
                formData.append("file", file);
                console.log
                // ajax upload
                $.ajax({
                    url: config.base_url + config.api_url,
                    data: formData,
                    method: 'post',
                    dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData: false,
                    xhr: function () {
                        var myXhr = $.ajaxSettings.xhr();

                        if (myXhr.upload) {
                            myXhr.upload.addEventListener('progress', function (e) {
                                if (e.lengthComputable) {
                                    var max = e.total;
                                    var current = e.loaded;
                                    var Percentage = (current * 100) / max;
                                    var totalPercentage = 0;
                                    totalProgress[index] = Percentage;
                                    var totalPercentage = (totalProgress.reduce(getSum) / (pending * 100)) * 100;

                                    // progress bar
                                    var index1 = index+1;
                                    $('.upload-element[data-id=' + index + '] .progress-bar').css('width', Percentage.toFixed(0) + '%').find('span').text(Percentage.toFixed(0) + '%');

                                    // total progress
                                    $('[data-value=upload-progress]').text(totalPercentage.toFixed(0) + '% Completed');

                                    // total percentage
                                    $('#upload-progress').css('background', '-webkit-linear-gradient(left, #82b54b ' + totalPercentage.toFixed(0) + '%, #6d7a86 ' + totalPercentage.toFixed(0) + '%)');

                                    // set window statusbar progress
                                    window.setProgressBar(totalPercentage.toFixed(0) / 100);


                                    if (Percentage.toFixed(0) == 100) {

                                    }
                                }
                            }, false);
                        }

                        return myXhr;
                    },
                    beforeSend: function () {
                        // set file upload info
                        $('.upload-element[data-id=' + index + '] [data-action=cancel-upload]').attr('data-action', 'uploading').html('<i class="fa fa-circle-notch fa-spin"></i>');
                    },
                    success: function (r) {
                        // set file upload info
                        $('.upload-element[data-id=' + index + '] [data-action=uploading]').attr('data-action', 'uploaded').html('<i class="si si-check text-success"></i>');

                        // create log object
                        //logs.push({msg: r.msg, date: functions.dateTimeFormat(new Date()), file: files[i].name, user: query.full_name});
                        //var log = {msg: r.msg, date: functions.dateTimeFormat(new Date()), file: files[i].name, user: query.full_name};
                        var log = { msg: r.msg, date: functions.dateTimeFormat(new Date()), file: file_list[index].file_name, user: query.full_name };

                        // success upload
                        success++;

                        // write to file                    
                        fs.appendFile('logs.json', JSON.stringify(log) + ",", function (err) {
                            if (err) throw err;
                        });

                        // move the file when completed
                        fs.rename(file_list[index].file_src,
                         path.join(config.dest, file_list[index].file_name), function () {

                        });

                        // success uploaded status
                        delete file;
                    },
                    error: function (r) {
                        // error uploaded status
                        delete file;
                    }
                });
            });
        }
    });
    
}

$(document).on('click', '[data-action]', function (e) {
    e.preventDefault();

    var action = $(this).attr('data-action');

    if (action == 'start-upload') {
        // remove element
        $(this).addClass('hide');

        // start upload 
        UploadProcess();
    } else if (action == 'cancel-upload') {
        e.preventDefault();

        // get queue id
        var id = $(this).attr('data-id');

        // remove file
        delete files[id];

        // remove element
        $('.upload-element[data-id=' + id + ']').remove();
    } else if (action == 'refresh-upload') {
        // init upload
        intUpload();

        // load files
        loadFiles(config.source);

        // activate start upload button
        $('[data-action=start-upload]').removeClass('hide');
    } else if (action == 'upload-report') {
        // empty table data
        $('#upload-logs > tbody').empty();

        if ($(this).attr('data-toggle') == 'report') {
            $('#upload-container').addClass('hide');
            $('#report-container').removeClass('hide');
            $(this).attr('data-toggle', 'upload');
            $(this).find('i').removeClass('si-grid').addClass('si-cloud-upload');

            // get log data
            var log_data = fs.readFileSync('logs.json', 'utf8').trim();

            // get upload logs
            var logs = JSON.parse('[' + log_data.substring(0, log_data.length - 1) + ']');

            // loop data
            for (var i = 0; i < logs.length; i++) {
                $('#upload-logs > tbody').append(
                    '<tr>' +
                    '<th class="text-center" scope="row">' + (i + 1) + '</th>' +
                    '<td class="font-w600">' +
                    logs[i].file +
                    '</td>' +
                    '<td class="font-w600">' +
                    logs[i].date +
                    '</td>' +
                    '<td class="font-w600">' +
                    logs[i].user +
                    '</td>' +
                    '<td class="font-w600">' +
                    logs[i].msg +
                    '</td>' +
                    '</tr>'
                );
            }
        } else {
            $('#upload-container').removeClass('hide');
            $('#report-container').addClass('hide');
            $(this).attr('data-toggle', 'report');
            $(this).find('i').addClass('si-grid').removeClass('si-cloud-upload');
        }
    }
});

// document ready
$(document).ready(function () {
    // resize canvas
    //canvas_resize();
});

// window resize
$(window).resize(function () {
    canvas_resize();
});

// check session
function check_session() {
    var state = true;

    $.ajax({
        async: false,
        url: config.base_url + "/login/check_session",
        success: function (r) {
            state = r;
        },
        beforeSend: function () { },
        complete: function () { }
    });

    return state;
}

// canvas resize
function canvas_resize() {
    //alert('df');

    // set height
    $("#file-uploader-container").height(window.innerHeight - 227);
}
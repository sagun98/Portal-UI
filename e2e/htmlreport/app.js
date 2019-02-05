var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    }
    else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    }
    else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};


//</editor-fold>

app.controller('ScreenshotReportController', function ($scope, $http) {
    var that = this;
    var clientDefaults = {
    "columnSettings": {
        "inlineScreenshots": true
    }
};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
    }

    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };

    var results = [
    {
        "description": "Perform Login Operation|Dashboard Login",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/005b00e3-0098-006b-0015-00f30046005b.png",
        "timestamp": 1549030771936,
        "duration": 27718
    },
    {
        "description": "Verify Heading|Successfully logged in",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/001600ed-00af-003b-0024-004b0011003e.png",
        "timestamp": 1549030800021,
        "duration": 2323
    },
    {
        "description": "Go to APIs|Create new Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/0094008f-00a3-0046-00fd-00d400a20061.png",
        "timestamp": 1549030802626,
        "duration": 124
    },
    {
        "description": "Wait for APIs page loading|Create new Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/0073003a-0043-0054-0052-00ee00cd00fc.png",
        "timestamp": 1549030803048,
        "duration": 483
    },
    {
        "description": "Go to create new API|Create new Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://dev.code-test.aws.pearson.com/vendor.js 33262:16 \"\\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\\n      you. We recommend using this approach to avoid 'changed after checked' errors.\\n       \\n      Example: \\n      form = new FormGroup({\\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\\n        last: new FormControl('Drew', Validators.required)\\n      });\\n    \"",
                "timestamp": 1549030803940,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev.code-test.aws.pearson.com/vendor.js 33262:16 \"\\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\\n      you. We recommend using this approach to avoid 'changed after checked' errors.\\n       \\n      Example: \\n      form = new FormGroup({\\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\\n        last: new FormControl('Drew', Validators.required)\\n      });\\n    \"",
                "timestamp": 1549030803941,
                "type": ""
            }
        ],
        "screenShotFile": "images/00b7003d-008d-00da-0048-000a00580005.png",
        "timestamp": 1549030803799,
        "duration": 10498
    },
    {
        "description": "Filled New Api form|Create new Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00bc0018-0039-00d6-00f6-00c70029004a.png",
        "timestamp": 1549030814713,
        "duration": 743
    },
    {
        "description": "Saved New Api form filled|Create new Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/007b00a7-00fc-0096-003d-00dd00c60053.png",
        "timestamp": 1549030815707,
        "duration": 3093
    },
    {
        "description": "Go to edit API|Edit existing Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/009a0047-00ee-00fd-001a-008800e60055.png",
        "timestamp": 1549030819050,
        "duration": 77
    },
    {
        "description": "Filled New Api form|Edit existing Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://dev.code-test.aws.pearson.com/vendor.js 33262:16 \"\\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\\n      you. We recommend using this approach to avoid 'changed after checked' errors.\\n       \\n      Example: \\n      form = new FormGroup({\\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\\n        last: new FormControl('Drew', Validators.required)\\n      });\\n    \"",
                "timestamp": 1549030819283,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev.code-test.aws.pearson.com/vendor.js 33262:16 \"\\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\\n      you. We recommend using this approach to avoid 'changed after checked' errors.\\n       \\n      Example: \\n      form = new FormGroup({\\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\\n        last: new FormControl('Drew', Validators.required)\\n      });\\n    \"",
                "timestamp": 1549030819285,
                "type": ""
            }
        ],
        "screenShotFile": "images/00b10078-00ea-0011-004b-00bd009e00ba.png",
        "timestamp": 1549030820161,
        "duration": 636
    },
    {
        "description": "Saved Updated Api form filled|Edit existing Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00eb0042-0090-001c-0018-005a00ff00eb.png",
        "timestamp": 1549030821102,
        "duration": 1748
    },
    {
        "description": "Go to edit API|Delete an existing Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00950017-0091-00df-00b6-009d00120017.png",
        "timestamp": 1549030823101,
        "duration": 71
    },
    {
        "description": "Delete Api|Delete an existing Api",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://dev.code-test.aws.pearson.com/vendor.js 33262:16 \"\\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\\n      you. We recommend using this approach to avoid 'changed after checked' errors.\\n       \\n      Example: \\n      form = new FormGroup({\\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\\n        last: new FormControl('Drew', Validators.required)\\n      });\\n    \"",
                "timestamp": 1549030823331,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://dev.code-test.aws.pearson.com/vendor.js 33262:16 \"\\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\\n      you. We recommend using this approach to avoid 'changed after checked' errors.\\n       \\n      Example: \\n      form = new FormGroup({\\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\\n        last: new FormControl('Drew', Validators.required)\\n      });\\n    \"",
                "timestamp": 1549030823332,
                "type": ""
            }
        ],
        "screenShotFile": "images/0016004c-00f8-0061-0047-002300380015.png",
        "timestamp": 1549030823829,
        "duration": 223
    },
    {
        "description": "Go to APIs|Create new Api Collection(Product)",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00ab009e-008b-00a3-001a-00db00820044.png",
        "timestamp": 1549030824327,
        "duration": 521
    },
    {
        "description": "Wait for APIs page loading|Create new Api Collection(Product)",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00f70049-00be-0022-0076-001f004800b5.png",
        "timestamp": 1549030825107,
        "duration": 64
    },
    {
        "description": "Go to create new API Collection|Create new Api Collection(Product)",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/0065001f-000c-0075-002b-003f006a000e.png",
        "timestamp": 1549030825413,
        "duration": 70
    },
    {
        "description": "Filled New Api Collection form|Create new Api Collection(Product)",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00b50012-004e-00a7-00f5-004200e700a4.png",
        "timestamp": 1549030825755,
        "duration": 1499
    },
    {
        "description": "Saved New Product filled form |Create new Api Collection(Product)",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00f100c9-0088-0012-000f-00d000a700c2.png",
        "timestamp": 1549030827498,
        "duration": 2277
    },
    {
        "description": "Go to edit API Collection|Update existing Api Collection(Product)",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/004a0088-0083-0004-0051-008300a3001e.png",
        "timestamp": 1549030830043,
        "duration": 71
    },
    {
        "description": "Update Api Collection form|Update existing Api Collection(Product)",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00bb003f-004f-00a0-00d1-003900e200f9.png",
        "timestamp": 1549030830371,
        "duration": 969
    },
    {
        "description": "Saved New Product filled form |Update existing Api Collection(Product)",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00ee0029-0006-009b-0093-002700cb0078.png",
        "timestamp": 1549030831612,
        "duration": 2128
    },
    {
        "description": "Go to edit API|Delete an existing Product",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/007f004a-0042-00b9-00e5-009c003300dd.png",
        "timestamp": 1549030833996,
        "duration": 73
    },
    {
        "description": "Delete Product|Delete an existing Product",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/009c009f-00a6-0046-0016-0036006200e2.png",
        "timestamp": 1549030834336,
        "duration": 514
    },
    {
        "description": "Go to Documentation Page|Create new Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/002f00bf-0042-00b3-00d0-000a00ae007d.png",
        "timestamp": 1549030835116,
        "duration": 496
    },
    {
        "description": "Wait for Documentation page loading|Create new Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/008a00f6-0099-00b3-0068-002700050015.png",
        "timestamp": 1549030835893,
        "duration": 815
    },
    {
        "description": "Go to create new API documentation|Create new Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00250096-008c-0019-0008-004e008c0006.png",
        "timestamp": 1549030836965,
        "duration": 90
    },
    {
        "description": "Filled New Api Documentation form|Create new Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/008f00e2-00f3-00d0-0020-00d10009005f.png",
        "timestamp": 1549030837328,
        "duration": 1373
    },
    {
        "description": "Saved New Api form filled|Create new Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/007c00b7-00cf-0002-003a-005700fa0071.png",
        "timestamp": 1549030838958,
        "duration": 1658
    },
    {
        "description": "Wait for Documentation page loading|Edit existing Api Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/003100cc-0029-0029-0063-00e9004400fd.png",
        "timestamp": 1549030840889,
        "duration": 63
    },
    {
        "description": "Go to edit API Documentation|Edit existing Api Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00f10024-00ac-00c7-006c-000500c00088.png",
        "timestamp": 1549030841219,
        "duration": 89
    },
    {
        "description": "Update Api documentation form|Edit existing Api Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00ce001b-0046-00e9-005d-00d7007500b3.png",
        "timestamp": 1549030841586,
        "duration": 689
    },
    {
        "description": "Saved Updated Api Documentation form filled|Edit existing Api Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00e8004e-00e8-0040-006d-00c500dd0079.png",
        "timestamp": 1549030842543,
        "duration": 1567
    },
    {
        "description": "Go to edit API Documentation|Delete an existing Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00d00024-0089-00a0-0027-004c007c00a4.png",
        "timestamp": 1549030844392,
        "duration": 76
    },
    {
        "description": "Delete Api Documentation|Delete an existing Documentation",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/0092007b-0087-003b-0088-000e00a50081.png",
        "timestamp": 1549030844733,
        "duration": 552
    },
    {
        "description": "Verify Login|Check Links",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images/00bf00bc-00a3-0033-00a2-00af00db00ed.png",
        "timestamp": 1549030845601,
        "duration": 1154
    },
    {
        "description": "Check Home Page Link|Check Links",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/002a0091-008a-00ef-000b-00bb0072009e.png",
        "timestamp": 1549030847020,
        "duration": 1846
    },
    {
        "description": "Check Getting Started Page Link|Check Links",
        "passed": true,
        "pending": false,
        "os": "Mac OS X",
        "instanceId": 37515,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/0078002c-0028-00ce-00e2-00a00057009b.png",
        "timestamp": 1549030849130,
        "duration": 1644
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    }
                    else
                    {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.sortSpecs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.sortSpecs();
    }


});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});


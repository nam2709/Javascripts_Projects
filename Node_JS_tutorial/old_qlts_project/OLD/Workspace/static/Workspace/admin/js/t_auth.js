/**
 * Created by Tamnd on 6/19/21.
 * Copyright: ©2021 Tamnd <ductambka@gmail.com>
 */
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getCSRFTokenValue(){
    return getCookie('csrftoken');
}
function getSessionIdValue(){
    return getCookie('sessionid');
}


var DEBUG = true;

if (DEBUG === true){
    console.log('DEBUG = ' + DEBUG);
    console.log('This is auth.js...');
}
// will return the host name and port
var HOST = window.location.protocol + '//' + window.location.host;
console.log('HOST = ' + HOST);

function currentHost(){
    // will return the host name and port
    var HOST = window.location.protocol + '//' + window.location.host;
    console.log('HOST = ' + HOST);
    return HOST;
}
function isLocalStorageNameSupported() {
    var testKey = 'test', storage = window.localStorage;
    try {
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

if (isLocalStorageNameSupported() === true){
    console.log('Local storage is supported...');
}
else{
    console.log('Local storage does not be supported...');
}

function removeLocalStorageItem(key) {
    if (localStorage.getItem(key) === null)
        return false;
    localStorage.removeItem(key);
    return true;
}

function setLocalStorageItem(key, value) {
    window.localStorage.setItem(key, value);
    if (DEBUG === true) {
        console.log('Set local storage item: {} - {}', key, value);
    }
    if (localStorage.getItem(key) === null)
        return false;
    return true;
}

//delete tokens o localStorage
function deleteLocalAccessToken() {
    //var HOST = window.location.host;
    // var access_token = window.localStorage.getItem(HOST + '_tnd_access_token');
    var key = HOST + '_tnd_access_token';
    var value = localStorage.getItem(key)
    if (value === null){
        return false;
    }
    localStorage.removeItem(key);
    console.log('Deleted local access_token >>>', value);
    return true;
}

//delete refresh tokens o localStorage
function deleteLocalRefreshToken() {
    //var HOST = window.location.host;
    //var access_token = window.localStorage.getItem(HOST + '_tnd_refresh_token');
    var key = HOST + '_tnd_refresh_token';
    var value = localStorage.getItem(key)
    if (value === null){
        return false;
    }
    localStorage.removeItem(HOST + '_tnd_refresh_token');
    console.log('Deleted local refresh_token >>>', value);
    return true;
}
//get token o localStorage
function getLocalAccessToken() {
    const access_token = window.localStorage.getItem(HOST + '_tnd_access_token');
    console.log('get local access_token >>>', access_token);
    //if (access_token !== null){
    //    this.access_token = access_token;
    //}
    return access_token;
}

//get token o refreshToken
function getLocalRefreshToken() {
    const refresh_token = window.localStorage.getItem(HOST + '_tnd_refresh_token');
    console.log('get local refresh_token >>>', refresh_token);
    //if (refresh_token !== null){
    //    this.refresh_token = refresh_token;
    //}
    return refresh_token;
}

function setLocalAccessToken(access_token) {
    //instance.defaults.headers[''] = access_token;
    var key = HOST + '_tnd_access_token';
    if(setLocalStorageItem(key, access_token) === false){
        if (DEBUG === true) {
            console.log('(Success) Set local tnd_access_token --> ' + access_token);
        };
        return true;
    }
    if (DEBUG === true) {
        console.log('(Failed) Set local tnd_access_token --> ' + access_token);
    };
    return false;
}

function setLocalRefreshToken(refresh_token) {
    //instance.defaults.headers[''] = refresh_token;
    var key = HOST + '_tnd_refresh_token';
    if(setLocalStorageItem(key, refresh_token) === true){
        if (DEBUG === true) {
            console.log('(Success) Set local tnd_refresh_token --> ' + refresh_token);
        };
        return true;
    }
    if (DEBUG === true) {
        console.log('(Failed) Set local tnd_refresh_token --> ' + refresh_token);
    };
    return false;
}

var alertFlag = false; // Some alerts showing, disable all post or other alert;

let AuthService = class {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.instance = axios.create({
            baseURL: baseUrl,
            timeout: 300000,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        this.access_token = getLocalAccessToken();
        this.refresh_token = getLocalRefreshToken();
        this.instance.interceptors.response.use((response) => {
            console.log('[debug] response = ', response);
            const {code, auto} = response.data;
            if (code === 401) {
                if (auto === 'yes') {
                    console.log('get new token using refresh token', getLocalRefreshToken());
                    return this.refreshToken().then(rs => {
                        console.log('get token refreshToken >>', rs.data);
                        const { token } = rs.data
                        instance.setToken(token);
                        const config = response.config;
                        config.headers['Authorization'] = 'Transter ' + token;
                        config.headers['CSRFToken'] = getCSRFTokenValue();
                        config.headers['X-CSRFToken'] = getCSRFTokenValue(); // for --> SessionAuthentication
                        config.baseURL = baseUrl;
                        console.log('config.baseURL = ' + config.baseUrl)
                        return instance(config);

                    });
                }
            };
            return response;
        }, error => {
            //console.log(error);
            console.warn('Error status', error)
            // return Promise.reject(error)
            if (error.response) {
                console.log(error.response);
                var err_obj = error.response.data
                if (err_obj.code === 'token_not_valid'){
                    if (err_obj.statusText !== 'Unauthorized'){
                        this.refreshToken();
                    }
                }
            } else {
                return Promise.reject(error)
            }
        })
    }

    ajax_login(userName, passWord, baseUrl){
        var json_data = {
            'username': userName,
            'password': passWord
        };
        console.log('json_data = ', json_data);
        var request = $.ajax({
            url: baseUrl + '/api/v1/jwt/token/',
            type: "post",
            async: false,
            cache: false,
            //contentType: false,
            // dataType : false,
            //contentType: "multipart/form-data",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: false,
            data: JSON.stringify(json_data),
            timeout: 30000 // sets timeout to 3 seconds
        });

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            // Log a message to the console
            console.log("Hooray, it worked! Response = ", response);
            var access_token = response.access;
            console.log('access_token = ' + access_token);
            if (setLocalAccessToken(access_token) === true){
                if (DEBUG === true){
                    console.log('Set local access token...');
                    //alert('Set local access token...');
                };
            }
            else{
                setTimeout(setLocalAccessToken(access_token), 500)
            };

            var refresh_token = response.refresh;
            console.log('refresh_token = ' + refresh_token);
            if (setLocalRefreshToken(refresh_token) === true){
                if (DEBUG === true){
                    console.log('(Success) Set local refresh token...');
                    //alert('Set local access token...');
                };
            }
            else{
                setTimeout(setLocalRefreshToken(refresh_token), 500)
                console.log('(Retry) Set local refresh token...');
                alert('Set local access token...');
            };
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // Log the error to the console
            console.error(
                "The following error occurred: "+
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
        });
    }
    login(userName, passWord, baseUrl) {
        var login_instance = axios.create({
            baseURL: baseUrl,
            timeout: 300000,
            headers: {
                'Content-Type': 'application/json, text/plain, */*',
                withCredentials: true,
                'CSRFToken' : getCSRFTokenValue(),
                'X-CSRFToken' : getCSRFTokenValue(), // for --> SessionAuthentication
            },
        });
        login_instance.post('api/v1/jwt/token/' + '?nocache=' + new Date().getTime(),
            {
            username: userName,
            password: passWord,
        }).then(function (response) {
            // handle success
            console.log(response);
            if (response.data !== null) {
                var access_token = response.data.access;
                console.log('access_token = ' + access_token);
                setLocalAccessToken(access_token);
                if (DEBUG === true){
                    alert('Set local access token...');
                }
                var refresh_token = response.data.refresh;
                console.log('refresh_token = ' + refresh_token);
                setLocalRefreshToken(refresh_token);
                if (DEBUG === true) {
                    alert('Set local refresh token...');
                }
                // return [true, [access_token, refresh_token]];
            }
        })
            .catch(function (error) {
                // handle error
                console.log(error);
                if (!error.status){
                    /*tell user the server is down*/
                    console.log('Lỗi mạng rồi...');
                }
                else{
                    // return [false, error];
                    if (alertFlag === false){
                        alertFlag = true;
                        //alert('Session timeout! Please login again...');
                        var r = confirm("Session timeout, some features will not work properly! Do you want login again...!");
                        if (r == true) {
                          setTimeout(function(){ location.href = "/account/signin/"; }, 1000);
                        } else {
                          console.log('Debug for what happended...');
                        };
                        //alertFlag = false;
                    }
                }
            })
            .then(function (response) {
                // always executed
                return [false, response];
            });
    }

    logOut() {
        var access_token = getLocalAccessToken();
        var refresh_token = getLocalRefreshToken();
        // Set backlist access token
        var response = this.instance.post('/api/v1/jwt/token/blacklist/', {
                access_token: access_token
            }).then(function (response) {
            // handle success
            console.log(response);
            if (DEBUG === true) {
                alert('Request blacked list access_token...', response);
            }
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function (response) {
                // always executed
                return [false, response];
            });
        // Set backlist refresh token
        var response = this.instance.post('/api/v1/jwt/token/blacklist/', {
                refresh_token: refresh_token
            }).then(function (response) {
            // handle success
            console.log(response);
            if (DEBUG === true) {
                alert('Request blacked list refresh_token...', response);
            }
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function (response) {
                // always executed
                return [false, response];
            });

        this.instance.defaults.headers['Authorization'] = null;
        deleteLocalAccessToken();
        deleteLocalRefreshToken();
        if (DEBUG === true){
            alert('Deleted all local token...');
        };
        return response
    }

    getToken(userName, passWord) {
        var access_token = null;
        var refresh_token = null;
        var response = this.instance.post('api/v1/jwt/token/', {
            username: userName,
            password: passWord,
        }).then(function (response) {
            // handle success
            console.log(response);
            if (response.data !== null) {
                access_token = response.data.access;
                console.log('access_token = ' + access_token);
                setLocalAccessToken(access_token);
                refresh_token = response.data.refresh;
                console.log('refresh_token = ' + refresh_token);
                setLocalRefreshToken(refresh_token);
            }
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        //console.log('access_token = ' + access_token);
        //console.log('refresh_token = ' + refresh_token);
        if (access_token !== null) {
            setLocalAccessToken(access_token);
            this.access_token = access_token;
            this.instance.defaults.headers.common['Transter'] = access_token;
        }
        if (refresh_token !== null) {
            setLocalRefreshToken(refresh_token);
            this.refresh_token = refresh_token;
        }
        return response;
    }


    refreshToken() {
        console.log('Refreshing token...');
        return this.instance.post('/api/v1/jwt/token/refresh/', {
            "refresh": getLocalRefreshToken()
        }).then(function (response) {
            // handle success
            if (DEBUG === true) {
                console.log("Refreshing token...");
                console.log("response = ", response);
                if (response.data.access !== null) {
                    setLocalAccessToken(response.data.access);
                }
            }
        }).catch(function (response) {
                // handle error
                console.log("[Error] Refreshing token..." + response);
                if (alertFlag === false){
                    alertFlag = true;
                    //alert('Session timeout! Please login again...');
                    var r = confirm("Session timeout, some features will not work properly! Do you want login again...!");
                    if (r == true) {
                      setTimeout(function(){ location.href = "/account/signin/"; }, 1000);
                    } else {
                      console.log('Debug for what happended...');
                    };
                    //alertFlag = false;
                }
            }).then(function () {
                // always executed
            });
    }

    get(endPointUrl) {
        return this.instance.get(endPointUrl, {
            params: {
                auto: 'yes',
            },
            headers: {
                'Authorization': 'Transter ' + getLocalAccessToken(),
            }
        });
    }

    post(endPointUrl, json_data) {
        var $crf_token = getCSRFTokenValue();

        this.instance.defaults.headers['Authorization'] = 'Transter ' + getLocalAccessToken();
        this.instance.defaults.headers['X-CSRFToken'] = $crf_token;

        //this.instance.defaults.params['auto'] = 'yes';
        return this.instance.post(endPointUrl, json_data);
    }

    getAuto(endPointUrl) {
        return this.instance.get(endPointUrl, {
            params: {
                auto: 'yes',
            },
            headers: {
                'Authorization': 'Transter ' + getLocalAccessToken(),
            }
        }).then(function (response) {
            // handle success
            if (DEBUG === true) {
                console.log(response);
            }
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    getWithOutAuto(endPointUrl) {
        return this.instance.get(endPointUrl, {
            params: {
                auto: 'no'
            },
            headers: {
                'Authorization': 'Transter ' + getLocalAccessToken() // headers token
            }
        }).then(function (response) {
            // handle success
            if (DEBUG === true) {
                console.log(response);
            }
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
};

const AUTH = new AuthService(HOST);
console.log(AUTH.baseUrl);

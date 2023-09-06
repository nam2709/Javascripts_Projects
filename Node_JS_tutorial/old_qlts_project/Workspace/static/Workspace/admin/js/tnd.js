///**
// * Created by Tamnd on 6/19/21.
// * Copyright: ©2021 Tamnd <ductambka@gmail.com>
// */
//
//console.log('This is tnd.js...');
//var DEBUG = true;
//// will return the host name and port
//var HOST = window.location.host;
//
////get token o localStorage
//function getLocalToken() {
//    const access_token = window.localStorage.getItem(HOST + '_tnd_access_token');
//    console.log('local access_token >>>', access_token);
//    //if (access_token !== null){
//    //    this.access_token = access_token;
//    //}
//    return access_token;
//}
//
////get token o refreshToken
//function getLocalRefreshToken() {
//    const refresh_token = window.localStorage.getItem(HOST+ '_tnd_refresh_token');
//    console.log('local refresh_token >>>', refresh_token);
//    //if (refresh_token !== null){
//    //    this.refresh_token = refresh_token;
//    //}
//    return refresh_token;
//}
//
//function setLocalAccessToken(access_token) {
//    //instance.defaults.headers[''] = access_token;
//    window.localStorage.setItem(HOST + '_tnd_access_token', access_token);
//    if (DEBUG === true){
//        console.log('Set local tnd_access_token --> ' + access_token);
//    }
//}
//
//function setLocalRefreshToken(refresh_token) {
//    //instance.defaults.headers[''] = refresh_token;
//    window.localStorage.setItem(HOST + '_tnd_refresh_token', refresh_token);
//    if (DEBUG === true){
//        console.log('Set local tnd_refresh_token --> ' + refresh_token);
//    }
//}
//
//let AuthService = class {
//    constructor(baseUrl, userName, passWord) {
//        this.baseUrl = baseUrl;
//        this.userName = userName;
//        this.passWord = passWord;
//        this.instance = axios.create({
//            baseURL: baseUrl,
//            timeout: 300000,
//            headers: {
//                'Content-Type': 'application/json',
//            }
//        });
//        this.access_token = getLocalToken();
//        this.refresh_token = getLocalRefreshToken();
//        this.instance.interceptors.response.use((response) => {
//            const {code, auto} = response.data;
//            if (code === 401) {
//                if (auto === 'yes') {
//                    console.log('get new token using refresh token', getLocalRefreshToken())
//                    return this.refreshToken().then(rs => {
//                        console.log('get token refreshToken>>', rs.data)
//                        const { token } = rs.data
//                        instance.setToken(token);
//                        const config = response.config
//                        config.headers['Authorization'] = 'Bearer ' + token
//                        config.baseURL = 'http://localhost:8999/'
//                        return instance(config)
//
//                    })
//                }
//            }
//            ;
//            return response;
//        }, error => {
//            console.log(error);
//            console.warn('Error status', error.response.status)
//            // return Promise.reject(error)
//            if (error.response) {
//                console.log(error.response);
//                return parseError(error.response.data)
//            } else {
//                return Promise.reject(error)
//            }
//        })
//    }
//
//    login() {
//        var response = this.instance.post('/api/v1/jwt/token/', {
//            username: this.userName,
//            password: this.passWord,
//        }).then(function (response) {
//            // handle success
//            console.log(response);
//            if (response.data !== null) {
//                var access_token = response.data.access;
//                console.log('access_token = ' + access_token);
//                setLocalAccessToken(access_token);
//                var refresh_token = response.data.refresh;
//                console.log('refresh_token = ' + refresh_token);
//                setLocalRefreshToken(refresh_token);
//                return [true, [access_token, refresh_token]];
//            }
//        })
//            .catch(function (error) {
//                // handle error
//                console.log(error);
//                return [false, error];
//            })
//            .then(function (response) {
//                // always executed
//                return [false, response];
//            });
//    }
//    getToken() {
//        var access_token = null;
//        var refresh_token = null;
//        var response = this.instance.post('/api/v1/jwt/token/', {
//            username: this.userName,
//            password: this.passWord,
//        }).then(function (response) {
//            // handle success
//            console.log(response);
//            if (response.data !== null) {
//                access_token = response.data.access;
//                console.log('access_token = ' + access_token);
//                setLocalAccessToken(access_token);
//                refresh_token = response.data.refresh;
//                console.log('refresh_token = ' + refresh_token);
//                setLocalRefreshToken(refresh_token);
//            }
//        })
//            .catch(function (error) {
//                // handle error
//                console.log(error);
//            })
//            .then(function () {
//                // always executed
//            });
//        //console.log('access_token = ' + access_token);
//        //console.log('refresh_token = ' + refresh_token);
//        if (access_token !== null) {
//            setLocalAccessToken(access_token);
//            this.access_token = access_token;
//            this.instance.defaults.headers.common['Bearer'] = access_token;
//        }
//        if (refresh_token !== null) {
//            setLocalRefreshToken(refresh_token);
//            this.refresh_token = refresh_token;
//        }
//        return response;
//    }
//
//    refreshToken() {
//        console.log('Refreshing token...');
//        return this.instance.post('/api/v1/jwt/token/refresh/', {
//            "refresh": getLocalRefreshToken()
//        }).then(function (response) {
//            // handle success
//            if (DEBUG === true) {
//                console.log("Refreshing token...");
//                console.log(response);
//                if (response.data.access !== null){
//                    setLocalAccessToken(response.data.access);
//                }
//            }
//        })
//            .catch(function (error) {
//                // handle error
//                console.log("Refreshing token..." + error);
//            })
//            .then(function () {
//                // always executed
//            });
//    }
//
//    get(endPointUrl) {
//        return this.instance.get(endPointUrl, {
//            params: {
//                auto: 'yes',
//            },
//            headers: {
//                'Authorization': 'Bearer ' + getLocalToken(),
//            }
//        });
//    }
//    post(endPointUrl) {
//        return this.instance.post(endPointUrl, {
//            params: {
//                auto: 'yes',
//            },
//            headers: {
//                'Authorization': 'Bearer ' + getLocalToken(),
//            }
//        });
//    }
//    getAuto(endPointUrl) {
//        return this.instance.get(endPointUrl, {
//            params: {
//                auto: 'yes',
//            },
//            headers: {
//                'Authorization': 'Bearer ' + getLocalToken(),
//            }
//        }).then(function (response) {
//            // handle success
//            if (DEBUG === true) {
//                console.log(response);
//            }
//        })
//            .catch(function (error) {
//                // handle error
//                console.log(error);
//            })
//            .then(function () {
//                // always executed
//            });
//    }
//
//    getWithOutAuto(endPointUrl) {
//        return this.instance.get(endPointUrl, {
//            params: {
//                auto: 'no'
//            },
//            headers: {
//                'Authorization': 'Bearer ' + getLocalToken() // headers token
//            }
//        }).then(function (response) {
//            // handle success
//            if (DEBUG === true) {
//                console.log(response);
//            }
//        })
//            .catch(function (error) {
//                // handle error
//                console.log(error);
//            })
//            .then(function () {
//                // always executed
//            });
//    }
//};
//
//const auth = new AuthService('http://localhost:8999/', 'tamnd', 'vonghialy');
//console.log(auth.baseUrl);
//auth.getToken();
////setTimeout(
////    function () {
////    auth.refreshToken();
////}, 5000);
//
//setInterval(function () {
//    //auth.getAuto('/api/v1/accounts/account/');
//    //auth.getAuto('/api/v1/QuanLyUngVien/ung-vien/');
//}, 3000);
//
//
//// Want to use async/await? Add the `async` keyword to your outer function/method.
//async function getUser() {
//    try {
//        const response = await axios.get('/api/v1/accounts/account/');
//        console.log(response);
//        console.log('This is async request...')
//    } catch (error) {
//        console.error(error);
//    }
//}

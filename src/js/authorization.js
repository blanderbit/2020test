function login() {
    fetch(API_URL + 'login', {
        method: 'post',
        headers: {
            "content-type": "application/json",
        },
        body: {
            "email": "test@gmail.com",
            "password": "test"
        }
    })
        .then(function (response) {
            return response.json();
        })
        //.then(json)
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

 // login();

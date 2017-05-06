angular.module('app').factory('$user', function($talk, $state) {
    return {
        user: null,
        storeUser: function(user) {
            if (user.email && user.first_name && user.last_name) {
                var user = {
                    name: {
                        first: user.first_name,
                        last: user.last_name
                    },
                    email: user.email
                };
                localStorage.setItem('user', JSON.stringify(user));
                this.user = user;
            }
        },
        getUser: function() {
            if (this.user) {
                return this.user;
            }
            var user = localStorage.getItem('user');
            if (user) {
                this.user = JSON.parse(user);
                return this.user;
            }
            return null;
        }
    };
});

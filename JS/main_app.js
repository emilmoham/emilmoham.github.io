var app = angular.module('main_app', ['ngRoute'])

app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self'
    ]);
});
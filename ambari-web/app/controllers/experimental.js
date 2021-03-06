/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var App = require('app');

App.ExperimentalController = Em.Controller.extend(App.UserPref, {
  name: 'experimentalController',
  supports: function () {
    var supports = [];
    Em.keys(App.get('supports')).forEach(function (sup) {
      supports.push(Ember.Object.create({
        name: sup,
        selected: App.get('supports')[sup]
      }));
    });
    return supports;
  }.property('App.supports'),


  loadSupports: function () {
    return this.getUserPref('user-pref-' + App.router.get('loginName') + '-supports');
  },

  getUserPrefSuccessCallback: function (response, request, data) {
    if (response) {
      App.set('supports', response);
    }
  },

  doSave: function () {
    var supports = this.get('supports');
    supports.forEach(function(s){
      var propName = 'App.supports.' + s.get('name');
      var propValue = s.get('selected');
      console.log(">>>>>>>> " + propName + " = "+ propValue);
      Ember.set(propName, propValue);
    });
    this.postUserPref('user-pref-' + App.router.get('loginName') + '-supports', App.get('supports')).complete(function(){
      App.router.transitionTo('root.index');
    });
  },

  doCancel: function () {
    App.router.transitionTo('root.index');
  }
});

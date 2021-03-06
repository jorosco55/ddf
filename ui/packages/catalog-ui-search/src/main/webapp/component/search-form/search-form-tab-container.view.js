/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
 /*global require*/
 var Marionette = require('marionette');
 var $ = require('jquery');
 var template = require('./search-form.collection.hbs');
 var SearchFormCollectionView = require('./search-form.collection.view');
 var CustomElements = require('js/CustomElements');

 module.exports = Marionette.LayoutView.extend({
    template: template,
    tagName: CustomElements.register('search-form-collection'),
    regions: {
        collection: '.collection'
    },
    onRender: function () {
        this.collection.show(new SearchFormCollectionView({
            model: this.model
        }));

        this.$el.find('.loading').show();
        this.listenTo(this.collection.currentView.searchFormCollection, 'change:doneLoading', this.showCollection);
    },
    showCollection: function() {
        if(this.collection.currentView.searchFormCollection.getDoneLoading()) {
            this.$el.find('.loading').hide();
        }
    }
 });
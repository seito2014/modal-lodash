;(function(){

    'use strict';

    this.ModalLodash = function(params){

        this.trigger = params.trigger ? params.trigger : 'js-ml-trigger';
        this.contents = params.contents;
        // this.template = params.template ? params.template : 'js-ml-template';

        // var self = this;

        // this._drawHandler = function() {
        //     self.drawMap();
        // };

        //lodash
        this.template = _.template;
        this.templateSettings = _.templateSettings;

        this.templateSettings.interpolate = /\{\{=([\s\S]+?)\}\}/g;

        this.$template = params.template ? $('#'+params.template) : $('#js-ml-template');
        this.compile = this.template(this.$template.html());

        window.addEventListener('load', this._init(this));
    };

    //発火
    ModalLodash.prototype._init = function(self){
        this.play(self);
    };

    ModalLodash.prototype.play = function(self){

        var self = self;

        var $trigger = $('.'+self.trigger);

        var handleClick = function(trigger) {

            var $data = $(trigger).find('input');
            var modalHtml = self.compile($data.data());

            console.log(modalHtml);
            $('body').append(modalHtml);
        };

        $trigger.on('click', function(e){
            e.preventDefault();
            handleClick(this);
        });

    };

}.call(this));
;(function(){

    'use strict';

    this.ModalLodash = function(params){

        this.$trigger = params.trigger ? $(params.trigger) : $('.js-ml-trigger');
        this.$close = params.close ? $(params.close) : $('.js-ml-close');
        this.$modal = params.modal ? $(params.modal) : $('#js-ml-modal');
        this.$output = params.output ? $(params.output) : $('#js-ml-output');
        this.item = params.item ? params.item : '.ml-modal-item';
        // this.$item = params.item ? this.$modal.find(params.item) : this.$modal.find('.ml-modal-item');
        this.$item;

        this.activeClass = params.activeClass ? params.activeClass : 'is-active';

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
        this.setUp(self);
        this.action(self);
    };

    ModalLodash.prototype.setUp = function(self) {

        var self = self;

        var createModalItems = function (trigger) {

            var $data = $(trigger).find('input');
            var modalHtml = self.compile($data.data());

            console.log(modalHtml);
            $(self.$output).append(modalHtml);
        };

        var itemLength = self.$trigger.length;
        var i = 0;
        while (i < itemLength) {
            createModalItems(self.$trigger.eq(i));
            i += 1;
        }

        self.$item = self.$modal.find(self.item);
    };

    ModalLodash.prototype.action = function(self) {

        var self = self;

        var handleClick = {
            openModal: function(trigger){
                self.$modal.fadeIn();
                var index = self.$trigger.index(trigger);
                self.$item.eq(index).addClass(self.activeClass);
            },
            closeModal: function(){
                self.$modal.fadeOut();
            }
        };

        self.$trigger.on('click', function(e){
            e.preventDefault();
            handleClick.openModal(this);
        });
        self.$close.on('click', function(e){
            e.preventDefault();
            handleClick.closeModal();
        });
    };

}.call(this));
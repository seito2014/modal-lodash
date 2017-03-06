;(function(){

    'use strict';

    this.ModalLodash = function(params){

        this.$trigger = params.trigger ? $(params.trigger) : $('.js-ml-trigger');
        this.$close = params.close ? $(params.close) : $('.js-ml-close');
        this.$modal = params.modal ? $(params.modal) : $('#js-ml-modal');
        this.$output = params.output ? $(params.output) : $('#js-ml-output');
        this.$buttonLeft = params.buttonLeft ? $(params.buttonLeft) : $('.js-ml-left');
        this.$buttonRight = params.buttonRight ? $(params.buttonRight) : $('.js-ml-right');
        this.item = params.item ? params.item : '.ml-modal-item';
        this.$item;

        //class
        this.activeClass = params.activeClass ? params.activeClass : 'is-active';
        this.disableClass = params.disableClass ? params.disableClass : 'is-disable';

        //lodash
        this.template = _.template;
        this.templateSettings = _.templateSettings;
        this.templateSettings.interpolate = /\{\{=([\s\S]+?)\}\}/g;
        this.$template = params.template ? $('#'+params.template) : $('#js-ml-template');
        this.compile = this.template(this.$template.html());

        //etc
        this.itemLength;
        this.index = 0;

        window.addEventListener('load', this._init(this));
    };

    //発火
    ModalLodash.prototype._init = function(self){
        this.setUp(self);
        this.manageIndex(self);
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

        self.itemLength = self.$trigger.length;
        var i = 0;
        while (i < self.itemLength) {
            createModalItems(self.$trigger.eq(i));
            i += 1;
        }

        self.$item = self.$modal.find(self.item);

        //add active class to the fist item
        self.$item.eq(self.index).addClass(self.activeClass);
    };

    ModalLodash.prototype.manageIndex = function(self) {
        var self = self;
    };

    ModalLodash.prototype.action = function(self) {

        var self = self;

        var toggleItem = {
            memoriseIndex: function(number){ //memorise current index
                self.index = number;
            }, //remove the active class from the previous index item
            hide: function(index){
                self.$item.eq(index).removeClass(self.activeClass);
            }, //add the active class to the new index item
            show: function(index){
                self.$item.eq(index).addClass(self.activeClass);
            }
        };

        var ctrlDisableClass = function(){
          if(self.index === 0){
              self.$buttonRight.removeClass(self.disableClass);
              self.$buttonLeft.addClass(self.disableClass);
          } else if(self.index === self.itemLength - 1) {
              self.$buttonLeft.removeClass(self.disableClass);
              self.$buttonRight.addClass(self.disableClass);
          }
        };

        var handleClick = {
            openModal: function(trigger){
                self.$modal.fadeIn();

                toggleItem.hide(self.index);

                //memorize index of the clicked trigger
                var index = self.$trigger.index($(trigger));
                toggleItem.memoriseIndex(index);

                toggleItem.show(self.index);
                ctrlDisableClass();
            },
            closeModal: function(){
                self.$modal.fadeOut();
            },
            movePrev: function(){
                console.log('hello');
                toggleItem.hide(self.index);
                if(self.index > 0){
                    self.index--;
                } else {
                    self.index = 0;
                }
                toggleItem.show(self.index);
                ctrlDisableClass();
            },
            moveNext: function(){
                console.log('hello');
                toggleItem.hide(self.index);
                if(self.index < self.itemLength - 1){
                    self.index++;
                } else {
                    self.index = self.itemLength - 1;
                }
                toggleItem.show(self.index);
                ctrlDisableClass();
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
        self.$buttonLeft.on('click', function(e){
            e.preventDefault();
            if(self.index > 0){
                handleClick.movePrev(this);
            }
        });
        self.$buttonRight.on('click', function(e){
            e.preventDefault();
            if(self.index < self.itemLength - 1){
                handleClick.moveNext(this);
            }
        });
    };

}.call(this));
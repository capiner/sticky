/*!
 * Sticky 1.0.0
 *
 * Copyright © Capiner https://capiner.com
 * MIT License https://github.com/capiner/sticky/blob/master/LICENSE
 */
(function($){
	$.Sticky = function(element, options){
		this.e = $(element);
		this.o = $.extend(true, {}, $.Sticky.defaults, options);
		this.action()
	};
	$.Sticky.prototype = {
		action: function(options){
			var self = this,
				$top = self.e.find(self.o.topClass),
				$middle = self.e.find(self.o.middleClass),
				$bottom = self.e.find(self.o.bottomClass),
				$wrapper = '<div class="' + self.o.wrapperClass + (self.o.layoutClass ? ' ' + self.o.layoutClass:'') +'"></div>',
				$headerTop, $headerMiddle, $headerBottom, $topInner, $topOuter, $topHeight, $middleInner, $middleOuter, $middleHeight, $bottomInner;
			if (self.o.topSticky){
				$topInner = self.e.find(self.o.topClass + ',' + self.o.topInner);
				$top.addClass(self.o.hasClass).prepend($wrapper);
				$top.find(self.o.contentClass).prependTo($top.find('.' + self.o.wrapperClass));
				$topOuter = $top.outerHeight();
				self.o.topHeight ?
					$topHeight = self.o.topHeight + ($topOuter - $top.height()):
					$topHeight = $topOuter
			}
			var $stickyTop = $top.find('.' + self.o.wrapperClass);
			if (self.o.middleSticky){
				$middleInner = self.e.find(self.o.middleClass + ',' + self.o.middleInner);
				$middle.addClass(self.o.hasClass).prepend($wrapper);
				$middle.find(self.o.contentClass).prependTo($middle.find('.' + self.o.wrapperClass));
				$middleOuter = $middle.outerHeight();
				self.o.middleHeight ?
					$middleHeight = self.o.middleHeight + ($middleOuter - $middle.height()):
					$middleHeight = $middleOuter
			}
			var $stickyMiddle = $middle.find('.' + self.o.wrapperClass);
			if (self.o.bottomSticky){
				$bottomInner = self.e.find(self.o.bottomClass + ',' + self.o.bottomInner);
				$bottom.addClass(self.o.hasClass).prepend($wrapper);
				$bottom.find(self.o.contentClass).prependTo($bottom.find('.' + self.o.wrapperClass))
			}
			var $stickyBottom = $bottom.find('.' + self.o.wrapperClass);
			var windowScroll = function(){
				var $topOuterHeight = 0, $topStickyHeight = 0, $middleOuterHeight = 0, $middleStickyHeight = 0;
				if ($top.hasClass(self.o.hasClass)){
					$headerTop = $top.offset().top;
					if ($(this).scrollTop() <= $headerTop){
						$top.removeClass(self.o.activeClass);
						if (self.o.topHeight)
							$topInner.css({height:'','line-height':''});
						$stickyTop.css({position:'static',top:0})
					} else {
						$top.addClass(self.o.activeClass);
						if (self.o.topHeight)
							$topInner.css({height:self.o.topHeight,'line-height':self.o.topHeight + 'px'});
						$stickyTop.css({position:'fixed',top:0})
					}
					if ($top.hasClass(self.o.offsetClass) && $top.css('display') == 'block'){
						$topOuterHeight = $topOuter;
						$topStickyHeight = $topHeight
					}
				}
				if ($middle.hasClass(self.o.hasClass)){
					$top.hasClass(self.o.hasClass) && $top.hasClass(self.o.offsetClass) ?
						$headerMiddle = $top.offset().top:
						$headerMiddle = $middle.offset().top;
					if ($(this).scrollTop() <= $headerMiddle){
						$middle.removeClass(self.o.activeClass);
						if (self.o.middleHeight)
							$middleInner.css({height:'','line-height':''});
						$stickyMiddle.css({position:'static',top:$topOuterHeight})
					} else {
						$middle.addClass(self.o.activeClass);
						if (self.o.middleHeight)
							$middleInner.css({height:self.o.middleHeight,'line-height':self.o.middleHeight + 'px'});
						$stickyMiddle.css({position:'fixed',top:$topStickyHeight})
					}
					if ($middle.hasClass(self.o.offsetClass) && $middle.css('display') == 'block'){
						$middleOuterHeight = $middleOuter;
						$middleStickyHeight = $middleHeight
					}
				}
				if ($bottom.hasClass(self.o.hasClass)){
					$top.hasClass(self.o.hasClass) && $top.hasClass(self.o.offsetClass) && $middle.hasClass(self.o.hasClass) && $middle.hasClass(self.o.offsetClass) ?
						$headerBottom = $top.offset().top:$top.hasClass(self.o.hasClass) && $top.hasClass(self.o.offsetClass) ?
						$headerBottom = $bottom.offset().top - $top.outerHeight():$middle.hasClass(self.o.hasClass) && $middle.hasClass(self.o.offsetClass) ?
						$headerBottom = $middle.offset().top:
						$headerBottom = $bottom.offset().top;
					if ($(this).scrollTop() <= $headerBottom){
						$bottom.removeClass(self.o.activeClass);
						if (self.o.bottomHeight)
							$bottomInner.css({height:'','line-height':''});
						$stickyBottom.css('position','static')
						$middle.hasClass(self.o.middleClass.replace('.','')) && !$middle.hasClass(self.o.hasClass) ?
							$stickyBottom.css('top',$topStickyHeight + $middleOuterHeight):
							$stickyBottom.css('top',$topOuterHeight + $middleOuterHeight)
					} else {
						$bottom.addClass(self.o.activeClass);
						if (self.o.bottomHeight)
							$bottomInner.css({height:self.o.bottomHeight,'line-height':self.o.bottomHeight + 'px'});
						$stickyBottom.css({position:'fixed',top:$topStickyHeight + $middleStickyHeight})
					}
				}
				if (self.o.topSticky && !$top.hasClass(self.o.hasClass)){
					$top.removeClass(self.o.activeClass);
					$topInner.css({height:'','line-height':''});
					$stickyTop.css({position:'',top:''})
				}
				if (self.o.middleSticky && !$middle.hasClass(self.o.hasClass)){
					$middle.removeClass(self.o.activeClass);
					$middleInner.css({height:'','line-height':''});
					$stickyMiddle.css({position:'',top:''})
				}
				if (self.o.bottomSticky && !$bottom.hasClass(self.o.hasClass)){
					$bottom.removeClass(self.o.activeClass);
					$bottomInner.css({height:'','line-height':''});
					$stickyBottom.css({position:'',top:''})
				}
				if (self.o.bottomSection){
					menuTop(), setTimeout(menuTop, 400)
				}
			}
			var menuTop = function(){
				var $bottomSection = $bottom.find(self.o.bottomSection);
				if ($bottom.hasClass(self.o.hasClass)){
					$bottomSection.css('top',$stickyBottom.offset().top + $bottom.outerHeight() - $(window).scrollTop());
				} else {
					var $offsetTop = $bottom.offset().top + $bottom.outerHeight() - $(window).scrollTop();
					if ($top.hasClass(self.o.hasClass) && $middle.hasClass(self.o.hasClass)){
						$offsetTop > $top.outerHeight() + $middle.outerHeight() ?
							$bottomSection.css('top',$offsetTop):
							$bottomSection.css('top',$top.outerHeight() + $middle.outerHeight());
					} else if ($top.hasClass(self.o.hasClass)){
						$offsetTop > $top.outerHeight() ?
							$bottomSection.css('top',$offsetTop):
							$bottomSection.css('top',$top.outerHeight());
					} else if ($middle.hasClass(self.o.hasClass)){
						$offsetTop > $middle.outerHeight() ?
							$bottomSection.css('top',$offsetTop):
							$bottomSection.css('top',$middle.outerHeight());
					} else {
						$offsetTop > 0 ?
							$bottomSection.css('top',$offsetTop):
							$bottomSection.css('top',0);
					}
				}
			}
			$(window).load(windowScroll).scroll(windowScroll).resize(windowScroll)
		}
	};
	$.fn.Sticky = function(options){
		if (typeof options === 'string'){
			var args = Array.prototype.slice.call(arguments, 1);
			this.each(function(){
				var Sticky = $.data(this, 'Sticky');
				Sticky[options].apply(Sticky, args)
			})
		} else {
			this.each(function(){
				var Sticky = $.data(this, 'Sticky');
				if (!Sticky) $.data(this, 'Sticky', new $.Sticky(this, options))
			})
		}
		return this
	};
	$.Sticky.defaults = {
		hasClass      : 'header-sticky',
		offsetClass   : 'header-horizontal',
		activeClass   : 'sticky-active',
		wrapperClass  : 'sticky-wrapper',
		layoutClass   : 'page-layout',
		contentClass  : '.header-inner',
		topSticky     : true,
		topClass      : '.header-top',
		topInner      : null,
		topHeight     : null,
		middleSticky  : true,
		middleClass   : '.header-middle',
		middleInner   : null,
		middleHeight  : null,
		bottomSticky  : true,
		bottomClass   : '.header-bottom',
		bottomInner   : '.header-bottom a.level-top',
		bottomHeight  : null,
		bottomSection : null
    }
})(jQuery)
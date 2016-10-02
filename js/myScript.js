$( document ).ready(function() {
	$('div').filter('.panel-default').map(function(){
		if($(this).children().length == 1){
			$(this).hide();
		}
	})
});


$( document ).ready(function() {
	$('.single-widget').find('h2').map(function(){
		if($(this).text() == 'Quock Shop' || $(this).text() == 'Policies'){
			$(this).parent().find('li').map(function(i){
				if(i % 2 == 0){
					$(this).find('a').css('color', 'red')
				}
			})
		}
	})
});

$( document ).ready(function() {
	$('.fa-phone').parent().text('1 (111) 111 11 11')
});


$( document ).ready(function() {
	$('.carousel-inner:first').children().not($('.carousel-inner:first').children().eq(1)).remove().end().attr('class', 'item active')
});


$( document ).ready(function() {
	$(':header').css('color', 'green')
});

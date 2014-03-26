$(function () {
	$(".postCell").click(function(){
		window.location = $("a", this).attr("href");
	})
})
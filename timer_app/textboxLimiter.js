$(document).ready(function(){
	$("#hr").keydown(function (e){
		if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			(e.keyCode == 65 && e.ctrlKey === true) ||
			(e.keyCode == 67 && e.ctrlKey === true) ||
			(e.keyCode == 88 && e.ctrlKey === true) ||
			(e.keycode >= 35 && e.keycode <= 39)){
			return;
			}
		if((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))  && (e.keyCode < 96 || e.keyCode > 105)){
			e.preventDefault();
		}
	});
	$("#min").keydown(function (e){
		if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			(e.keyCode == 65 && e.ctrlKey === true) ||
			(e.keyCode == 67 && e.ctrlKey === true) ||
			(e.keyCode == 88 && e.ctrlKey === true) ||
			(e.keycode >= 35 && e.keycode <= 39)){
			return;
			}
		if((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))  && (e.keyCode < 96 || e.keyCode > 105)){
			e.preventDefault();
		}
	});
	$("#sec").keydown(function (e){
		if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			(e.keyCode == 65 && e.ctrlKey === true) ||
			(e.keyCode == 67 && e.ctrlKey === true) ||
			(e.keyCode == 88 && e.ctrlKey === true) ||
			(e.keycode >= 35 && e.keycode <= 39)){
			return;
		}
		if((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))  && (e.keyCode < 96 || e.keyCode > 105)){
			e.preventDefault();
		}
	});
	$("#hr").val("0");
	$("#min").val("0");
	$("#sec").val("0");
});
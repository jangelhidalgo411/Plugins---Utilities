/*
 * disabled rigth click
*/
document.addEventListener('contextmenu', event => event.preventDefault());

/*
 * This is the global function to capitalize. We get 2 values:
 * - text     => the text we are going to capitalize
 * - spliter  => the character we are going to use to convert text into array
*/
function Capitalize(text, spliter) {
	//Convert the text to and array using the "spliter" as parameter
	var array = text.split(spliter);

	//We map the array item by item
	array.map(function(word, key) {
		if(spliter == ' ') {
			/*
			 * In case we spliting by space we are going to
			 * UpperCase the first letter in the word and 
			 * LowerCase the rest
			*/
			array[key] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		}
		else {
			/*
			 * Otherwise we only need to UpperCase the first letter in the word
			*/
			array[key] = word.charAt(0).toUpperCase() + word.slice(1);
		}
	});

	//We return the array converted as text again
	return array.join(spliter);
}

function CopyOnClick(target) {
  	var copyText = $(target)[0];
  	copyText.innerText
  	//copyText.select();
	//copyText.setSelectionRange(0, 99999); // For mobile devices
	navigator.clipboard.writeText(copyText.innerText);
	//alert("Copied the text: " + copyText.value)
}

$(document).ready(function() {
	/*
	 * We bind the trigger on page fully load
	 * we are trigger whern the input with id "Capitilize":
	 * - keyup:  when any key is press and the input is focus
	 * - input:  when something is inserted
	*/
	$('#Camelcase').bind("keyup input",function() {
		//we get the current value 
		var text = $(this).val();

		/*
		 *we call the Capitalize function multiple time
		 * - First:  For capitalize words (separator <space>)
		 * - Second: For capitalize family mnames with '
		*/
		text = Capitalize(text,' ');
		text = Capitalize(text,'\'');

		/* 
		 * NOTE: In case you have another case you can add
		 * additional cases following syntax 
		 * text = Capitalize(text,'<Character>');
		*/


		//we replace the old value with the new capitilize value
		$(this).val(text);
	});

	/*
	 * We bind the trigger on page fully load
	 * we are trigger whern the input with id "alphanumeric":
	 * - keyup:  when any key is press and the input is focus
	 * - input:  when something is inserted
	*/
	$('#AlphaNumeric').bind("keyup input",function() {
		//we get the current value 
		var text = $(this).val();

		/* With regex we remove all not allowed character  
		 * by replacing them with nothing
		*/
		var text = $(this).val().replace(/[^A-Za-z0-9]/gi,'');

		//we replace the old value with the new value
		$(this).val(text)
	});

	/*
	 * We bind the trigger on page fully load
	 * we are trigger whern the input with id "OnlyNumers":
	 * - keyup:  when any key is press and the input is focus
	 * - input:  when something is inserted
	*/
	$('#OnlyNumbers').bind("keyup input",function() {
		//we get the current value 
		var text = $(this).val();

		/* With regex we remove all not allowed character  
		 * by replacing them with nothing
		*/
		var text = $(this).val().replace(/[^0-9]/gi,'');

		//we replace the old value with the new value
		$(this).val(text)
	});

	/*
	 * We bind the trigger on page fully load
	 * we are trigger whern the input with id "OnlyLetter":
	 * - keyup:  when any key is press and the input is focus
	 * - input:  when something is inserted
	*/
	$('#OnlyLetter').bind("keyup input",function() {
		//we get the current value 
		var text = $(this).val();

		/* With regex we remove all not allowed character  
		 * by replacing them with nothing
		*/
		var text = $(this).val().replace(/[^A-Za-z]/gi,'');

		//we replace the old value with the new value
		$(this).val(text)
	});

	$('#copybutton').on("click",function() {
		CopyOnClick('code');
	});




	/*
	 * This is the global function to toggle the Field.
	*/
	function DropdownToggleField(value) {
		/* We use a switch statement in case
		 * the are other case to show the field
		 * you can added easily
		*/ 
		switch(value) {
			case 'Yes':
				//We make the field required
				$('#SpecialCode').attr("required", true);
				//We make the field visible
				$('#SpecialCode').parent().parent().show();
				break;
			default:
				//We remove the required attribute from the field 
				$('#SpecialCode').removeAttr("required");
				//We make the field NOT visible
				$('#SpecialCode').parent().parent().hide();
				//We empty the value to avoid trash data
				$('#SpecialCode').val('');
				break;
		}
	}


	//We are trigger the validation every time the dropdown change
	$('#HaveSpecialCode').change(function(event) {
		//We send to the function the current value
		DropdownToggleField($(this).val());
	});
	
	/*
	 * We send to the function the initial value when page load in case that
	 * the information came from any storage system.
	*/
	DropdownToggleField($('#HaveSpecialCode').val());
});
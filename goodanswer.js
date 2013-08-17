var ones=['','one','two','three','four','five','six','seven','eight','nine'],
	tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'],
	teens=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];

var convert_millions = function (num){
    if (num>=1000000)
        return convert_millions(Math.floor(num/1000000))+" million "+convert_thousands(num%1000000);
    else
        return convert_thousands(num);
}

var convert_thousands = function (num){
    if (num>=1000)
        return convert_hundreds(Math.floor(num/1000))+" thousand "+convert_hundreds(num%1000);
    else
        return convert_hundreds(num);
}

var convert_hundreds = function (num){
    if (num>99)
        return ones[Math.floor(num/100)]+" hundred "+convert_tens(num%100);
    else
        return convert_tens(num);
}

var convert_tens = function (num){
    if (num<10) return ones[num];
    else if (num>=10 && num<20) return teens[num-10];
    else
        return tens[Math.floor(num/10)]+" "+ones[num%10];
}

var convert = function (num){
    if (num==0) return "zero";
    else return convert_millions(num);
}

// on enleve tout ce qui peut porter a confusion lors de la comparaison
var treatAnswer = function (reponse){
	reponse=reponse.toLowerCase();

	var tmp = reponse.split(" ");
	for (var j = 0 ; j < tmp.length ; ++j){
	// cas particuliers
		reponse = reponse.replace("isn\'t", "is not");
		reponse = reponse.replace("doesn\'t", "does not");
		reponse = reponse.replace("aren\'t", "are not");
		reponse = reponse.replace("wouldn\'t", "would not");
		reponse = reponse.replace("mustn\'t", "must not");
		reponse = reponse.replace("shouldn\'t", "should not");
		reponse = reponse.replace("\'re", " are");
		reponse = reponse.replace("\'s", "is");
	}

	var pattern = /\d+/g;
	var ret = pattern.exec(reponse), num;
	while(ret != null){
		num = reponse.slice(ret.index, pattern.lastIndex);
		reponse = reponse.replace(num, convert(parseInt(num)));
		ret=pattern.exec(reponse);
	}

	// creation de toutes les expressions a supprimer
	var patternArray = new Array();
	patternArray.push(/[^\w ]/g); // caracteres speciaux
	patternArray.push(/is/g);		// is (avec les 's)
	patternArray.push(/y$/g);		// y finaux (cas des pluriels)
	patternArray.push(/ies$/g);	// ies finaux (cas des pluriels)
	patternArray.push(/s$/g);		// s finaux (cas des pluriels)
	patternArray.push(/the$/g);	// the
	patternArray.push(/an$/g);		// an
	patternArray.push(/a$/g);		// a 
	patternArray.push(/\s/g);		// espaces
	patternArray.push(/_/g);		// _
	
	for(var i = 0 ; i < patternArray.length ; ++i){
		reponse = reponse.replace(patternArray[i], "");
	}
	
	console.log("after treatment: " + reponse);
	return reponse;
};

var isGoodAnswer = function (answer, correct_answer){
	if(answer.length > 0)
		return treatAnswer(answer) == treatAnswer(correct_answer);
	else
		return false;
}
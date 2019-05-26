var express = require('express');
var router = express.Router();

function getGrade(name, point){
	var grade = 'C';
	

	if(point >= 80){
		grade = 'A';
	}else if(point>=60){
		grade = 'B';
	}else{
		grade = 'C';
	}

	// console.log('이름 '+name+'\n등급 '+grade);

	var result = {'이름':name, '등급': grade};
	// var result = [];
	// result['이름'] = name;
	// result['등급'] = grade;
	return result;
	

}

router.get('/test', function(req, res){
	var name  = req.query.name;
	var point  = req.query.point;
	let result = getGrade(name, point);

	res.json(result);
});


module.exports = router;
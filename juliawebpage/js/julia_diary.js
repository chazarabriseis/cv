var diary = {
	"entry": [{
		"date": "",
		"location": "",
		"title": "",
		"text": "",
		"coverimage": "",
		"images": ["",""]
	},{
		"date": "",
		"location": "",
		"title": "",
		"text": "",
		"coverimage": "",
		"images": ["",""]
	},}
	]
}

	
	

function asign(HTML_str,data) {
	var HTML_new = HTML_str.replace('%data%', data);
	return HTML_new
}

$('#header').append(asign(HTMLheaderName,julia.basics.name));
$('#header').append(asign(HTMLheaderRole,julia.basics.label));
$('#header_pic').append(asign(HTMLbioPic, julia.basics.picture));
$('#header').append(asign(HTMLwelcomeMsg, julia.basics.summary));

if(diary.entry.length != 0) {
	$('#entry').append(HTMLskillsStart);
	Object.keys(julia.skills).forEach(function(key, keyIndex) {
		var keyname = Object.keys(julia.skills[key]);
		var formattedImage = HTMLskillImage.replace('%modal%',keyname)
		$('#skills').append(asign(formattedImage,julia.skillImages[key].image));
		$('#skills').append(asign(HTMLskills,keyname));
		if (keyname == "ComputationalSkills") {
			//$('#CompSkillText').append(asign(HTMLskillModalimage,julia.skillImages[key].image));
			for (skill in julia.skills[key].ComputationalSkills) {
				$("#CompSkillText").append(asign(HTMLskillModaltext,julia.skills[key].ComputationalSkills[skill].name));
				for (item in julia.skills[key].ComputationalSkills[skill].keywords) {
					$("#CompSkillText").append(asign(HTMLskillModalitem,julia.skills[key].ComputationalSkills[skill].keywords[item]));
				}
			};
		};
		if (keyname == "ExperimentalSkills") {
			//$('#ExpSkillText').append(asign(HTMLskillModalimage,julia.skillImages[key].image));
			for (skill in julia.skills[key].ExperimentalSkills) {
				$("#ExpSkillText").append(asign(HTMLskillModaltext,julia.skills[key].ExperimentalSkills[skill].name));
				for (item in julia.skills[key].ExperimentalSkills[skill].keywords) {
					$("#ExpSkillText").append(asign(HTMLskillModalitem,julia.skills[key].ExperimentalSkills[skill].keywords[item]));
				};
			};
		};
		if (keyname == "TransferableSkills") {
			//$('#TransSkillText').append(asign(HTMLskillModalimage,julia.skillImages[key].image));
			for (skill in julia.skills[key].TransferableSkills) {
				$("#TransSkillText").append(asign(HTMLskillModaltext,julia.skills[key].TransferableSkills[skill]));
			};
		};
	});
}; 

$("#mapDiv").append(googleMap);


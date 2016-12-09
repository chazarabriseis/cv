var diary = {
	"entry": [{
		"date": "1.12.2016",
		"location": "Melbourne, Victoria, Australia",
		"title": "Moving out - Ch-ch-changes",
		"text": "I still don't know what I was waiting for And my time was running wild A million dead-end streets And every time I thought I'd got it made It seemed the taste was not so sweet So I turned myself to face me But I've never caught a glimpse Of how the others must see the faker I'm much too fast to take that test Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Don't want to be a richer man Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Just gonna have to be a different man Time may change me But I can't trace time I watch the ripples change their size But never leave the stream Of warm impermanence and So the days float through my eyes But still the days seem the same And these children that you spit on As they try to change their worlds Are immune to your consultations They're quite aware of what they're going through Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Don't tell them to grow up and out of it Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Where's your shame You've left us up to our necks in it Time may change me But you can't trace time Strange fascination, fascinating me Changes are taking the pace I'm going through Ch-ch-ch-ch-Changes (Turn and face the strange) Ch-ch-changes Oh, look out you rock 'n rollers Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Pretty soon now you're gonna get older Time may change me But I can't trace time I said that time may change me But I can't trace time",
		"coverimage": "images/blog/2/img_1.jpg",
		"images_landscape": ["images/blog/2/img_1.jpg","images/blog/2/img_6.jpg","images/blog/2/img_7.jpg"],
		"images_portrait": ["images/blog/2/img_2.jpg","images/blog/2/img_3.jpg","images/blog/2/img_4.jpg","images/blog/2/img_5.jpg"]
	
	},{
		"date": "28.11.2016",
		"location": "Mount Arapiles, Victoria, Australia",
		"title": "Mt. Arapiles - our favorite climbing spot",
		"text": "Schwester von dem ersten Licht, Bild der Zärtlichkeit in Trauer! Nebel schwimmt mit Silberschauer Um dein reizendes Gesicht; Deines leisen Fußes Lauf Weckt aus tagverschloßnen Höhlen Traurig abgeschiedne Seelen, Mich und nächt'ge Vögel auf. Forschend übersieht dein Blick Eine großgemeßne Weite. Hebe mich an deine Seite! Gib der Schwärmerei dies Glück; Und in wollustvoller Ruh Säh der weitverschlagne Ritter Durch das gläserne Gegitter Seines Mädchens Nächten zu. Dämmrung, wo die Wollust thront, Schwimmt um ihre runden Glieder. Trunken sinkt mein Blick hernieder. Was verhüllt man wohl dem Mond? Doch was das für Wünsche sind!Voll Begierde zu genießen,So da droben hängen müssen;Ei, da schieltest du dich blind.",
		"coverimage": "images/blog/1/img_1.jpg",
		"images_landscape": ["images/blog/1/img_1.jpg","images/blog/1/img_2.jpg","images/blog/1/img_4.jpg","images/blog/1/img_5.jpg"],
		"images_portrait": ["images/blog/1/img_3.jpg","images/blog/1/img_6.jpg"]
	}]
}

function asign(HTML_str,data) {
	var HTML_new = HTML_str.replace('%data%', data);
	return HTML_new
};

var mapLocation;

function displayDiary(entries) {
var index = -1;
for (entry in entries) {
	index = index +1;
	$('#diary').append(HTMLdiaryStart);
	var formattedImage = asign(HTMLdiaryImage,diary.entry[entry].coverimage);
	var formattedTitle = asign(HTMLdiaryTitle,diary.entry[entry].title);
	var formattedMap = HTMLdiaryMap(index);
	var combined = formattedImage+formattedTitle+formattedMap;
	$('.diary-entry:last').append(asign(HTMLdiaryDate,diary.entry[entry].date));
	$('.diary-entry:last').append(combined);

	mapLocation = diary.entry[index].location;
	console.log(mapLocation);
	initializeMap(index);

	$('.diary-entry:last').append(asign(HTMLdiaryText,diary.entry[entry].text));
	var galleryCombined = HTMLgalleryStart(index);
	for (image in diary.entry[entry].images_landscape) {
			galleryCombined = galleryCombined + asign(HTMLgalleryImageLS,diary.entry[entry].images_landscape[image]);
		}
	for (image in diary.entry[entry].images_portrait) {
		galleryCombined = galleryCombined + asign(HTMLgalleryImagePT,diary.entry[entry].images_portrait[image]);
	}

	$('.diary-entry:last').append(galleryCombined);
	gallery_maker(index);
	var galleryCombined = "";
	}
} 
displayDiary(diary.entry);


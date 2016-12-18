var diary = {
	"entry": [{
		"date": "15-19.12.2016",
		"location": "Cradel Mountain, Tasmania, Australia",
		"title": "Summer in Tassie - snowy days",
		"text": "After checking the weather forecast we decided to head straight to the Cradel Mountain National Park, it looked we had one nice day to have a crack at the Cradel mountain Skyline Traverse. It's a grade 3+ climb that takes all day and follows the Cradel Mountain ridge line. We had an early start at 5:30am to give us enough time. At 7am we started hiking with a cloudless sky and no wind. We forgot right away about our heavy packs admiring the views of the mountain silouette reflecting in Dove lake. Two hours later we started our climb, leaving the heavy backpacks behind to avoid being pulled of the face. It was very exciting, and at times scary, to climb and scramble up and down the dolorite rock with it's amazing column structure. We abseiled down the Weindorfer's peak, named after the Austrian who together with his wife established the park. After 5hours we reached the actual Cradel Mountain peak running into all the tourist on their day hikes. After 10 hours of hiking and climbing we arrived at the Scott-Kilvert Memorial hut, very happy but exhausted. After dinner we crawled in our tent and slept for 12hours straight. The rain woke us up. The weather had completly changed. The forecast had predicted snow down to 800m that day, we just didn't really believe it... we found ourselves spending all day in the hut admiring the snowstorm outside, drinking tea, practicing yoga and reading our books. A nice relaxing day. The next morning didn't look much better but we didn't bring enough food to stay for another night so we started off early bashing our way through winter-wonderland and snowfall back to the car. With wet shoes but a big smile we arrived at the Cradel Mountain Campgound knowing a warm shower would await us there. After warming up the weather actually changed around again and summer was back. So we headed back into the park, visiting the Weindorfer's Charlet and enjoying a beer with the beautiful Cradel Mountain view, realising that nearly all the snow from this morning had already melted again. We also spotted around 15 Wombats, seems like they are enjoying the views there as well.",
		"coverimage": "images/blog/4/img_0.jpg",
		"images_landscape": ["images/blog/4/img_0.jpg","images/blog/4/img_2.jpg","images/blog/4/img_4.jpg","images/blog/4/img_6.jpg","images/blog/4/img_8.jpg","images/blog/4/img_10.jpg","images/blog/4/img_12.jpg","images/blog/4/img_14.jpg","images/blog/4/img_16.jpg"],
		"images_portrait": ["images/blog/4/img_1.jpg","images/blog/4/img_3.jpg"]
	},{
		"date": "10-15.12.2016",
		"location": "Corinna, Tasmania, Australia",
		"title": "Opening a new chapter - Starting in the rugged North-West",
		"text": "Rocky Cape - Arthur's River - Corinna",
		"coverimage": "images/blog/3/img_0.jpg",
		"images_landscape": ["images/blog/3/img_0.jpg","images/blog/3/img_18.jpg","images/blog/3/img_2.jpg","images/blog/3/img_4.jpg","images/blog/3/img_6.jpg","images/blog/3/img_8.jpg","images/blog/3/img_10.jpg","images/blog/3/img_12.jpg","images/blog/3/img_14.jpg","images/blog/3/img_16.jpg"],
		"images_portrait": ["images/blog/3/img_1.jpg","images/blog/3/img_3.jpg","images/blog/3/img_5.jpg"]
	
	},{
		"date": "1.12.2016",
		"location": "Melbourne, Victoria, Australia",
		"title": "Moving out - Ch-ch-changes",
		"text": "I still don't know what I was waiting for And my time was running wild A million dead-end streets And every time I thought I'd got it made It seemed the taste was not so sweet So I turned myself to face me But I've never caught a glimpse Of how the others must see the faker I'm much too fast to take that test Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Don't want to be a richer man Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Just gonna have to be a different man Time may change me But I can't trace time I watch the ripples change their size But never leave the stream Of warm impermanence and So the days float through my eyes But still the days seem the same And these children that you spit on As they try to change their worlds Are immune to your consultations They're quite aware of what they're going through Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Don't tell them to grow up and out of it Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Where's your shame You've left us up to our necks in it Time may change me But you can't trace time Strange fascination, fascinating me Changes are taking the pace I'm going through Ch-ch-ch-ch-Changes (Turn and face the strange) Ch-ch-changes Oh, look out you rock 'n rollers Ch-ch-ch-ch-changes (Turn and face the strange) Ch-ch-changes Pretty soon now you're gonna get older Time may change me But I can't trace time I said that time may change me But I can't trace time - David Bowie",
		"coverimage": "images/blog/2/img_1.jpg",
		"images_landscape": ["images/blog/2/img_1.jpg","images/blog/2/img_6.jpg","images/blog/2/img_7.jpg"],
		"images_portrait": ["images/blog/2/img_2.jpg","images/blog/2/img_3.jpg","images/blog/2/img_4.jpg","images/blog/2/img_5.jpg"]
	},{
		"date": "28.11.2016",
		"location": "Mount Arapiles, Victoria, Australia",
		"title": "Mt. Arapiles - our favorite climbing spot",
		"text": "After packing and sorting the house for nearly 3 weeks we decided we need a break to stay sane. Selling all the furniture, giving a lot of stuff to friends and charity and realising that we are about to give up our home got exhausting. So what better way to distract us from all our thoughts by going climbing at Mt. Arapiles. We love that place, that's where our climbing together started and where are still hundreds of routes awaiting us. It was so good to get out of town and on the rock, forget for a few days about all the gumtree ads, things to organise, stuff to sort through ... It was amazing with how much energy we returned and how we knocked the last bit of getting ready to leave Melbourne over.",
		"coverimage": "images/blog/1/img_1.jpg",
		"images_landscape": ["images/blog/1/img_1.jpg","images/blog/1/img_2.jpg","images/blog/1/img_4.jpg","images/blog/1/img_5.jpg"],
		"images_portrait": ["images/blog/1/img_3.jpg","images/blog/1/img_6.jpg"]
	}]
}

function asign(HTML_str,data) {
	var HTML_new = HTML_str.replace('%data%', data);
	return HTML_new
};


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

	//mapLocation = diary.entry[index].location;
	//console.log(mapLocation);
	initializeMap(index,diary.entry[index].location);

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


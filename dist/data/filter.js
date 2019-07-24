const fs = require('fs');
let dupes = [];

var json = JSON.parse(fs.readFileSync('data_routed_by_trips_merged.json'));

console.log(json.length);

json.forEach((bike,iFirst) => {
    const length = bike.segments.length;
    
    const lastWPLat = bike.segments[length - 1][1];
    const firstWPLat = bike.segments[0][1];
    
    const lastWPLng = bike.segments[length - 1][0];
    const firstWPLng = bike.segments[0][0];
    
    json.forEach((bikeCheck, iCheck) => {
        const lengthCheck = bikeCheck.segments.length;
        const firstWPLatCheck = bikeCheck.segments[0][1];
        const lastWPLatCheck = bikeCheck.segments[lengthCheck - 1][1];
        const firstWPLngCheck = bikeCheck.segments[0][0];
        const lastWPLngCheck = bikeCheck.segments[lengthCheck - 1][0];

        if (
            lastWPLngCheck == firstWPLng && 
            lastWPLatCheck == firstWPLat && 
            firstWPLat == lastWPLatCheck && 
            firstWPLng == lastWPLngCheck && 
            iFirst != iCheck && 
            lengthCheck == length
            ) {
            dupes.push(iCheck);
        }
    })    
})

console.log(json.length);

dupes.forEach(dupe => {
    json.splice(dupe, 1);
})

let tooShort = [];

json.forEach((bike, index) => {
    const length = bike.segments.length - 1;
    const firstWP = bike.segments[0][2];
    const lastWP = bike.segments[length][2];

    const time = lastWP - firstWP

    if (time < 130) {
        tooShort.push(index);
    }
})

tooShort.forEach(dupe => {
    json.splice(dupe, 1);
})

fs.writeFileSync('data_routed_by_trips_new.json', JSON.stringify(json));

console.log(json.length);

